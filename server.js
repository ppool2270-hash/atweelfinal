const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');

const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = 3000;

app.use(compression());
app.use(cors());
app.use(express.json());

// In-memory enquiry store for demo & admin panel
const enquiries = [
  {
    id: "sample-1",
    referenceId: "ATW-RFQ-20260801-A1B2C3",
    fullName: "Arthur Pendelton",
    companyName: "Royal Tea Merchants Ltd",
    email: "a.pendelton@royalteamerchants.co.uk",
    country: "United Kingdom",
    teaGrade: "Kharsang Golden Tips Orthodox",
    quantityKg: 2500,
    customBlendingNotes: "Requesting vacuum foil packaging 25kg master cartons. Target delivery port Felixstowe.",
    targetPort: "Port of Felixstowe",
    isHighValue: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: "new"
  },
  {
    id: "sample-2",
    referenceId: "ATW-RFQ-20260805-X9Y8Z7",
    fullName: "Elena Rostova",
    companyName: "Baltic Import House",
    email: "e.rostova@balticimport.de",
    country: "Germany",
    teaGrade: "Arunachal Silver Needle White",
    quantityKg: 300,
    customBlendingNotes: "First flush spring buds requested with certificate of analysis for organic purity.",
    targetPort: "Port of Hamburg",
    isHighValue: false,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: "new"
  }
];

// --- DYNAMIC SITE DATA STORE (MODIFIABLE VIA DATA CMS) ---
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Kharsang Golden Tips Orthodox",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "SFTGFOP1 Whole Leaf · Single-Estate",
    certifications: ["ISO 22000", "HACCP", "India Organic (NPOP)", "FSSAI Export"],
    moq: "100 KG",
    basePrice: 22.00,
    priceRange: "$22.00 - $32.00 / KG",
    flavor: "Malty cocoa depth, floral orchids aroma, bright golden liquor with honey undertones",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=75",
    description: "Our flagship single-estate orthodox black tea, featuring 38%+ golden tips plucked from Patkai foothill gardens.",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Atweel Estate Whole Leaf Black",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "FTGFOP1 Premium Grade",
    certifications: ["ISO 22000", "HACCP", "FSSAI Export"],
    moq: "200 KG",
    basePrice: 16.50,
    priceRange: "$16.50 - $24.00 / KG",
    flavor: "Full-bodied robust malt, rich amber infusion, smooth woody sweetness",
    image: "https://images.unsplash.com/photo-1563822249510-0254c2518e97?auto=format&fit=crop&w=600&q=75",
    description: "Hand-crafted whole leaf black tea produced with climate-controlled brass trough withering.",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Arunachal Silver Needle White",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "Specialty White Tea · Downy Buds",
    certifications: ["USDA Organic", "India Organic (NPOP)", "EU Organic"],
    moq: "50 KG",
    basePrice: 68.00,
    priceRange: "$68.00 - $88.00 / KG",
    flavor: "Subtle melon sweetness, delicate wild cucumber notes, pale champagne liquor",
    image: "https://images.unsplash.com/photo-1470162656305-6f429ba817bf?auto=format&fit=crop&w=600&q=75",
    description: "Sun-withered unopened buds harvested only for two weeks each spring — our rarest single-estate offering.",
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Kharsang Emerald Green Tea",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "Pan-Fired Whole Leaf · Spring Pluck",
    certifications: ["India Organic (NPOP)", "USDA Organic", "HACCP", "FSSAI"],
    moq: "100 KG",
    basePrice: 18.00,
    priceRange: "$18.00 - $26.00 / KG",
    flavor: "Fresh vegetal briskness, chestnut sweetness, jade-green cup with a clean bright finish",
    image: "https://images.unsplash.com/photo-1577016029703-cc22a7c0c28c?auto=format&fit=crop&w=600&q=75",
    description: "Traditional pan-fired green tea processed within four hours of plucking to lock in aromatic freshness.",
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: "Atweel Reserve Oolong",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "Semi-Oxidised · 40% Fermentation",
    certifications: ["India Organic (NPOP)", "ISO 22000", "Rainforest Alliance"],
    moq: "100 KG",
    basePrice: 34.00,
    priceRange: "$34.00 - $46.00 / KG",
    flavor: "Ripe peach and orchid aromatics, creamy honey body, layered floral finish",
    image: "https://images.unsplash.com/photo-1639573535302-3cbc366dd393?auto=format&fit=crop&w=600&q=75",
    description: "Rolled, semi-oxidised leaves crafted by our master tea maker — a signature small-batch specialty blend.",
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Atweel Organic CTC Premium",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "BPS / PF1 Broken Pekoe Special",
    certifications: ["India Organic (NPOP)", "FSSAI", "ISO 22000", "HACCP"],
    moq: "500 KG",
    basePrice: 6.80,
    priceRange: "$6.80 - $9.50 / KG",
    flavor: "Robust brisk body, bright coppery liquor, ideal for milk & spiced chai preparations",
    image: "https://images.unsplash.com/photo-1531969179221-3946e6b5a5e7?auto=format&fit=crop&w=600&q=75",
    description: "High-yield CTC granules engineered for tea packers, chai brands and hospitality service — full-flavour value grade.",
    inStock: true,
    featured: false
  }
];

