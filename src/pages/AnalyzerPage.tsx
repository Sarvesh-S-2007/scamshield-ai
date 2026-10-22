import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldAlert, 
  Trash2, 
  Send, 
  Upload, 
  FileText, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Info,
  HelpCircle
} from 'lucide-react';
import { PageNav, ScamAnalysisResult } from '../types';
import { EXAMPLE_MESSAGES } from '../data/examples';
import { saveToHistory } from '../utils/storage';

interface AnalyzerPageProps {
  initialText?: string;
  initialChannel?: string;
  onAnalysisComplete: (result: ScamAnalysisResult) => void;
  onNavigate: (page: PageNav) => void;
}

export const AnalyzerPage: React.FC<AnalyzerPageProps> = ({
  initialText = '',
  initialChannel = 'SMS',
  onAnalysisComplete,
  onNavigate,
}) => {
  const [message, setMessage] = useState(initialText);
  const [channel, setChannel] = useState(initialChannel);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('Initializing analysis pipeline...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // OCR state
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrSuccessNotice, setOcrSuccessNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialText) {
      setMessage(initialText);
    }
    if (initialChannel) {
      setChannel(initialChannel);
    }
  }, [initialText, initialChannel]);

  // Live URL detection
  const detectedUrls = React.useMemo(() => {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:xyz|top|work|click|club|live|info|online|vip|loan|cc|me|fit|link|ru|cn|tk|ga|cf|gq)(?:\/[^\s]*)?)/gi;
    const matches = message.match(urlRegex) || [];
    return Array.from(new Set(matches.map(m => m.replace(/[.,;!?)]+$/, ''))));
  }, [message]);

  const handleClear = () => {
    setMessage('');
    setErrorMessage(null);
    setOcrSuccessNotice(null);
  };

  const handleLoadSample = (sampleText: string, sampleChannel: string) => {
    setMessage(sampleText);
    setChannel(sampleChannel);
    setErrorMessage(null);
    setOcrSuccessNotice(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, or WEBP screenshot).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('Image size is too large (maximum 8MB).');
      return;
    }

    setIsOcrProcessing(true);
    setErrorMessage(null);
    setOcrSuccessNotice(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        try {
          const res = await fetch('/api/ocr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: base64Data,
              mimeType: file.type,
            }),
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || 'Failed to extract text from screenshot.');
          }

          if (data.extractedText) {
            setMessage(data.extractedText);
            setOcrSuccessNotice('Text successfully extracted from screenshot! Please review before analyzing.');
          } else {
            setErrorMessage('No text could be extracted from this image. Please paste text manually.');
          }
        } catch (ocrErr: any) {
          setErrorMessage(ocrErr.message || 'Error communicating with OCR service.');
        } finally {
          setIsOcrProcessing(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      reader.onerror = () => {
        setErrorMessage('Failed to read image file.');
        setIsOcrProcessing(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setErrorMessage(err.message || 'Image processing failed.');
      setIsOcrProcessing(false);
    }
  };

  const handleAnalyze = async () => {
    const trimmed = message.trim();
    if (!trimmed) {
      setErrorMessage('Please paste or type a message before analyzing.');
      return;
    }

    if (trimmed.length < 8) {
      setErrorMessage('Message is too brief to analyze. Please provide at least 8 characters of text.');
      return;
    }

    if (trimmed.length > 7000) {
      setErrorMessage('Message exceeds the 7,000 character analysis limit. Please shorten the text.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);

    // Progressive step indicator
    setLoadingStep('Step 1/3: Ingesting text & inspecting domain structure...');
    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Step 2/3: Applying cybersecurity threat heuristics...');
    }, 900);
    const stepTimer2 = setTimeout(() => {
      setLoadingStep('Step 3/3: Contextual AI threat evaluation & synthesizing defense actions...');
    }, 1800);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          messageType: channel,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze message.');
      }

      const result: ScamAnalysisResult = {
        ...data,
        analyzedText: trimmed,
        channel,
      };

      // Persist to local storage history
      saveToHistory(result);

      // Transition to results page
      onAnalysisComplete(result);
    } catch (err: any) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setErrorMessage(err.message || 'An error occurred while connecting to the analysis server.');
      setIsAnalyzing(false);
    }
  };

  const charCount = message.length;
  const isTooLong = charCount > 7000;

  return (
    <div className="min-h-screen text-slate-100 py-10 cyber-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Threat Analysis Console</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Analyze Suspicious Message
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Paste suspicious SMS texts, WhatsApp messages, emails, or job solicitations below for immediate risk assessment.
          </p>
        </div>

        {/* Quick Sample Selector Bar */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Quick Samples:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {EXAMPLE_MESSAGES.slice(0, 4).map((ex) => (
              <button
                key={ex.id}
                onClick={() => handleLoadSample(ex.fullMessage, ex.channel)}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-800/90 hover:bg-slate-700/80 text-slate-300 hover:text-cyan-300 border border-slate-700/80 transition-colors cursor-pointer"
              >
                {ex.category}
              </button>
            ))}
            <button
              onClick={() => onNavigate('examples')}
              className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium ml-1 cursor-pointer"
            >
              More Samples ({EXAMPLE_MESSAGES.length}) &rarr;
            </button>
          </div>
        </div>

        {/* Main Analyzer Card */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-sm relative">
          {/* Channel Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">Channel Type:</span>
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {['SMS', 'WhatsApp', 'Email', 'Telegram', 'Other'].map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setChannel(ch)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      channel === ch
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Screenshot OCR button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="screenshot-upload"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isOcrProcessing || isAnalyzing}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
              >
                {isOcrProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    <span>Extracting Text via OCR...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Upload Screenshot (OCR)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* OCR Success Banner */}
          {ocrSuccessNotice && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{ocrSuccessNotice}</span>
              </div>
              <button
                onClick={() => setOcrSuccessNotice(null)}
                className="text-slate-400 hover:text-white text-xs underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Text Area */}
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Paste suspicious SMS text, WhatsApp chat message, email headers & body, or job offer text here..."
              rows={8}
              disabled={isAnalyzing}
              className={`w-full bg-slate-950 rounded-xl p-4 text-sm font-mono text-slate-200 placeholder:text-slate-600 border focus:outline-none focus:ring-2 transition-all resize-y ${
                isTooLong
                  ? 'border-red-500 focus:ring-red-500/30'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
              }`}
            />

            {/* Character counter & info */}
            <div className="flex items-center justify-between mt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Info className="w-3.5 h-3.5" />
                <span>Client data remains private. Full text is analyzed securely.</span>
              </div>
              <div className={`font-mono text-xs ${isTooLong ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                {charCount} / 7,000 chars
              </div>
            </div>
          </div>

          {/* Observable URL detected alert */}
          {detectedUrls.length > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>Detected Embedded Link(s) ({detectedUrls.length}) — Inspected Without Visiting:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {detectedUrls.map((u, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 select-all"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Loading Animation Box */}
          {isAnalyzing && (
            <div className="mt-6 p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60 flex items-center gap-3 animate-pulse">
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin shrink-0" />
              <div className="text-xs text-cyan-200">
                <p className="font-semibold text-white">Analyzing Message Threat Vectors...</p>
                <p className="text-cyan-300/80 font-mono text-[11px] mt-0.5">{loadingStep}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <button
              onClick={handleClear}
              disabled={isAnalyzing || !message}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Input</span>
            </button>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !message.trim()}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Evaluating Threat...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>Analyze Message</span>
                  <Send className="w-3.5 h-3.5 text-slate-950" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Advisory Note */}
        <div className="mt-6 text-center text-xs text-slate-500 max-w-xl mx-auto">
          Notice: ScamShield AI performs automated pattern inspection. Evaluations are advisory. Always verify banking or legal claims independently through authenticated direct contacts.
        </div>
      </div>
    </div>
  );
};
