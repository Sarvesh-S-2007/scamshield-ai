import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Google GenAI client if GEMINI_API_KEY is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('[ScamShield] Gemini AI client initialized successfully.');
  } catch (err) {
    console.error('[ScamShield] Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.warn('[ScamShield] GEMINI_API_KEY is not set. Offline heuristic engine active.');
}

export interface IndicatorItem {
  type: string;
  severity: 'high' | 'medium' | 'low';
  quote: string;
  explanation: string;
}

export interface ObservableUrl {
  url: string;
  domain: string;
  suspiciousTraits: string[];
  safetyNotice: string;
}

export interface ScamAnalysisResult {
  referenceId: string;
  analyzedAt: string;
  classification:
    | 'Potential Scam Indicators Detected'
    | 'Suspicious — Verify Independently'
    | 'No Obvious Scam Indicators Detected';
  riskScore: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low' | 'Safe';
  riskExplanation: string;
  summary: string;
  indicators: IndicatorItem[];
  observableUrls: ObservableUrl[];
  safetyActions: string[];
  limitations: string;
  analysisMethod: string;
  isAiPowered: boolean;
}

// Helper: Extract observable URLs from text without fetching them
function extractObservableUrls(text: string): ObservableUrl[] {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:xyz|top|work|click|club|live|info|online|vip|loan|cc|me|fit|link|ru|cn|tk|ga|cf|gq)(?:\/[^\s]*)?)/gi;
  const matches = text.match(urlRegex) || [];
  const results: ObservableUrl[] = [];
  const seen = new Set<string>();

  for (const rawUrl of matches) {
    const cleaned = rawUrl.replace(/[.,;!?)]+$/, '');
    if (seen.has(cleaned)) continue;
    seen.add(cleaned);

    let domain = '';
    try {
      const parsed = new URL(cleaned.startsWith('http') ? cleaned : `https://${cleaned}`);
      domain = parsed.hostname;
    } catch {
      domain = cleaned.split('/')[0];
    }

    const suspiciousTraits: string[] = [];
    const lower = domain.toLowerCase();

    // Check for IP address domain
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(lower)) {
      suspiciousTraits.push('Uses raw numerical IP address instead of legitimate domain name');
    }

    // High risk TLDs
    if (/\.(xyz|top|work|click|club|vip|loan|ru|cn|tk|ga|cf|gq)$/i.test(lower)) {
      suspiciousTraits.push('Uses domain extension frequently associated with disposable scam campaigns');
    }

    // URL shorteners
    if (/(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|rb\.gy|shorturl\.at|ow\.ly)/i.test(lower)) {
      suspiciousTraits.push('Uses URL shortener to conceal the true destination address');
    }

    // Brand impersonation hints
    const knownBrands = ['paypal', 'amazon', 'netflix', 'apple', 'google', 'microsoft', 'dhl', 'fedex', 'usps', 'chase', 'wells', 'bank', 'sbi', 'hdfc'];
    for (const brand of knownBrands) {
      if (lower.includes(brand) && !lower.endsWith(`.${brand}.com`) && lower !== `${brand}.com`) {
        suspiciousTraits.push(`Contains '${brand}' in hostname but is not the official ${brand}.com domain`);
      }
    }

    // Hyphen stacking or excessive subdomains
    if ((lower.match(/-/g) || []).length >= 2) {
      suspiciousTraits.push('Contains multiple hyphens, often used to spoof legitimate brand names');
    }
    if ((lower.match(/\./g) || []).length >= 3) {
      suspiciousTraits.push('Deep subdomain nesting often designed to mask actual registrar');
    }

    results.push({
      url: cleaned,
      domain,
      suspiciousTraits: suspiciousTraits.length > 0 ? suspiciousTraits : ['No immediate high-risk syntax triggers detected on domain string'],
      safetyNotice: 'Never open unverified URLs directly. Inspect sender domain through authentic corporate bookmarks.',
    });
  }

  return results;
}