let siteProducts = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));


const INITIAL_ERP = {
  orders: [
    { id: "PO-2026-891", buyer: "Amsterdam Tea Co.", date: "2026-08-10", amount: 145000, status: "Processing", items: "12,000kg CTC" },
    { id: "PO-2026-890", buyer: "Nairobi Blenders", date: "2026-08-08", amount: 89000, status: "Shipped", items: "8,500kg Orthodox" },
    { id: "PO-2026-889", buyer: "London Premium", date: "2026-08-05", amount: 210000, status: "Delivered", items: "15,000kg Silver Needle" }
  ],
  invoices: [
    { id: "INV-2026-891", orderId: "PO-2026-891", dueDate: "2026-09-10", status: "Unpaid", amount: 145000 },
    { id: "INV-2026-890", orderId: "PO-2026-890", dueDate: "2026-09-08", status: "Paid", amount: 89000 },
    { id: "INV-2026-889", orderId: "PO-2026-889", dueDate: "2026-09-05", status: "Paid", amount: 210000 }
  ],
  financials: {
    ytdRevenue: 3450000,
    pendingReceivables: 450000,
    monthlyGrowth: "+12.4%"
  },
  inventory: {
    "CTC Premium": 45000,
    "Orthodox": 12000,
    "Silver Needle": 3500,
    "Green Emerald": 8000
  }
};
let siteErp = JSON.parse(JSON.stringify(INITIAL_ERP));

let siteShipments = {
  "EXP-8842-NL": {
    trackingNumber: "EXP-8842-NL",
    status: "In Transit · Customs Cleared",
    vessel: "MV Kharsang Express V.402",
    origin: "Kolkata Port (via Kharsang Factory)",
    destination: "Port of Rotterdam",
    eta: "14 Jun 2026",
    temperature: "18.4°C (Controlled Dry Cargo)",
    humidity: "45% RH",
    milestones: [
      { step: "Factory Quality Inspection & Vacuum Sealing", date: "28 May 2026", completed: true },
      { step: "Container Stuffing & FSSAI Seal Verification", date: "30 May 2026", completed: true },
      { step: "Kolkata Port Departure & Customs Clearance", date: "02 Jun 2026", completed: true },
      { step: "Mid-Ocean Transit (Indian Ocean)", date: "08 Jun 2026", completed: true },
      { step: "Destination Port Arrival & Unloading", date: "14 Jun 2026 (Expected)", completed: false }
    ]
  },
  "ATW-9921-US": {
    trackingNumber: "ATW-9921-US",
    status: "On Schedule · Atlantic Transit",
    vessel: "CMA CGM Marco Polo V.108",
    origin: "Kolkata Port (via Kharsang Factory)",
    destination: "Port of New York / New Jersey",
    eta: "22 Jun 2026",
    temperature: "19.1°C",
    humidity: "42% RH",
    milestones: [
      { step: "Factory Batch Blend & USDA Sampling", date: "01 Jun 2026", completed: true },
      { step: "Kolkata Port Seal & Bill of Lading Issued", date: "05 Jun 2026", completed: true },
      { step: "Suez Canal Transit Completed", date: "11 Jun 2026", completed: true },
      { step: "Port of New York Arrival", date: "22 Jun 2026 (Expected)", completed: false }
    ]
  }
};

let siteEstateMetrics = {
  bighaArea: "1,200 Bigha",
  factorySqFt: "72,000 Sq Ft",
  organicPurity: "100% Organic",
  dispatchPort: "Kolkata Port",
  exportCountriesCount: 45,
  annualProductionMt: 850
};

let siteAnnouncement = {
  enabled: true,
  badge: "2026 Spring Plucking",
  message: "First-Flush Golden Tips harvest commenced at Kharsang Estate — Reserve direct export allocations now",
  linkText: "Request Wholesale Allocation",
  linkTab: "rfq"
};

let siteCertificates = [
  { id: "CERT-ISO22000", title: "ISO 22000:2018 Food Safety Management", category: "Quality Management", body: "Bureau Veritas Certification", validity: "Valid through Oct 2028", status: "Verified & Active", docUrl: "#" },
  { id: "CERT-HACCP", title: "Hazard Analysis Critical Control Point (HACCP)", category: "Food Safety", body: "SGS International", validity: "Valid through Dec 2027", status: "Verified & Active", docUrl: "#" },
  { id: "CERT-ORGANIC-NPOP", title: "India Organic (NPOP / APEDA)", category: "Organic Certification", body: "OneCert International", validity: "Valid through Mar 2029", status: "Verified & Active", docUrl: "#" },
  { id: "CERT-FSSAI-EXPORT", title: "FSSAI Export License #10020083000192", category: "Regulatory License", body: "Food Safety & Standards Authority India", validity: "Lifetime Active", status: "Verified & Active", docUrl: "#" }
];

let siteAuditLog = [
  { id: "LOG-101", timestamp: new Date().toISOString(), action: "CMS Initialized", user: "System", details: "Dynamic site data store loaded with factory default catalog and shipment records." }
];

