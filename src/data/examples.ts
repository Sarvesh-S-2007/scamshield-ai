import { ExampleMessage } from '../types';

export const EXAMPLE_MESSAGES: ExampleMessage[] = [
  {
    id: 'ex-job-1',
    title: 'Part-Time Task Job with "Registration Kit Fee"',
    category: 'Job Scam',
    channel: 'WhatsApp',
    expectedRisk: 'Critical',
    snippet: 'Earn $300-$800 daily by simply rating travel destinations on Google Maps. Pay $49 refundable security kit fee...',
    fullMessage: `Hello! I am Kelly from HR Global Recruitment. We reviewed your profile and are pleased to offer you a flexible remote part-time role. You can easily earn $350 - $900/day by simply completing 15-minute rating and review tasks on travel websites from your smartphone. 

No experience required! All training provided on Telegram @HR_KellyDirect. To activate your merchant workstation and receive your welcome bonus of $100, kindly transfer the one-time refundable verification kit fee of $49 via USDT or Apple Gift Card to the supervisor desk. Join now: t.me/travel_rating_desk`,
    description: 'Classic task/review scam. Combines unrealistic compensation with an upfront payment request disguised as a "refundable fee" on unmoderated chat platforms.',
    keySignals: ['Unsolicited job offer', 'Unrealistically high daily pay', 'Payment via gift card/USDT', 'Upfront activation fee', 'Telegram channel redirect'],
  },
  {
    id: 'ex-otp-2',
    title: 'Urgent OTP & 2FA Harvesting via Fake Bank Security',
    category: 'Banking & OTP',
    channel: 'SMS',
    expectedRisk: 'Critical',
    snippet: 'CHASE BANK ALERT: Unrecognized transaction of $1,280.99 at Apple Store. If NOT you, call +1-800-555-0199 or reply with your OTP code...',
    fullMessage: `[CHASE SECURITY ALERT] Unrecognized charge of $1,289.50 at BEST BUY NY has been flagged on your debit card ending in 4092. If this was NOT you, immediately reply to this message with your 6-digit One-Time Security Passcode (OTP) just sent to your phone to block this transaction, or call our fraud department at 888-492-0193 within 15 minutes. Failure to respond will finalize debit.`,
    description: 'Smishing attack engineered to steal the 2-Factor Authentication code required for the attacker to complete an unauthorized bank transfer.',
    keySignals: ['Artificial urgency (15 mins)', 'Direct request for OTP/passcode', 'Fear tactic (unauthorized purchase)', 'Unverified phone number'],
  },
  {
    id: 'ex-lottery-3',
    title: 'International Sweepstakes / Unclaimed Heritage Fund',
    category: 'Lottery & Prize',
    channel: 'Email',
    expectedRisk: 'Critical',
    snippet: 'CONGRATULATIONS: Your email ID was selected as lucky 2nd tier winner of £850,000 in the UK National Mega Sweepstakes 2026...',
    fullMessage: `Official Notification: UK NATIONAL LOTTERY BOARD / MEGA SWEEPSTAKES 2026
Reference: UK/NLB-9021884

Dear Beneficiary,
We are pleased to inform you that your personal email address was drawn among the 3 winning tickets in the international online random selection ballot. You have been awarded a lump sum payout of £850,000.00 (Eight Hundred and Fifty Thousand British Pounds) in cash.

To claim your fund deposited at Barclays Vault London, you must fill out the attached claims certificate and remit the mandatory consular documentation & stamp duty fee of £250 via Western Union to the claims commissioner in charge: Barrister Robert Sterling (dr.robert.barrister@executives-mail.xyz). 

Do not disclose this win to third parties until your transfer is credited to prevent double claims.`,
    description: 'Advance-fee fraud (419 scam). Requires the victim to pay fake "legal or customs stamp duty" to claim a completely fictional prize.',
    keySignals: ['Winning a lottery never entered', 'Upfront clearance fee via wire transfer', 'Free disposable email address (.xyz)', 'Secrecy warning'],
  },
  {
    id: 'ex-delivery-4',
    title: 'Package Delivery Address Update with Card Skimmer',
    category: 'Delivery & Phishing',
    channel: 'SMS',
    expectedRisk: 'Critical',
    snippet: 'USPS: Your parcel cannot be delivered due to an incomplete street address. Please update your details within 24 hours at usps-track-parcel.xyz/update...',
    fullMessage: `[USPS Delivery Notice]: Your parcel shipment #US98421049-FR could not be dispatched to your address due to an incorrect postal code. A small redelivery and holding fee of $1.85 is required to reschedule. Please confirm your delivery address and settle the fee immediately to avoid return to sender: https://usps-parcel-redelivery-portal.xyz/track/98421049`,
    description: 'Ubiquitous smishing campaign. Lures victims to a lookalike domain asking for credit card details under the guise of an innocuous $1.85 fee.',
    keySignals: ['Spoofed courier name (USPS)', 'Suspicious non-official domain (.xyz)', 'Low fee to lower guard and capture full card credentials', 'Urgency pressure'],
  },
  {
    id: 'ex-impersonation-5',
    title: 'Executive Impersonation (CEO Wire Fraud / BEC)',
    category: 'Impersonation',
    channel: 'Email',
    expectedRisk: 'High',
    snippet: 'From: David Miller (CEO) <david.miller-corp-exec@gmail.com> — Subject: Confidential acquisition wire transfer needed today...',
    fullMessage: `From: David Miller <david.miller-exec-office@gmail.com>
To: finance-desk@company.com
Subject: Urgent Acquisition Transfer — STRICTLY CONFIDENTIAL

Hi team,

I am currently in an all-day executive board meeting with our overseas acquisition partners and cannot take phone calls. 

We need to finalize an initial earnest deposit of $48,500 to secure the escrow contract before the close of Asian banking hours (2:00 PM EST today). Please process an immediate ACH/wire transfer using the escrow account details attached. 

Keep this strictly between us until the formal press release tomorrow morning. Send me the bank wire receipt as soon as it is transmitted.

Best regards,
David Miller
Chief Executive Officer`,
    description: 'Business Email Compromise (BEC). Uses executive authority, urgency, phone unavailability, and secrecy to bypass normal invoice verification.',
    keySignals: ['Freemail address (gmail.com) spoofing CEO', 'Call unavailability excuse', 'Strict confidentiality demand', 'Urgent wire transfer deadline'],
  },
  {
    id: 'ex-bank-6',
    title: 'KYC / PAN Suspension & Malicious APK Download',
    category: 'Banking & OTP',
    channel: 'SMS',
    expectedRisk: 'Critical',
    snippet: 'Dear Customer, your Bank Account KYC has expired. Your net banking will be suspended today. Update PAN immediately via bank-kyc-verify.top/app.apk...',
    fullMessage: `Dear Customer, your SBI/HDFC bank account has been blocked due to pending KYC verification. Your debit card and UPI will stop working tonight at 11:59 PM. To avoid permanent account suspension and Rs. 5000 fine, click here to update your PAN and Aadhaar number instantly: http://194.87.12.94/bank-kyc-update/sbi_support.apk`,
    description: 'High-severity banking smishing and malware dropper. Directs victims to install an untrusted APK from an IP address to intercept SMS and drain funds.',
    keySignals: ['Threat of penalty and immediate suspension', 'Raw IP address host', 'Direct .apk file download link', 'Demands identity documents (Aadhaar/PAN)'],
  },
  {
    id: 'ex-crypto-7',
    title: 'Guaranteed 15% Daily Yield Crypto Arbitrage Bot',
    category: 'Impersonation',
    channel: 'DM',
    expectedRisk: 'Critical',
    snippet: 'Exclusive invite to quantum AI crypto bot with guaranteed 15% compound daily ROI. Over 1,200 traders profiting without risk...',
    fullMessage: `Hey mate! Saw your comment in the investing forum. Just wanted to share the automated trading algorithm our private syndicate is running. It uses high-frequency AI flash loans to exploit DEX spreads with guaranteed 12% to 18% compound daily returns. Zero liquidation risk.

You start with just 250 USDT, and the bot runs on auto-pilot. I turned $500 into $14,200 in 3 weeks. Check out our verified ledger and register your wallet here: https://quantum-arbitrage-vault.finance.vip/?ref=VIP99`,
    description: 'Pig butchering / crypto investment scam. Makes mathematically impossible promises of "zero-risk" daily compounding returns to steal deposits.',
    keySignals: ['Guaranteed financial returns', 'Zero-risk claims on volatile assets', 'Pressure to deposit cryptocurrency', 'Unregulated domain (.vip)'],
  },
  {
    id: 'ex-utility-8',
    title: 'Imminent Electricity / Utility Power Disconnection Threat',
    category: 'Impersonation',
    channel: 'SMS',
    expectedRisk: 'High',
    snippet: 'POWER ALERT: Your electricity bill payment of $142.10 was rejected. Power supply will be disconnected at 8:00 PM tonight unless paid via quick link...',
    fullMessage: `URGENT POWER DEPT NOTICE: Dear Consumer, your last month power bill remains unpaid due to server banking failure. Your electric connection will be disconnected tonight at 8:30 PM from the power sub-station. To update your payment receipt immediately, call electricity officer Mr. Sharma at 98210-44910 or pay via instant link: http://power-bill-reconnect.online/pay`,
    description: 'Fear-based smishing targeting essential utilities. Panics the victim into paying a bogus bill or calling a fraudster posing as an officer.',
    keySignals: ['Immediate cutoff of essential service', 'Personal mobile number given for payment', 'Non-government .online URL', 'Nighttime deadline panic'],
  },
  {
    id: 'ex-safe-9',
    title: 'Legitimate E-Commerce Order Confirmation (Safe)',
    category: 'Legitimate',
    channel: 'Email',
    expectedRisk: 'Safe',
    snippet: 'Amazon.com: Order Confirmed #112-9481023-8419201. Your package will arrive Thursday, Nov 4. View order in your official account...',
    fullMessage: `Hello Sarah,

Thank you for your order! We'll send a confirmation once your item has shipped.

Order Details:
Order #112-9481023-8419201
Placed on: October 22, 2026

Items:
1x Anker USB-C Fast Charger 65W ($29.99)
Shipping Speed: Two-Day Prime Shipping
Estimated Delivery: Thursday, October 24

Need to make changes? You can view order status, change shipping addresses, or request cancellation anytime directly within your Amazon Account at https://www.amazon.com/your-orders.

We hope to see you again soon.
Amazon.com`,
    description: 'Standard authentic transaction confirmation. Contains verifiable order details, standard official domain, and does not demand immediate out-of-band payment.',
    keySignals: ['No threats or artificial urgency', 'Directs to official domain (amazon.com)', 'No requests for passwords or credit card CVV', 'Informational tone'],
  },
  {
    id: 'ex-safe-10',
    title: 'Legitimate Automated Bank Card Charge Alert (Safe)',
    category: 'Legitimate',
    channel: 'SMS',
    expectedRisk: 'Safe',
    snippet: 'Wells Fargo Alert: A charge of $24.50 at WHOLE FOODS was approved on card ...8812. If authorized, no action needed...',
    fullMessage: `Wells Fargo Alert: A card purchase of $24.50 was approved at WHOLE FOODS MARKET on card ending in 8812 on 10/22/2026 at 11:14 AM. If you made this purchase, no action is needed. If you did not authorize this transaction, please sign in to your Wells Fargo Mobile app to freeze your card or call the customer service number on the back of your physical card. Do not share this message with anyone.`,
    description: 'Standard informational bank alert. Advises the customer to use their official mobile app or the phone number printed on their physical card.',
    keySignals: ['No embedded external links', 'Directs user to official physical card number or app', 'No request to text back codes', 'Explicit warning not to share'],
  },
  {
    id: 'ex-ambiguous-11',
    title: 'Ambiguous Vendor Invoice Notification (Requires Verification)',
    category: 'Ambiguous',
    channel: 'Email',
    expectedRisk: 'Medium',
    snippet: 'Attached is Invoice #INV-8821 for consulting services rendered in Sept 2026. Please remit payment per terms...',
    fullMessage: `Hi Alex,

Hope your week is going well.

Attached is the updated statement and invoice #INV-8821 for the technical consulting hours completed in September 2026. Please review and process the remittance per our standard Net-30 payment terms.

Kindly let me know once queued with accounting.

Warm regards,
Marcus Vance
Apex Systems Advisory
marcus@apexadvisory-group.com`,
    description: 'Plausible business communication that could be genuine or a disguised invoice fraud attempt. Requires verification with accounting records before issuing funds.',
    keySignals: ['No overtly malicious links', 'References specific project context', 'Standard business tone', 'Requires out-of-band invoice verification'],
  },
  {
    id: 'ex-techsupport-12',
    title: 'Urgent Microsoft Security Alert & Remote Access Lock',
    category: 'Impersonation',
    channel: 'SMS',
    expectedRisk: 'Critical',
    snippet: 'WINDOWS DEFENDER: System Critical Error #0x80070057. Spyware detected! Your PC is locked. Call Windows Helpline immediately...',
    fullMessage: `CRITICAL ALERT: Windows Defender has detected Trojan Spyware (Error Code #0x8029A) on your device. Your banking passwords, emails, and credit cards are being transmitted to a foreign server. Your computer has been locked for your protection. Do not shut down or restart your computer. Call Microsoft Certified Senior Technicians immediately toll-free at 1-844-319-0941 to remove the intrusion and restore security.`,
    description: 'Classic tech-support scareware. Creates panic with fake error codes and threatens data loss to trick the victim into calling a scam call center and granting remote access.',
    keySignals: ['Fake error code (#0x8029A)', 'False claims of device lock', 'Urgent demand to call an unverified phone number', 'Claims of catastrophic data transmission'],
  },
];