// Deterministic heuristic rule engine (used as fallback or offline verification)
function analyzeWithHeuristics(message: string): ScamAnalysisResult {
  const text = message.toLowerCase();
  const indicators: IndicatorItem[] = [];
  const observableUrls = extractObservableUrls(message);
  let score = 5; // Base clean score

  // 1. OTP / Verification Code Theft
  const otpMatches = message.match(/(otp|one[- ]time password|verification code|security code|2fa|do not share|never share)/i);
  const otpAction = message.match(/(send|reply with|share|enter|forward|call and tell)/i);
  if (otpMatches && otpAction) {
    score += 45;
    indicators.push({
      type: 'Credential / OTP Harvesting',
      severity: 'high',
      quote: otpMatches[0],
      explanation: 'Legitimate institutions never request your One-Time Password (OTP) or 2FA codes via chat or SMS.',
    });
  }

  // 2. Urgent / Threat Language
  const urgencyMatches = message.match(/(account (?:blocked|suspended|disabled|frozen)|immediate(?:ly)?|within 24 hours|legal action|arrest warrant|electricity will be cut|card blocked|urgent action)/i);
  if (urgencyMatches) {
    score += 30;
    indicators.push({
      type: 'Artificial Urgency & Coercion',
      severity: 'high',
      quote: urgencyMatches[0],
      explanation: 'Scammers engineer panic to rush victims into acting before they can independently verify the claim.',
    });
  }

  // 3. Fake Job / Upfront Registration Fee
  const jobMatches = message.match(/(part[- ]time job|earn \$(?:\d{2,4}) daily|work from home|telegram job|youtube like|simple task|pay registration fee|refundable deposit)/i);
  if (jobMatches) {
    score += 35;
    indicators.push({
      type: 'Task Scam / Fake Employment Offer',
      severity: 'high',
      quote: jobMatches[0],
      explanation: 'Legitimate employers never demand upfront registration fees, security deposits, or pay hundreds daily for liking videos.',
    });
  }

  // 4. Lottery / Unclaimed Prize
  const prizeMatches = message.match(/(won \$(?:\d{3,9})|lottery winner|selected for cash prize|unclaimed fund|inheritance|congratulations you have won)/i);
  if (prizeMatches) {
    score += 40;
    indicators.push({
      type: 'Advance-Fee / Lottery Scam',
      severity: 'high',
      quote: prizeMatches[0],
      explanation: 'You cannot win a lottery you never entered. Advance-fee scams require paying "clearance fees" for non-existent winnings.',
    });
  }

  // 5. Package / Delivery Smishing
  const deliveryMatches = message.match(/(parcel cannot be delivered|package address incomplete|postal fee|customs fee|update your address|undelivered shipment)/i);
  if (deliveryMatches && observableUrls.length > 0) {
    score += 35;
    indicators.push({
      type: 'Delivery Phishing (Smishing)',
      severity: 'high',
      quote: deliveryMatches[0],
      explanation: 'Fake delivery notices exploit routine shopping habits to redirect users to credential-theft or card-skimming web forms.',
    });
  }

  // 6. Suspicious URLs found
  if (observableUrls.length > 0) {
    const hasSuspiciousDomain = observableUrls.some(u => u.suspiciousTraits.some(t => !t.includes('No immediate')));
    if (hasSuspiciousDomain) {
      score += 30;
      indicators.push({
        type: 'Suspicious / Disguised URL',
        severity: 'high',
        quote: observableUrls[0].url,
        explanation: 'The message contains links pointing to unrecognized domains, URL shorteners, or spoofed brand names.',
      });
    } else {
      score += 15;
      indicators.push({
        type: 'Embedded External Link',
        severity: 'medium',
        quote: observableUrls[0].url,
        explanation: 'External links in unsolicited communications should always be treated with caution.',
      });
    }
  }

  // 7. Payment rails / Gift cards / Crypto
  const paymentMatches = message.match(/(gift card|steam card|apple card|wire transfer|western union|crypto|bitcoin|usdt|cashapp|zelle|binance)/i);
  if (paymentMatches && (urgencyMatches || prizeMatches || jobMatches)) {
    score += 35;
    indicators.push({
      type: 'Irreversible Payment Method Demand',
      severity: 'high',
      quote: paymentMatches[0],
      explanation: 'Demands for payments via gift cards, wire transfers, or cryptocurrency provide zero buyer protection and cannot be reversed.',
    });
  }

  // Normalize score between 0 and 100
  score = Math.min(100, Math.max(0, score));

  let classification: ScamAnalysisResult['classification'] = 'No Obvious Scam Indicators Detected';
  let riskLevel: ScamAnalysisResult['riskLevel'] = 'Safe';
  let riskExplanation = 'No high-risk social engineering markers, financial coercion, or suspicious links were detected in the text.';

  if (score >= 65 || indicators.some(i => i.severity === 'high')) {
    classification = 'Potential Scam Indicators Detected';
    riskLevel = score >= 85 ? 'Critical' : 'High';
    riskExplanation = 'Multiple observable indicators match documented social engineering, phishing, or financial fraud patterns.';
  } else if (score >= 30 || indicators.length > 0) {
    classification = 'Suspicious — Verify Independently';
    riskLevel = 'Medium';
    riskExplanation = 'The message exhibits characteristics that warrant caution or contains unverified links and requests.';
  } else if (score > 10) {
    classification = 'No Obvious Scam Indicators Detected';
    riskLevel = 'Low';
    riskExplanation = 'Low observable threat level. However, always exercise baseline digital caution with unsolicited contacts.';
  }

  const safetyActions: string[] = [];
  if (classification === 'Potential Scam Indicators Detected') {
    safetyActions.push('Do NOT click any links, open attachments, or dial phone numbers listed inside the message.');
    safetyActions.push('Never disclose passwords, One-Time Passwords (OTPs), PINs, or bank account numbers.');
    safetyActions.push('Contact the purported organization directly using their verified official website or number printed on the back of your card.');
    safetyActions.push('Block the sender and report the message to your cellular provider (forward to 7726) and national cyber fraud portal.');
  } else if (classification === 'Suspicious — Verify Independently') {
    safetyActions.push('Verify the sender identity independently through an established, separate communication channel.');
    safetyActions.push('Navigate to the organization’s portal directly by typing their authentic web address rather than tapping the link.');
    safetyActions.push('If this concerns a payment, order, or appointment, confirm status within your secure account dashboard.');
  } else {
    safetyActions.push('Even with low observable indicators, maintain standard operational security.');
    safetyActions.push('Do not share sensitive credentials or initiate payments without positive out-of-band verification.');
  }

  const refNum = Math.floor(100000 + Math.random() * 900000);

  return {
    referenceId: `SHIELD-${refNum}`,
    analyzedAt: new Date().toISOString(),
    classification,
    riskScore: score,
    riskLevel,
    riskExplanation,
    summary:
      classification === 'Potential Scam Indicators Detected'
        ? 'High probability of fraudulent intent identified based on social engineering signals, urgency coercion, and suspicious call-to-actions.'
        : classification === 'Suspicious — Verify Independently'
        ? 'Uncertain or ambiguous message with identifiable risk traits. Independent corroboration is strongly advised before taking action.'
        : 'The text appears to follow standard conversational or transactional conventions without typical scam triggers.',
    indicators,
    observableUrls,
    safetyActions,
    limitations:
      'This analysis is purely advisory based on syntactic and structural patterns. A clean evaluation does not guarantee safety. Scammers continuously adapt techniques.',
    analysisMethod: 'Cybersecurity Heuristic Rules (Demonstration/Offline Mode)',
    isAiPowered: false,
  };
}