function addAuditLog(action, details, user = "Admin") {
  siteAuditLog.unshift({
    id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    action,
    details,
    user
  });
  if (siteAuditLog.length > 100) siteAuditLog = siteAuditLog.slice(0, 100);
}

  // Helper: Dispatch Email Notifications
async function dispatchRfqEmail(newDoc) {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || 'atweeltea@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;
  const rawSmtpPass = process.env.SMTP_PASS || 'swtu krci eguh chsi';
  const cleanSmtpPass = rawSmtpPass.replace(/\s+/g, '');
  const smtpUser = process.env.SMTP_USER || 'rpinfragroup@gmail.com';
  const fromEmail = process.env.SMTP_FROM || `Atweel Tea <${smtpUser}>`;

  const subjectDesk = `[NEW RFQ ${newDoc.isHighValue ? '🔥 HIGH VALUE' : ''}] ${newDoc.companyName} (${newDoc.quantityKg} kg ${newDoc.teaGrade}) - Ref ${newDoc.referenceId}`;
  const subjectBuyer = `Atweel Tea Organic Export RFQ Confirmation - ${newDoc.referenceId}`;

  const htmlContentDesk = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #FDF9EE; padding: 24px; border: 1px solid #D4AF37; border-radius: 12px;">
      <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 16px; margin-bottom: 20px;">
        <h1 style="color: #0F172A; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">ATWEEL TEA ORGANIC ESTATE</h1>
        <p style="color: #9A7B2C; margin: 4px 0 0 0; font-size: 12px; font-weight: bold; letter-spacing: 1.5px;">NEW EXPORT ENQUIRY RECEIVED</p>
      </div>

      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 35%;">Reference ID:</td><td style="padding: 6px 0; color: #9A7B2C; font-weight: bold;">${newDoc.referenceId}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Company Name:</td><td style="padding: 6px 0;">${newDoc.companyName}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Contact Person:</td><td style="padding: 6px 0;">${newDoc.fullName}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${newDoc.email}" style="color: #0F172A; text-decoration: underline;">${newDoc.email}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Country:</td><td style="padding: 6px 0;">${newDoc.country}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Requested Tea Grade:</td><td style="padding: 6px 0; color: #0F172A; font-weight: bold;">${newDoc.teaGrade}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Quantity:</td><td style="padding: 6px 0; font-weight: bold;">${newDoc.quantityKg.toLocaleString()} kg ${newDoc.isHighValue ? '<span style="color: #15803d; font-size: 12px;">(High-Value Bulk Order)</span>' : ''}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Target Port:</td><td style="padding: 6px 0;">${newDoc.targetPort}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Custom Notes:</td><td style="padding: 6px 0; font-style: italic;">${newDoc.customBlendingNotes || 'None specified'}</td></tr>
        </table>
      </div>

      <div style="font-size: 12px; color: #64748b; text-align: center;">
        <p style="margin: 0;">Atweel Tea Organic Garden · Kharsang, Arunachal Pradesh 792122, India</p>
      </div>
    </div>
  `;

  const htmlContentBuyer = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #FFFDF7; padding: 24px; border: 1px solid #D4AF37; border-radius: 12px;">
      <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 16px; margin-bottom: 20px;">
        <h1 style="color: #0F172A; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">ATWEEL TEA</h1>
        <p style="color: #9A7B2C; margin: 4px 0 0 0; font-size: 12px; font-weight: bold; letter-spacing: 1.5px;">100% ORGANIC SINGLE-ESTATE · KHARSANG, ARUNACHAL</p>
      </div>

      <p style="color: #1e293b; font-size: 15px;">Dear ${newDoc.fullName},</p>
      <p style="color: #334155; font-size: 14px; line-height: 1.6;">
        Thank you for contacting Atweel Tea. We have received your bulk enquiry for <strong>${newDoc.quantityKg.toLocaleString()} kg</strong> of <strong>${newDoc.teaGrade}</strong>.
      </p>

      <div style="background-color: #FDF9EE; padding: 16px; border-radius: 8px; border-left: 4px solid #D4AF37; margin: 20px 0;">
        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: bold; color: #9A7B2C; text-transform: uppercase;">Enquiry Reference ID</p>
        <p style="margin: 0; font-size: 18px; font-weight: bold; color: #0F172A; font-family: monospace;">${newDoc.referenceId}</p>
      </div>

      <p style="color: #334155; font-size: 14px; line-height: 1.6;">
        Our trade export desk will review your specifications and issue a formal Proforma Invoice, shipping schedule, and Certificate of Analysis (CoA) within 4-6 business hours.
      </p>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
        <p style="margin: 0; font-weight: bold; color: #0F172A;">Atweel Tea Export Desk</p>
        <p style="margin: 2px 0;">Corporate Office & Factory: Kharsang, Changlang District, Arunachal Pradesh 792122, India</p>
        <p style="margin: 2px 0;">Email: atweeltea@gmail.com | Phone: +91 94360 22000</p>
      </div>
    </div>
  `;

  // 1. Primary: Try Gmail SMTP via Nodemailer
  if (smtpUser && cleanSmtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: cleanSmtpPass
        }
      });

      // Send to Export Desk (atweeltea@gmail.com)
      await transporter.sendMail({
        from: fromEmail,
        to: recipientEmail,
        subject: subjectDesk,
        html: htmlContentDesk
      });

      // Send confirmation to Buyer
      try {
        await transporter.sendMail({
          from: fromEmail,
          to: newDoc.email,
          subject: subjectBuyer,
          html: htmlContentBuyer
        });
      } catch (e) {
        console.warn('Gmail SMTP buyer confirmation warning:', e.message);
      }

      console.log(`[EMAIL SUCCESS] Sent from ${smtpUser} to ${recipientEmail} via Gmail SMTP.`);
      return { success: true, method: 'gmail_smtp', recipient: recipientEmail };
    } catch (err) {
      console.error('Gmail SMTP delivery failed:', err.message);
    }
  }

  // 2. Secondary: Try Resend if configured and valid
  if (resendApiKey && resendApiKey.startsWith('re_')) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: 'Atweel Tea <onboarding@resend.dev>',
        to: [recipientEmail],
        subject: subjectDesk,
        html: htmlContentDesk
      });
      try {
        await resend.emails.send({
          from: 'Atweel Tea <onboarding@resend.dev>',
          to: [newDoc.email],
          subject: subjectBuyer,
          html: htmlContentBuyer
        });
      } catch (e) {
        console.warn('Resend buyer confirmation warning:', e.message);
      }
      return { success: true, method: 'resend', recipient: recipientEmail };
    } catch (err) {
      console.error('Resend delivery failed:', err.message);
    }
  }

  // 3. Fallback: Log email details locally
  console.log(`\n========================================`);
  console.log(`[EMAIL LOGGED - SMTP / RESEND NOT ACTIVE]`);
  console.log(`From: ${fromEmail}`);
  console.log(`To: ${recipientEmail}`);
  console.log(`Subject: ${subjectDesk}`);
  console.log(`Ref ID: ${newDoc.referenceId}`);
  console.log(`Company: ${newDoc.companyName} (${newDoc.fullName} - ${newDoc.email})`);
  console.log(`========================================\n`);

  return {
    success: false,
    method: 'logged_locally',
    recipient: recipientEmail,
    notice: 'Enquiry recorded in system.'
  };
}

// --- API ROUTES ---

app.get(['/api', '/api/health'], (req, res) => {
  res.json({
    status: "ok",
    version: "3.0.0",
    email_configured: !!(process.env.RESEND_API_KEY || (process.env.SMTP_HOST && process.env.SMTP_USER)),
    email_recipient: process.env.NOTIFICATION_EMAIL || 'atweeltea@gmail.com',
    whatsapp_configured: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
    high_value_threshold_kg: Number(process.env.HIGH_VALUE_KG_THRESHOLD || 1000)
  });
});

app.post('/api/rfq', async (req, res) => {
  const { fullName, companyName, email, country, teaGrade, quantityKg, customBlendingNotes, targetPort } = req.body || {};
  if (!fullName || !companyName || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const qty = Number(quantityKg) || 100;
  const threshold = Number(process.env.HIGH_VALUE_KG_THRESHOLD || 1000);
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randHex = Math.random().toString(16).substring(2, 8).toUpperCase();
  const refId = `ATW-RFQ-${dateStr}-${randHex}`;

  const newDoc = {
    id: `rfq-${Date.now()}`,
    referenceId: refId,
    fullName,
    companyName,
    email,
    country: country || "India",
    teaGrade: teaGrade || "Kharsang Golden Tips Orthodox",
    quantityKg: qty,
    customBlendingNotes: customBlendingNotes || "",
    targetPort: targetPort || "Kolkata Port",
    isHighValue: qty >= threshold,
    createdAt: now.toISOString(),
    status: "new"
  };

  enquiries.unshift(newDoc);

  const emailResult = await dispatchRfqEmail(newDoc);

  res.json({
    success: true,
    message: `Enquiry successfully submitted for ${companyName}. Reference ID: ${refId}`,
    referenceId: refId,
    emailDelivered: emailResult.success,
    notificationEmail: emailResult.recipient,
    emailMethod: emailResult.method,
    emailStatusNotice: emailResult.notice || (emailResult.success ? `Email delivered via ${emailResult.method}` : null),
    buyerConfirmationSent: emailResult.success,
    whatsappNotificationScheduled: qty >= threshold,
    highValue: qty >= threshold
  });
});


app.get('/firebase-applet-config.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'firebase-applet-config.json'));
});

app.get('/api/site-data', (req, res) => {
  res.json({
    success: true,
    products: siteProducts,
    shipments: Object.values(siteShipments),
    estate: siteEstateMetrics,
    announcement: siteAnnouncement,
    certificates: siteCertificates,
    enquiries,
    erp: siteErp
  });
});