// API: Health & Status check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ScamShield AI Analysis Engine',
    model: 'gemini-3.8-flash',
    isAiConfigured: !!ai,
    timestamp: new Date().toISOString(),
  });
});

// API: Text message analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { message, messageType } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const trimmed = message.trim();
    if (trimmed.length < 5) {
      return res.status(400).json({ error: 'Message is too short to analyze. Please provide at least 5 characters.' });
    }
    if (trimmed.length > 7000) {
      return res.status(400).json({ error: 'Message exceeds the 7,000 character limit for single analysis.' });
    }

    const observableUrls = extractObservableUrls(trimmed);

    // If Gemini client is not initialized, use heuristic engine
    if (!ai) {
      console.log('[ScamShield] GEMINI_API_KEY not configured, running deterministic heuristic engine.');
      const result = analyzeWithHeuristics(trimmed);
      return res.json(result);
    }

    // Call Gemini 3.8 Flash with structured schema
    const prompt = `You are the lead cybersecurity threat analyst at ScamShield AI. Your mission is to evaluate the following user-submitted message for potential scams, phishing, social engineering, fraudulent financial requests, or deceptive practices.

Message Context / Channel: ${messageType || 'Unspecified communication channel (SMS, WhatsApp, Email, or DM)'}
Message Content to Analyze:
"""
${trimmed}
"""

Detected Observable URLs in message:
${observableUrls.length > 0 ? observableUrls.map(u => `- ${u.url} (Domain: ${u.domain})`).join('\n') : 'None'}

EVALUATION GUIDELINES:
1. Classification must be strictly one of these exact three:
   - "Potential Scam Indicators Detected"
   - "Suspicious — Verify Independently"
   - "No Obvious Scam Indicators Detected"

2. Scrutinize for:
   - Urgent payment demands (gift cards, wire transfers, crypto, Zelle, CashApp)
   - OTP, PIN, password, or 2FA verification code requests
   - Requests for bank accounts, debit card numbers, or credit card CVV
   - Fake job offers, task scams (liking videos/reviews), or upfront registration/kit fees
   - Unsolicited lottery, prize, inheritance, or grant notifications
   - Authority impersonation (Banks, Tax authorities, Law enforcement, Delivery couriers, CEO)
   - Suspicious or deceptive URLs (typosquatting, lookalike domains, free/disposable TLDs, IP addresses)
   - Threats of account suspension, arrest, or utility disconnection
   - Unrealistic financial returns or investment promises
   - Vague requests asking the recipient to click a link to "verify details"

3. Risk Score: Integer from 0 (completely safe/routine) to 100 (confirmed malicious/critical fraud).
   - 0-25: Safe / Low Risk
   - 26-59: Medium Risk / Suspicious
   - 60-79: High Risk
   - 80-100: Critical Scam

4. Indicators:
   - Quote exact snippets from the message for each indicator.
   - Explain concisely why this indicator matters from a cybersecurity standpoint.
   - If the message is completely benign (e.g. ordinary friend message or official transactional note without red flags), return an empty or minimal indicators list.

5. Treat the output as advisory. Never provide false certainty.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are an authoritative cybersecurity analyst. Output precise, objective, structured scam risk assessments in strict JSON format. Never hallucinate indicators not in the message.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              classification: {
                type: Type.STRING,
                description:
                  'Strictly one of: "Potential Scam Indicators Detected", "Suspicious — Verify Independently", "No Obvious Scam Indicators Detected"',
              },
              riskScore: {
                type: Type.INTEGER,
                description: 'Risk rating between 0 and 100',
              },
              riskLevel: {
                type: Type.STRING,
                description: 'One of: Critical, High, Medium, Low, Safe',
              },
              riskExplanation: {
                type: Type.STRING,
                description: 'Explanation for why this risk score was given',
              },
              summary: {
                type: Type.STRING,
                description: 'A 1 to 2 sentence executive summary of the evaluation',
              },
              indicators: {
                type: Type.ARRAY,
                description: 'Observable threat or deception indicators found in the message',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, description: 'Type of scam indicator' },
                    severity: { type: Type.STRING, description: 'high, medium, or low' },
                    quote: { type: Type.STRING, description: 'Specific snippet from message' },
                    explanation: { type: Type.STRING, description: 'Why this indicator is a concern' },
                  },
                  required: ['type', 'severity', 'quote', 'explanation'],
                },
              },
              safetyActions: {
                type: Type.ARRAY,
                description: '3 to 5 clear, actionable protective steps the recipient must take',
                items: { type: Type.STRING },
              },
              limitations: {
                type: Type.STRING,
                description: 'Advisory limitations and why zero-trust caution is recommended',
              },
            },
            required: [
              'classification',
              'riskScore',
              'riskLevel',
              'riskExplanation',
              'summary',
              'indicators',
              'safetyActions',
              'limitations',
            ],
          },
        },
      });

      const parsedJson = JSON.parse(response.text || '{}');

      // Normalize classification to standard categories
      let classification = parsedJson.classification;
      if (![
        'Potential Scam Indicators Detected',
        'Suspicious — Verify Independently',
        'No Obvious Scam Indicators Detected',
      ].includes(classification)) {
        if (parsedJson.riskScore >= 60) {
          classification = 'Potential Scam Indicators Detected';
        } else if (parsedJson.riskScore >= 30) {
          classification = 'Suspicious — Verify Independently';
        } else {
          classification = 'No Obvious Scam Indicators Detected';
        }
      }

      const refNum = Math.floor(100000 + Math.random() * 900000);

      const finalResult: ScamAnalysisResult = {
        referenceId: `SHIELD-${refNum}`,
        analyzedAt: new Date().toISOString(),
        classification,
        riskScore: Math.min(100, Math.max(0, Number(parsedJson.riskScore) || 0)),
        riskLevel: parsedJson.riskLevel || (parsedJson.riskScore > 75 ? 'Critical' : parsedJson.riskScore > 50 ? 'High' : parsedJson.riskScore > 25 ? 'Medium' : 'Safe'),
        riskExplanation: parsedJson.riskExplanation || 'Analyzed observable social engineering signals.',
        summary: parsedJson.summary || 'Completed automated scam risk assessment.',
        indicators: (parsedJson.indicators || []).map((ind: any) => ({
          type: String(ind.type || 'Indicator'),
          severity: ['high', 'medium', 'low'].includes(String(ind.severity).toLowerCase())
            ? (String(ind.severity).toLowerCase() as 'high' | 'medium' | 'low')
            : 'medium',
          quote: String(ind.quote || ''),
          explanation: String(ind.explanation || ''),
        })),
        observableUrls,
        safetyActions: parsedJson.safetyActions && parsedJson.safetyActions.length > 0
          ? parsedJson.safetyActions
          : [
              'Do not send money, OTPs, or confidential personal information.',
              'Verify communication through official channels independently.',
              'Report suspicious correspondence to your local cybercrime bureau.',
            ],
        limitations:
          parsedJson.limitations ||
          'AI-assisted analysis is advisory and not a guarantee of safety. Sophisticated adversaries continually evolve tactics.',
        analysisMethod: 'AI-Assisted (Gemini 3.8 Flash) + Cybersecurity Heuristics',
        isAiPowered: true,
      };

      return res.json(finalResult);
    } catch (aiError: any) {
      console.error('[ScamShield] Gemini generation error, falling back to heuristics:', aiError);
      const fallbackResult = analyzeWithHeuristics(trimmed);
      fallbackResult.analysisMethod = 'Cybersecurity Heuristic Rules (AI Service Failover Mode)';
      return res.json(fallbackResult);
    }
  } catch (error: any) {
    console.error('[ScamShield] Unexpected analysis route error:', error);
    res.status(500).json({ error: 'Failed to process message analysis. Please try again.' });
  }
});

// API: OCR Screenshot extraction endpoint using Gemini Vision
app.post('/api/ocr', async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required for OCR.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'OCR feature requires an active Gemini API connection on the server. Please paste text directly or configure GEMINI_API_KEY.',
      });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType || 'image/png',
            },
          },
          {
            text: 'Extract ALL readable message text from this screenshot verbatim. If this is an SMS, WhatsApp, iMessage, Email, or social media conversation, extract the exact text sent by the sender. Do not add editorial commentary or markdown headers. Just return the extracted raw message text so the user can inspect and analyze it.',
          },
        ],
      },
    });

    const extractedText = (response.text || '').trim();

    if (!extractedText) {
      return res.status(422).json({ error: 'No readable text was detected in the provided image.' });
    }

    return res.json({ extractedText });
  } catch (error: any) {
    console.error('[ScamShield] OCR error:', error);
    return res.status(500).json({ error: 'Failed to extract text from screenshot. Please paste message text manually.' });
  }
});

// In production, serve Vite built assets; in development, mount Vite middleware
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ScamShield] Server running at http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch(err => {
  console.error('[ScamShield] Failed to start server:', err);
});