app.post('/api/track-shipment', (req, res) => {
  const num = (req.body?.trackingNumber || "").trim().toUpperCase();
  if (siteShipments[num]) {
    return res.json({
      success: true,
      ...siteShipments[num]
    });
  }

  if ((num.includes("TEA") || num.includes("EXP") || num.includes("ATW")) && num.length > 5) {
    const destPort = num.length >= 4 ? `Port of ${num.slice(-4)}` : "Port of Rotterdam";
    return res.json({
      success: true,
      trackingNumber: num,
      status: "In Transit · Customs Cleared",
      vessel: "MV Kharsang Express V.402",
      origin: "Kolkata Port (via Kharsang Factory)",
      destination: destPort,
      eta: "14 Jun 2026",
      temperature: "18.4°C (Controlled Dry Cargo)",
      humidity: "45% RH",
      milestones: [
        { step: "Factory Quality Inspection & Vacuum Sealing", date: "28 May 2026", completed: true },
        { step: "Container Stuffing & FSSAI Seal Verification", date: "30 May 2026", completed: true },
        { step: "Kolkata Port Departure & Customs Clearance", date: "02 Jun 2026", completed: true },
        { step: "Mid-Ocean Transit (Indian Ocean)", date: "08 Jun 2026", completed: true },
        { step: "Destination Port Arrival & Unloading", date: "14 Jun 2026 (Expected)", completed: false }
      ]
    });
  }
  return res.status(404).json({
    detail: "Tracking number not found. Try sample: EXP-8842-NL or ATW-9921-US"
  });
});

app.post('/api/ai-compliance-consultant', async (req, res) => {
  const { query, certificates, mrlContext } = req.body || {};
  
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "AI Assistant is currently offline. GEMINI_API_KEY is not configured on the server." });
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Constructing a robust prompt providing the context of the certificates and the user's question
    const prompt = `
You are the official AI Compliance and Export Trade Consultant for "Atweel Tea" (Atweel Food & Beverages Pvt. Ltd.).
Your job is to answer questions from B2B buyers regarding our compliance, certifications, factory standards, and MRL (Maximum Residue Limits) lab tests.

Context about Atweel Tea's compliance:
${certificates ? JSON.stringify(certificates, null, 2) : "Certificates information not provided."}

MRL Lab Testing Protocol:
${mrlContext || "All our teas undergo 500+ Multi-Residue Pesticide MRL Screening (0.00 ppm) tested by Eurofins / SGS prior to export at Kolkata Port."}

User Question:
"${query}"

Instructions:
1. Answer professionally, authoritatively, and concisely. Use business terminology appropriate for international trade and B2B buyers.
2. If the user asks about something covered in the context, use the context to answer accurately.
3. If the user asks something unrelated to tea, exports, or compliance, politely steer them back to our export compliance topics.
4. Keep the response to 1-2 paragraphs max. Use markdown formatting if helpful (e.g. bolding key terms).
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    res.json({ text: response.text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to generate AI response. Please try again later." });
  }
});

app.post('/api/calculate-quote', (req, res) => {
  const { teaGrade, quantityKg, packagingType, shippingMethod } = req.body || {};
  const qty = Number(quantityKg) || 100;

  let unitPrice = 18.00;
  const matchedProd = siteProducts.find(p => p.name === teaGrade);
  if (matchedProd && matchedProd.basePrice) {
    unitPrice = Number(matchedProd.basePrice);
  } else {
    const basePrices = {
      "Kharsang Golden Tips Orthodox": 22.00,
      "Atweel Estate Whole Leaf Black": 16.50,
      "Arunachal Silver Needle White": 68.00,
      "Kharsang Emerald Green Tea": 18.00,
      "Atweel Reserve Oolong": 34.00,
      "Atweel Organic CTC Premium": 6.80
    };
    unitPrice = basePrices[teaGrade] || 18.00;
  }

  let discount = 0.0;
  if (qty >= 5000) discount = 0.18;
  else if (qty >= 2000) discount = 0.12;
  else if (qty >= 500) discount = 0.08;

  const adjustedUnitPrice = unitPrice * (1 - discount);
  const subtotal = adjustedUnitPrice * qty;

  const packagingCosts = {
    "Bulk Vacuum Foil (10kg/25kg)": 0.50,
    "Retail Tin Caddies (100g/250g)": 3.20,
    "Biodegradable Pyramid Pouches": 2.10,
    "Master Export Cartons": 0.80
  };
  const pkgCost = (packagingCosts[packagingType] || 1.00) * qty;

  const freightRates = {
    "FOB - Ocean Freight (Standard Container)": 1.20,
    "CIF - Cost, Insurance & Freight": 2.10,
    "EXW - Ex-Works Factory Gate": 0.00,
    "Air Freight Express (Sample/Urgent)": 5.50
  };
  const freightCost = (freightRates[shippingMethod] || 1.50) * qty;
  const totalEstimated = subtotal + pkgCost + freightCost;

  res.json({
    success: true,
    teaGrade: teaGrade || "Kharsang Golden Tips Orthodox",
    quantityKg: qty,
    baseUnitPrice: unitPrice,
    discountAppliedPercent: Math.round(discount * 100),
    adjustedUnitPrice: Number(adjustedUnitPrice.toFixed(2)),
    subtotalUsd: Number(subtotal.toFixed(2)),
    packagingCostUsd: Number(pkgCost.toFixed(2)),
    freightCostUsd: Number(freightCost.toFixed(2)),
    totalEstimatedUsd: Number(totalEstimated.toFixed(2)),
    moqMet: qty >= 100,
    estimatedTransitDays: (shippingMethod || "").includes("Air") ? 3 : 14
  });
});

app.post('/api/admin/login', (req, res) => {
  const token = (req.body?.token || "").trim();
  const adminToken = (process.env.ADMIN_TOKEN || "atweel-admin-change-me").trim();
  if (token !== adminToken) {
    return res.status(401).json({ detail: "Invalid admin token" });
  }
  res.json({ success: true, token });
});

// Helper middleware for admin verification
function checkAdminAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.body?.adminToken;
  const adminToken = (process.env.ADMIN_TOKEN || "atweel-admin-change-me").trim();
  if (token !== adminToken) {
    return res.status(401).json({ detail: "Invalid or missing admin authorization token" });
  }
  next();
}

// --- ADMIN CMS DYNAMIC DATA ENDPOINTS ---

// 1. Add / Update Product
app.post('/api/admin/products', checkAdminAuth, (req, res) => {
  const { id, name, grade, origin, certifications, moq, basePrice, priceRange, flavor, image, description, inStock, featured } = req.body || {};
  if (!name) return res.status(400).json({ error: "Product name is required" });

  const existingIdx = siteProducts.findIndex(p => p.id === id || p.name === name);
  const updatedDoc = {
    id: existingIdx >= 0 ? siteProducts[existingIdx].id : (Date.now()),
    name,
    grade: grade || "Single-Estate Tea Grade",
    origin: origin || "Atweel Estate, Kharsang · Arunachal Pradesh",
    certifications: Array.isArray(certifications) ? certifications : ["ISO 22000", "FSSAI Export"],
    moq: moq || "100 KG",
    basePrice: Number(basePrice) || 20.00,
    priceRange: priceRange || `$${Number(basePrice || 20).toFixed(2)} / KG`,
    flavor: flavor || "Malty aromatics and bright liquor",
    image: image || "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=75",
    description: description || "Certified single-estate organic tea from Kharsang garden.",
    inStock: inStock !== undefined ? !!inStock : true,
    featured: !!featured
  };

  if (existingIdx >= 0) {
    siteProducts[existingIdx] = updatedDoc;
    addAuditLog("Updated Tea Grade", `Updated product catalog entry: ${name} ($${basePrice}/KG)`);
  } else {
    siteProducts.push(updatedDoc);
    addAuditLog("Added New Tea Grade", `Added new product to catalog: ${name} (${grade})`);
  }

  res.json({ success: true, message: `Product "${name}" saved successfully.`, product: updatedDoc, products: siteProducts });
});

// 2. Delete Product
app.delete('/api/admin/products/:id', checkAdminAuth, (req, res) => {
  const targetId = Number(req.params.id);
  const prod = siteProducts.find(p => p.id === targetId);
  siteProducts = siteProducts.filter(p => p.id !== targetId);
  addAuditLog("Deleted Tea Grade", `Removed product ID ${targetId} (${prod?.name || 'Unknown'}) from catalog`);
  res.json({ success: true, message: "Product deleted.", products: siteProducts });
});

// 3. Add / Update Cargo Shipment
app.post('/api/admin/shipments', checkAdminAuth, (req, res) => {
  const { trackingNumber, status, vessel, origin, destination, eta, temperature, humidity, milestones } = req.body || {};
  if (!trackingNumber) return res.status(400).json({ error: "Tracking number required" });

  const cleanNum = trackingNumber.trim().toUpperCase();
  const shipmentDoc = {
    trackingNumber: cleanNum,
    status: status || "In Transit · On Schedule",
    vessel: vessel || "MV Kharsang Express V.402",
    origin: origin || "Kolkata Port (via Kharsang Factory)",
    destination: destination || "Port of Rotterdam",
    eta: eta || "14 Days",
    temperature: temperature || "18.5°C",
    humidity: humidity || "45% RH",
    milestones: Array.isArray(milestones) && milestones.length > 0 ? milestones : [
      { step: "Factory Quality Inspection & Vacuum Sealing", date: "Recent", completed: true },
      { step: "Container Stuffing & Customs Clearance", date: "Recent", completed: true },
      { step: "In Transit to Destination Port", date: "Current", completed: true },
      { step: "Destination Port Arrival & Unloading", date: eta || "Upcoming", completed: false }
    ]
  };

  siteShipments[cleanNum] = shipmentDoc;
  addAuditLog("Updated Cargo Telemetry", `Updated shipment #${cleanNum} status: ${status} (${vessel})`);
  res.json({ success: true, message: `Tracking number ${cleanNum} updated successfully.`, shipment: shipmentDoc, shipments: Object.values(siteShipments) });
});

// 4. Delete Cargo Shipment
app.delete('/api/admin/shipments/:num', checkAdminAuth, (req, res) => {
  const targetNum = req.params.num.trim().toUpperCase();
  delete siteShipments[targetNum];
  addAuditLog("Deleted Cargo Record", `Removed tracking number #${targetNum}`);
  res.json({ success: true, message: `Shipment ${targetNum} deleted.`, shipments: Object.values(siteShipments) });
});

// 5. Update Estate Operational KPIs
app.post('/api/admin/estate', checkAdminAuth, (req, res) => {
  const { bighaArea, factorySqFt, organicPurity, dispatchPort, exportCountriesCount, annualProductionMt } = req.body || {};
  siteEstateMetrics = {
    bighaArea: bighaArea || siteEstateMetrics.bighaArea,
    factorySqFt: factorySqFt || siteEstateMetrics.factorySqFt,
    organicPurity: organicPurity || siteEstateMetrics.organicPurity,
    dispatchPort: dispatchPort || siteEstateMetrics.dispatchPort,
    exportCountriesCount: Number(exportCountriesCount) || siteEstateMetrics.exportCountriesCount,
    annualProductionMt: Number(annualProductionMt) || siteEstateMetrics.annualProductionMt
  };
  addAuditLog("Updated Estate KPIs", `Set Estate Garden Area to ${siteEstateMetrics.bighaArea}, Production to ${siteEstateMetrics.annualProductionMt} MT`);
  res.json({ success: true, message: "Estate KPIs updated successfully.", estate: siteEstateMetrics });
});

// 6. Update Website Announcement / Banner Ticker
app.post('/api/admin/announcement', checkAdminAuth, (req, res) => {
  const { enabled, badge, message, linkText, linkTab } = req.body || {};
  siteAnnouncement = {
    enabled: enabled !== undefined ? !!enabled : true,
    badge: badge || "Notice",
    message: message || "",
    linkText: linkText || "Learn More",
    linkTab: linkTab || "rfq"
  };
  addAuditLog("Updated Site Ticker", `Top announcement banner updated (${siteAnnouncement.enabled ? 'Active' : 'Disabled'}): "${siteAnnouncement.message}"`);
  res.json({ success: true, message: "Website announcement ticker updated.", announcement: siteAnnouncement });
});

// 7. Add / Update Compliance License or Quality Certificate
app.post('/api/admin/certificates', checkAdminAuth, (req, res) => {
  const { id, title, category, body, validity, status, docUrl } = req.body || {};
  if (!title) return res.status(400).json({ error: "Certificate title required" });

  const existingIdx = siteCertificates.findIndex(c => c.id === id);
  const certDoc = {
    id: existingIdx >= 0 ? siteCertificates[existingIdx].id : `CERT-${Date.now()}`,
    title,
    category: category || "Quality Certification",
    body: body || "Certification Body",
    validity: validity || "Valid",
    status: status || "Verified & Active",
    docUrl: docUrl || "#"
  };

  if (existingIdx >= 0) {
    siteCertificates[existingIdx] = certDoc;
    addAuditLog("Updated Certificate", `Updated certification: ${title} (${body})`);
  } else {
    siteCertificates.push(certDoc);
    addAuditLog("Added Certificate", `Added new factory license/cert: ${title}`);
  }

  res.json({ success: true, message: "Certificate saved successfully.", certificate: certDoc, certificates: siteCertificates });
});

// 8. Delete Compliance Certificate
app.delete('/api/admin/certificates/:id', checkAdminAuth, (req, res) => {
  const targetId = req.params.id;
  siteCertificates = siteCertificates.filter(c => c.id !== targetId);
  addAuditLog("Deleted Certificate", `Removed license/certificate ID ${targetId}`);
  res.json({ success: true, message: "Certificate deleted.", certificates: siteCertificates });
});

// 9. Get CMS Audit Logs
app.get('/api/admin/audit-log', checkAdminAuth, (req, res) => {
  res.json({ success: true, logs: siteAuditLog });
});

// 10. Export Full Site Backup (JSON)
app.get('/api/admin/export-data', checkAdminAuth, (req, res) => {
  const backupData = {
    exportedAt: new Date().toISOString(),
    version: "2.5.0-CMS",
    products: siteProducts,
    shipments: siteShipments,
    estate: siteEstateMetrics,
    announcement: siteAnnouncement,
    certificates: siteCertificates,
    enquiries
  };
  addAuditLog("Exported Site Data", "Downloaded full JSON backup of website catalog, shipments, and estate metrics");
  res.json({ success: true, data: backupData });
});

// 11. Import / Restore Site Backup (JSON)
app.post('/api/admin/import-data', checkAdminAuth, (req, res) => {
  const { data } = req.body || {};
  if (!data || typeof data !== "object") {
    return res.status(400).json({ error: "Invalid backup JSON data format" });
  }

  if (Array.isArray(data.products)) siteProducts = data.products;
  if (data.shipments && typeof data.shipments === "object") siteShipments = data.shipments;
  if (data.estate && typeof data.estate === "object") siteEstateMetrics = data.estate;
  if (data.announcement && typeof data.announcement === "object") siteAnnouncement = data.announcement;
  if (Array.isArray(data.certificates)) siteCertificates = data.certificates;
  if (Array.isArray(data.enquiries)) enquiries = data.enquiries;

  addAuditLog("Restored Site Data", "Restored website data from imported JSON backup bundle");

  res.json({
    success: true,
    message: "Website CMS data successfully restored from backup!",
    products: siteProducts,
    shipments: Object.values(siteShipments),
    estate: siteEstateMetrics,
    announcement: siteAnnouncement,
    certificates: siteCertificates,
    enquiries,
    erp: siteErp
  });
});

// 6. Update Enquiry Status / Notes
app.put('/api/admin/enquiries/:id', checkAdminAuth, (req, res) => {
  const enqId = req.params.id;
  const enq = enquiries.find(e => e.id === enqId || e.referenceId === enqId);
  if (!enq) return res.status(404).json({ error: "Enquiry not found" });

  if (req.body.status) enq.status = req.body.status;
  if (req.body.adminNotes !== undefined) enq.adminNotes = req.body.adminNotes;

  res.json({ success: true, message: "Enquiry updated.", enquiry: enq, enquiries });
});

// 7. Delete Enquiry
app.delete('/api/admin/enquiries/:id', checkAdminAuth, (req, res) => {
  const enqId = req.params.id;
  const idx = enquiries.findIndex(e => e.id === enqId || e.referenceId === enqId);
  if (idx >= 0) enquiries.splice(idx, 1);
  res.json({ success: true, message: "Enquiry deleted.", enquiries });
});

// 8. Reset Site Data to Factory Defaults
app.post('/api/admin/reset-defaults', checkAdminAuth, (req, res) => {
  siteProducts = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
  siteShipments = {
    "EXP-8842-NL": {
      trackingNumber: "EXP-8842-NL",
      status: "In Transit · Customs Cleared",
      vessel: "MV Kharsang Express V.402",
      origin: "Kolkata Port (via Kharsang Factory)",
      destination: "Port of Rotterdam",
      eta: "14 Jun 2026",
      temperature: "18.4°C (Controlled Dry Cargo)",
      humidity: "45% RH",
      milestones: [
        { step: "Factory Quality Inspection & Vacuum Sealing", date: "28 May 2026", completed: true },
        { step: "Container Stuffing & FSSAI Seal Verification", date: "30 May 2026", completed: true },
        { step: "Kolkata Port Departure & Customs Clearance", date: "02 Jun 2026", completed: true },
        { step: "Mid-Ocean Transit (Indian Ocean)", date: "08 Jun 2026", completed: true },
        { step: "Destination Port Arrival & Unloading", date: "14 Jun 2026 (Expected)", completed: false }
      ]
    }
  };
  siteEstateMetrics = {
    bighaArea: "1,200 Bigha",
    factorySqFt: "72,000 Sq Ft",
    organicPurity: "100% Organic",
    dispatchPort: "Kolkata Port",
    exportCountriesCount: 45,
    annualProductionMt: 850
  };
  res.json({
    success: true,
    message: "Site data reset to factory defaults.",
    products: siteProducts,
    shipments: Object.values(siteShipments),
    estate: siteEstateMetrics
  });
});

app.get('/api/admin/enquiries', (req, res) => {
  const token = req.headers['x-admin-token'];
  const adminToken = (process.env.ADMIN_TOKEN || "atweel-admin-change-me").trim();
  if (token !== adminToken) {
    return res.status(401).json({ detail: "Invalid or missing admin token" });
  }

  const { country, teaGrade, minKg, search, limit } = req.query;
  let items = [...enquiries];

  if (country && country !== "All") {
    items = items.filter(i => i.country === country);
  }
  if (teaGrade && teaGrade !== "All") {
    items = items.filter(i => i.teaGrade === teaGrade);
  }
  if (minKg) {
    const min = Number(minKg);
    items = items.filter(i => i.quantityKg >= min);
  }
  if (search) {
    const s = search.toLowerCase();
    items = items.filter(i =>
      (i.companyName && i.companyName.toLowerCase().includes(s)) ||
      (i.fullName && i.fullName.toLowerCase().includes(s)) ||
      (i.email && i.email.toLowerCase().includes(s)) ||
      (i.referenceId && i.referenceId.toLowerCase().includes(s))
    );
  }

  const maxLimit = Math.min(Number(limit) || 200, 500);
  items = items.slice(0, maxLimit);

  const total = enquiries.length;
  const highValue = enquiries.filter(i => i.isHighValue).length;
  const totalKgPipeline = enquiries.reduce((acc, i) => acc + (Number(i.quantityKg) || 0), 0);

  res.json({
    items,
    counts: {
      total,
      highValue,
      totalKgPipeline,
      matching: items.length
    }
  });
});

// --- SERVE FRONTEND ---

const buildPath = path.join(__dirname, 'frontend', 'build');

app.use(express.static(buildPath, {
  maxAge: '1d',
  etag: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff2?)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));


app.post('/api/admin/erp', (req, res) => {
  const { token, erpData } = req.body;
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  siteErp = erpData;
  res.json({ success: true, erp: siteErp });
});

app.get('*', (req, res) => {
  if (fs.existsSync(path.join(buildPath, 'index.html'))) {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.sendFile(path.join(buildPath, 'index.html'));
  } else {
    res.send(`<!DOCTYPE html><html><head><title>Building...</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;">
      <h2>Atweel Tea Application Starting...</h2>
      <p>Frontend is currently building. Please refresh in a few seconds.</p>
    </body></html>`);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Atweel Tea server running on http://0.0.0.0:${PORT}`);
});
