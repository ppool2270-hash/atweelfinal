import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import confetti from "canvas-confetti";
const MetadataConfig = lazy(() => import("./components/MetadataConfig"));
const CertificationCarousel = lazy(() => import("./components/CertificationCarousel"));
const QualityMetrics = lazy(() => import("./components/QualityMetrics"));
const TrajectorySourcingMap = lazy(() => import("./components/TrajectorySourcingMap"));
const AllocationControlDesk = lazy(() => import("./components/AllocationControlDesk"));
const LeadQualificationForm = lazy(() => import("./components/LeadQualificationForm"));
const SampleRequestModal = lazy(() => import("./components/SampleRequestModal"));
const CorporateGovernance = lazy(() => import("./components/CorporateGovernance"));
const KharsangTerroir = lazy(() => import("./components/KharsangTerroir"));
const ComplianceDossier = lazy(() => import("./components/ComplianceDossier"));
const AboutUs = lazy(() => import("./components/AboutUs"));
import { 
  ShieldCheck, Globe, Award, Truck, Calculator, FileText, 
  ChevronRight, ArrowRight, Package, Search, Star, CheckCircle2, 
  MapPin, Phone, Mail, Building, Download, ExternalLink, Menu, X,
  Clock, Thermometer, ShieldAlert, Sparkles, TrendingUp, ChevronDown, ChevronUp, HelpCircle, Boxes, FileCheck, Home, Leaf, Factory,
  Plus, Trash2, Edit3, RotateCcw, Save, Lock, Settings, RefreshCw, Bell, Upload, History, Copy, Check
} from "lucide-react";


const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

const TEA_CATALOG = [
  {
    id: 1,
    name: "Kharsang Golden Tips Orthodox",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "SFTGFOP1 (Special Finest Tippy Golden Flowery Orange Pekoe)",
    certifications: ["India Organic (NPOP)", "USDA Organic", "ISO 22000", "HACCP"],
    moq: "100 KG",
    priceRange: "$22.00 - $32.00 / KG",
    flavor: "Bright honeyed muscatel, abundant golden tips, silky amber liquor with a lingering malty finish",
    image: "https://images.unsplash.com/photo-1639573535302-3cbc366dd393?auto=format&fit=crop&w=600&q=75",
    description: "Our flagship second-flush orthodox tea, hand-plucked at 800m from the mist-covered slopes of the Patkai foothills."
  },
  {
    id: 2,
    name: "Atweel Estate Whole Leaf Black",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "FTGFOP (Finest Tippy Golden Flowery Orange Pekoe)",
    certifications: ["India Organic (NPOP)", "EU Organic", "ISO 22000", "FSSAI"],
    moq: "150 KG",
    priceRange: "$16.50 - $22.00 / KG",
    flavor: "Rich malty body, chestnut warmth, coppery-red cup, smooth naturally sweet finish",
    image: "https://images.unsplash.com/photo-1601230469955-ca57578ba056?auto=format&fit=crop&w=600&q=75",
    description: "Classic single-estate orthodox black tea produced entirely from our own 1,200-bigha organic garden."
  },
  {
    id: 3,
    name: "Arunachal Silver Needle White",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "Bai Hao Yin Zhen Style · First Flush Buds",
    certifications: ["India Organic (NPOP)", "USDA Organic", "EU Organic", "ISO 22000"],
    moq: "50 KG",
    priceRange: "$68.00 - $92.00 / KG",
    flavor: "Delicate honey-melon notes, pale champagne infusion, velvet-soft mouthfeel",
    image: "https://images.unsplash.com/photo-1470162656305-6f429ba817bf?auto=format&fit=crop&w=600&q=75",
    description: "Sun-withered unopened buds harvested only for two weeks each spring — our rarest single-estate offering."
  },
  {
    id: 4,
    name: "Kharsang Emerald Green Tea",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "Pan-Fired Whole Leaf · Spring Pluck",
    certifications: ["India Organic (NPOP)", "USDA Organic", "HACCP", "FSSAI"],
    moq: "100 KG",
    priceRange: "$18.00 - $26.00 / KG",
    flavor: "Fresh vegetal briskness, chestnut sweetness, jade-green cup with a clean bright finish",
    image: "https://images.unsplash.com/photo-1577016029703-cc22a7c0c28c?auto=format&fit=crop&w=600&q=75",
    description: "Traditional pan-fired green tea processed within four hours of plucking to lock in aromatic freshness."
  },
  {
    id: 5,
    name: "Atweel Reserve Oolong",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "Semi-Oxidised · 40% Fermentation",
    certifications: ["India Organic (NPOP)", "ISO 22000", "Rainforest Alliance"],
    moq: "100 KG",
    priceRange: "$34.00 - $46.00 / KG",
    flavor: "Ripe peach and orchid aromatics, creamy honey body, layered floral finish",
    image: "https://images.unsplash.com/photo-1639573535302-3cbc366dd393?auto=format&fit=crop&w=600&q=75",
    description: "Rolled, semi-oxidised leaves crafted by our master tea maker — a signature small-batch specialty blend."
  },
  {
    id: 6,
    name: "Atweel Organic CTC Premium",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    grade: "BPS / PF1 Broken Pekoe Special",
    certifications: ["India Organic (NPOP)", "FSSAI", "ISO 22000", "HACCP"],
    moq: "500 KG",
    priceRange: "$6.80 - $9.50 / KG",
    flavor: "Robust brisk body, bright coppery liquor, ideal for milk & spiced chai preparations",
    image: "https://images.unsplash.com/photo-1531969179221-3946e6b5a5e7?auto=format&fit=crop&w=600&q=75",
    description: "High-yield CTC granules engineered for tea packers, chai brands and hospitality service — full-flavour value grade."
  }
];

const TEA_GALLERY_GRID = [
  {
    id: "g1",
    title: "Kharsang SFTGFOP1 Golden Tips",
    category: "Orthodox Whole Leaf",
    badge: "Grade: SFTGFOP1",
    desc: "Abundant golden tips with rich honeyed aroma and malty finish. Hand-picked at 800m elevation in Patkai range.",
    image: "https://images.unsplash.com/photo-1639573535302-3cbc366dd393?auto=format&fit=crop&w=600&q=75",
    spec: "Moisture < 3.2% | Golden Tips > 38% | Export Ready"
  },
  {
    id: "g2",
    title: "Cupping & Liquoring Test",
    category: "Quality Assurance Lab",
    badge: "ISO 22000 Tested",
    desc: "Amber copper liquor evaluation in our 72,000 sq ft factory quality control laboratory before lot allocation.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=75",
    spec: "Color: Coppery Red | Infusion: Bright Floral | Organoleptic Passed"
  },
  {
    id: "g3",
    title: "Arunachal Silver Needle Buds",
    category: "Specialty White Tea",
    badge: "First Flush 2026",
    desc: "Sun-withered unopened spring buds harvested exclusively from the Patkai foothill slopes during early morning mist.",
    image: "https://images.unsplash.com/photo-1470162656305-6f429ba817bf?auto=format&fit=crop&w=600&q=75",
    spec: "Polyphenols > 24% | Velvet Downy Buds | USDA Organic"
  },
  {
    id: "g4",
    title: "Kharsang Emerald Green Leaf",
    category: "Pan-Fired Green",
    badge: "100% Organic",
    desc: "Pan-fired green tea processed within 4 hours of plucking to retain vibrant antioxidants and jade green liquor.",
    image: "https://images.unsplash.com/photo-1577016029703-cc22a7c0c28c?auto=format&fit=crop&w=600&q=75",
    spec: "Catechins High | Zero Additives | NPOP & EU Organic"
  },
  {
    id: "g5",
    title: "Two Leaves & A Bud Harvest",
    category: "Estate Agriculture",
    badge: "1,200 Bigha Garden",
    desc: "Certified organic hand-plucking by skilled local artisans at Nemphai section 1, Kharsang.",
    image: "/estate/estate-1-md.jpg",
    spec: "Plucking Standard: Fine (2L+B) | Zero Chemical Pesticides"
  },
  {
    id: "g6",
    title: "Orthodox Factory Processing",
    category: "Kharsang Plant",
    badge: "72,000 Sq Ft Plant",
    desc: "State-of-the-art rolling and withering troughs under ISO 22000 & HACCP food safety standards.",
    image: "/estate/estate-2-md.jpg",
    spec: "Brass Rolling Tables | Temperature Controlled Fermentation"
  },
  {
    id: "g7",
    title: "Patkai Range Valley Garden",
    category: "Highland Elevation",
    badge: "Arunachal Pradesh",
    desc: "Pristine mountain soil and natural rainforest mist nourishing our organic tea bushes at 300m-800m altitude.",
    image: "/estate/estate-3-md.jpg",
    spec: "Microclimate: High Rainfall & Foothill Mist | Virgin Forest Soil"
  },
  {
    id: "g8",
    title: "Export Bulk Packaging",
    category: "Global Logistics",
    badge: "Vacuum Foil Chests",
    desc: "Multi-ply aluminium vacuum bags and wooden chest packing for international sea freight container shipping.",
    image: "https://images.unsplash.com/photo-1531969179221-3946e6b5a5e7?auto=format&fit=crop&w=600&q=75",
    spec: "Foil Thickness: 120 Micron | Moisture Barrier | Container Ready"
  }
];


const CERTIFICATIONS = {
  "iso-22000": {
    key: "iso-22000",
    label: "ISO 22000:2018",
    fullName: "ISO 22000:2018 — Food Safety Management System",
    certId: "IS-QF-98421 / ATWL-2024",
    issuer: "TÜV SÜD South Asia Pvt. Ltd.",
    issuerCountry: "India / Germany",
    issued: "16 Dec 2024",
    validUntil: "15 Dec 2027",
    scope: "Farm-to-container manufacture, blending, packaging and export of orthodox, CTC, green, white and oolong teas at the Atweel Tea factory, Nemphai 1, Kharsang.",
    accreditation: "Accredited by DAkkS (Germany) & NABCB (India)",
    theme: "gold"
  },
  "haccp": {
    key: "haccp",
    label: "HACCP Compliant",
    fullName: "HACCP — Hazard Analysis Critical Control Point",
    certId: "HACCP-IN-4482",
    issuer: "Bureau Veritas India Pvt. Ltd.",
    issuerCountry: "India / France",
    issued: "03 Sep 2024",
    validUntil: "02 Sep 2027",
    scope: "HACCP-based food safety protocol covering plantation intake, withering, rolling, fermentation, drying, sorting, vacuum packaging and container stuffing.",
    accreditation: "Codex Alimentarius aligned · Recognised by EU RASFF & US FDA",
    theme: "navy"
  },
  "india-organic": {
    key: "india-organic",
    label: "India Organic (NPOP)",
    fullName: "India Organic — National Programme for Organic Production",
    certId: "IN-ORG-021 / NPOP-AP-1122",
    issuer: "IndoCert (accredited by APEDA, Govt. of India)",
    issuerCountry: "India",
    issued: "22 Jun 2024",
    validUntil: "21 Jun 2027",
    scope: "Organic cultivation, handling and processing certification for the 1,200-bigha Atweel Tea estate at Kharsang under NPOP standards.",
    accreditation: "Accredited by APEDA · Equivalent to Swiss & Canadian organic norms",
    theme: "green"
  },
  "usda-organic": {
    key: "usda-organic",
    label: "USDA Organic (NOP)",
    fullName: "USDA Organic — National Organic Program",
    certId: "NOP-1082-USA",
    issuer: "OneCert International Pvt. Ltd.",
    issuerCountry: "USA / India",
    issued: "30 Aug 2024",
    validUntil: "29 Aug 2027",
    scope: "US National Organic Program compliance for growing, processing, labelling and export of certified organic teas to US buyers.",
    accreditation: "USDA-Accredited Certifying Agent (ACA)",
    theme: "gold"
  },
  "eu-organic": {
    key: "eu-organic",
    label: "EU Organic",
    fullName: "EU Organic — Regulation (EU) 2018/848",
    certId: "EU-ORG-9432 / CE-DE-BIO",
    issuer: "Ceres GmbH",
    issuerCountry: "Germany",
    issued: "12 Nov 2024",
    validUntil: "11 Nov 2027",
    scope: "Organic production compliance under EU Regulation 2018/848 for import and retail in all 27 EU member states plus EFTA.",
    accreditation: "Notified by German Federal Office for Agriculture (BLE)",
    theme: "navy"
  },
  "sgs-eurofins": {
    key: "sgs-eurofins",
    label: "SGS & Eurofins Verified",
    fullName: "SGS · Eurofins — Independent Pre-Shipment Verification",
    certId: "Per-Lot Report — Latest: EF-2026-4482",
    issuer: "SGS India Pvt. Ltd. · Eurofins Analytik GmbH",
    issuerCountry: "Switzerland / Germany · Global network",
    issued: "Rolling · Every export lot",
    validUntil: "N/A — Batch-specific",
    scope: "Independent third-party random sampling and testing of every export lot for 500+ pesticide residues, heavy metals (Pb, As, Cd, Hg) and mycotoxins (Ochratoxin A, Aflatoxin B1). Digital 'Passed for EU/USA Food Entry' certificate issued per shipment.",
    accreditation: "ISO/IEC 17025 accredited laboratories · Recognised by EU, US FDA, Japan MHLW",
    theme: "gold"
  }
};

const B2B_EXPORT_FAQS = [
  {
    id: "lead-times",
    category: "Logistics & Lead Times",
    icon: Clock,
    question: "What are the standard production lead times and dispatch schedules for bulk exports?",
    answer: "For standard catalog grades (FTGFOP1, BOP, Orthodox, Green), dispatch from our Kharsang factory to Kolkata Port takes 4 to 6 business days following purchase order confirmation and quality inspection. Custom leaf cuts, master blending, or bespoke vacuum packaging orders typically require 10 to 14 business days. Fresh season first-flush and second-flush tea lots are reserved on a rolling harvest schedule starting March through October.",
    highlights: [
      "Standard Grades: 4–6 Days to Kolkata Port",
      "Custom Blends / OEM: 10–14 Days Lead Time",
      "Fresh Flush Harvest Cycles: March to October",
      "DHL Express Air Samples: 3–5 Days Worldwide"
    ],
    ctaText: "Calculate Freight Estimate",
    ctaTab: "calculator"
  },
  {
    id: "palletization",
    category: "Packaging & Container Loading",
    icon: Package,
    question: "How are bulk teas packaged and palletized to prevent moisture degradation during ocean transit?",
    answer: "Every bulk export order is packed inside multi-ply heavy-duty aluminum vacuum foil bags (chest lining) inserted within 5-ply export corrugated master cartons or traditional plywood tea chests. Cartons are heat-sealed with desiccant gel packs to guarantee moisture levels remain under 3.5% throughout ocean transit. Standard ISPM 15 heat-treated wooden pallets are used for sea freight container loading, wrapped with heavy-gauge stretch film and corner edge protectors.",
    highlights: [
      "Multi-Ply Aluminum Foil Vacuum Inner Liners",
      "5-Ply Corrugated / Plywood Master Chests",
      "ISPM 15 Heat-Treated Fumigated Wooden Pallets",
      "Desiccant Humidity Locks (< 3.5% Moisture)"
    ],
    ctaText: "Request Packaging Spec Sheet",
    ctaTab: "rfq"
  },
  {
    id: "container-capacity",
    category: "Packaging & Container Loading",
    icon: Boxes,
    question: "What is the maximum container loading capacity for 20ft and 40ft High Cube containers?",
    answer: "Container payload capacity varies based on the leaf density of the tea grade: Orthodox whole leaf teas (FTGFOP1) yield ~9,000 to 10,500 KG in a 20ft FCL and ~20,000 to 22,000 KG in a 40ft HC. Broken orthodox and CTC grades (BOP, PF) pack denser, reaching ~11,500 to 12,500 KG in a 20ft FCL and ~24,000 to 25,500 KG in a 40ft HC. Floor loading allows maximum volume utilization, while ISPM-15 palletization reduces net payload by approximately 8-10% but enables automated forklift unloading.",
    highlights: [
      "20ft FCL Payload: 9,000 – 12,500 KG",
      "40ft High Cube Payload: 20,000 – 25,500 KG",
      "Floor-Loaded vs ISPM-15 Palletized Options",
      "Maximum Volume Density Optimization"
    ],
    ctaText: "Open Wholesale Calculator",
    ctaTab: "calculator"
  },
  {
    id: "incoterms-ports",
    category: "Incoterms & Ocean Freight",
    icon: Truck,
    question: "Which ports of export and Incoterms are supported for international buyer shipments?",
    answer: "Primary ocean dispatches originate from Kolkata Port (Syama Prasad Mookerjee Port, INCCU1) and Haldia Port (INHAL1), India. We routinely execute orders under FOB Kolkata, CIF (Destination Port), CFR, and EXW (Kharsang Estate Factory). Our preferred global maritime logistics partners include Maersk Line, MSC, CMA CGM, and Hapag-Lloyd, offering optional reefer/humidity-controlled container bookings for high-value specialty grades.",
    highlights: [
      "Supported Terms: FOB Kolkata, CIF, CFR, EXW",
      "Primary Ports: Kolkata (INCCU1) & Haldia (INHAL1)",
      "Global Shipping Carriers: Maersk, MSC, CMA CGM",
      "Optional Climate-Controlled Containers"
    ],
    ctaText: "Track Active Shipments",
    ctaTab: "tracker"
  },
  {
    id: "documentation-customs",
    category: "Compliance & Documentation",
    icon: FileCheck,
    question: "What documentation bundle is provided for international customs and import clearance?",
    answer: "Every ocean container or airmail consignment is dispatched with a comprehensive legal documentation package required by customs authorities worldwide: Commercial Invoice, Packing List with Lot Traceability, Bill of Lading (B/L) or Air Waybill (AWB), Certificate of Origin (Form A / COO issued by Tea Board of India), Official Phytosanitary Certificate issued by Ministry of Agriculture (Govt. of India), FSSAI Export License Certificate, NPOP Organic Certificate, and Independent Laboratory Analysis (MRL & heavy metals test report).",
    highlights: [
      "Phytosanitary Certificate (Govt. of India)",
      "Tea Board of India Certificate of Origin",
      "Independent MRL & Heavy Metals Test Reports",
      "NPOP & USDA Organic Verification Docs"
    ],
    ctaText: "Verify MCA & FSSAI Licenses",
    ctaTab: "compliance"
  },
  {
    id: "samples-moq",
    category: "Samples & Ordering",
    icon: Award,
    question: "How can procurement officers request pre-shipment cupping samples and what is the MOQ?",
    answer: "We supply 100g sealed airmail cupping tins for all current harvest grades. Samples are dispatched via DHL Express or FedEx Air with tracking within 48 hours of request. Standard minimum order quantities (MOQ) are 250 KG for standard catalog grades, 500 KG for custom estate blends/private label orders, and 50 KG for rare micro-lots such as Kharsang Golden Tips or Silver Needle. Pre-shipment approval samples (PSS) are held from the exact container lot for buyer matching prior to final ocean loading.",
    highlights: [
      "100g Sealed Cupping Tins via DHL Express",
      "Standard Catalog MOQ: 250 KG",
      "Specialty Reserve Lot MOQ: 50 KG",
      "Pre-Shipment Approval (PSS) Matching Guarantee"
    ],
    ctaText: "Request Cupping Samples",
    ctaTab: "rfq"
  }
];


export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCertFilter, setSelectedCertFilter] = useState("All");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").replace("/", "");
      if (["home", "about", "sourcing", "catalog", "compliance", "rfq", "calculator", "tracker", "standards", "admin"].includes(hash)) {
        setActiveTab(hash);
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTab = (tabName) => {
    setActiveTab(tabName);
    window.location.hash = `#${tabName}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FAQ Component State
  const [openFaqId, setOpenFaqId] = useState("lead-times");
  const [faqCategoryFilter, setFaqCategoryFilter] = useState("All");
  const [faqSearchQuery, setFaqSearchQuery] = useState("");

  const filteredFaqs = B2B_EXPORT_FAQS.filter(faq => {
    const matchesCategory = faqCategoryFilter === "All" || faq.category === faqCategoryFilter;
    const q = faqSearchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      faq.question.toLowerCase().includes(q) || 
      faq.answer.toLowerCase().includes(q) || 
      faq.category.toLowerCase().includes(q) ||
      faq.highlights.some(h => h.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const handleCopyEmail = (e, emailStr = "atweeltea@gmail.com") => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard.writeText(emailStr).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
      toast.success("Contact Email Copied!", {
        description: `${emailStr} copied to clipboard. Ready to paste in your mail client.`,
        action: {
          label: "Copy Again",
          onClick: () => {
            navigator.clipboard.writeText(emailStr);
            toast.info("Re-copied to clipboard!");
          }
        },
        duration: 5000,
      });
    }).catch(() => {
      toast.info(`Company Email: ${emailStr}`);
    });
  };

  // RFQ State
  const [rfqForm, setRfqForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    country: "United States",
    teaGrade: "Kharsang Golden Tips Orthodox",
    quantityKg: 500,
    customBlendingNotes: "",
    targetPort: "Port of Rotterdam"
  });
  const [rfqSubmitting, setRfqSubmitting] = useState(false);

  // Tracker State
  const [trackingNumberInput, setTrackingNumberInput] = useState("EXP-8842-NL");
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Calculator State
  const [calcForm, setCalcForm] = useState({
    teaGrade: "Kharsang Golden Tips Orthodox",
    quantityKg: 1000,
    packagingType: "Bulk Vacuum Foil (10kg/25kg)",
    shippingMethod: "FOB - Ocean Freight (Standard Container)",
    destinationRegion: "Europe & UK"
  });
  const [calcResult, setCalcResult] = useState(null);
  const [calcLoading, setCalcLoading] = useState(false);

  // Admin Dashboard & Dynamic Site Data CMS State
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem("atweel_admin_token") || "");
  const [adminTokenInput, setAdminTokenInput] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [enquiryCounts, setEnquiryCounts] = useState({ total: 0, highValue: 0, totalKgPipeline: 0, matching: 0 });
  const [enqFilter, setEnqFilter] = useState({ country: "All", teaGrade: "All", minKg: "", search: "" });

  // DYNAMIC SITE DATA CMS STATE
  const [siteProducts, setSiteProducts] = useState(TEA_CATALOG);
  const [siteShipments, setSiteShipments] = useState([]);
  const [siteEstateMetrics, setSiteEstateMetrics] = useState({
    bighaArea: "1,200 Bigha",
    factorySqFt: "72,000 Sq Ft",
    organicPurity: "100% Organic",
    dispatchPort: "Kolkata Port",
    exportCountriesCount: 45,
    annualProductionMt: 850
  });

  const [siteAnnouncement, setSiteAnnouncement] = useState({
    enabled: true,
    badge: "2026 Spring Plucking",
    message: "First-Flush Golden Tips harvest commenced at Kharsang Estate — Reserve direct export allocations now",
    linkText: "Request Wholesale Allocation",
    linkTab: "rfq"
  });

  const [siteCertificates, setSiteCertificates] = useState([]);
  const [siteAuditLog, setSiteAuditLog] = useState([]);

  const [cmsTab, setCmsTab] = useState("products"); // "products" | "shipments" | "estate" | "announcement" | "certificates" | "audit" | "backup" | "enquiries"

  // Product Edit Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    grade: "",
    origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
    certificationsStr: "ISO 22000, HACCP, India Organic",
    moq: "100 KG",
    basePrice: 20.00,
    priceRange: "$20.00 - $30.00 / KG",
    flavor: "",
    image: "",
    description: "",
    inStock: true,
    featured: false
  });

  // Shipment Edit Modal State
  const [shipmentModalOpen, setShipmentModalOpen] = useState(false);
  const [shipmentForm, setShipmentForm] = useState({
    trackingNumber: "",
    status: "In Transit · Customs Cleared",
    vessel: "MV Kharsang Express V.402",
    origin: "Kolkata Port (via Kharsang Factory)",
    destination: "Port of Rotterdam",
    eta: "14 Jun 2026",
    temperature: "18.4°C",
    humidity: "45% RH"
  });

  // Estate Form State
  const [estateForm, setEstateForm] = useState({
    bighaArea: "1,200 Bigha",
    factorySqFt: "72,000 Sq Ft",
    organicPurity: "100% Organic",
    dispatchPort: "Kolkata Port",
    exportCountriesCount: 45,
    annualProductionMt: 850
  });

  // Announcement Form State
  const [announcementForm, setAnnouncementForm] = useState({
    enabled: true,
    badge: "2026 Spring Plucking",
    message: "First-Flush Golden Tips harvest commenced at Kharsang Estate — Reserve direct export allocations now",
    linkText: "Request Wholesale Allocation",
    linkTab: "rfq"
  });

  // Certificate Modal & Form State
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [certForm, setCertForm] = useState({
    title: "",
    category: "Quality Management",
    body: "Bureau Veritas",
    validity: "Valid through 2028",
    status: "Verified & Active",
    docUrl: "#"
  });

  // Audit Search Filter State
  const [auditSearch, setAuditSearch] = useState("");

  // JSON Backup / Import State
  const [jsonBackupInput, setJsonBackupInput] = useState("");

  // Compliance Verify Modal
  const [verifyCert, setVerifyCert] = useState(null);
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  // Corporate Nav Dropdown State
  const [openMenu, setOpenMenu] = useState(null); // "products" | "operations" | "compliance" | null
  const menuTimerRef = useRef(null);
  const openDropdown = (key) => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    setOpenMenu(key);
  };
  const scheduleClose = () => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    menuTimerRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  // FETCH DYNAMIC SITE DATA
  const fetchSiteData = async () => {
    try {
      const res = await axios.get(`${API}/site-data`);
      if (res.data.success) {
        if (res.data.products && res.data.products.length > 0) {
          setSiteProducts(res.data.products);
        }
        if (res.data.shipments) {
          setSiteShipments(res.data.shipments);
        }
        if (res.data.estate) {
          setSiteEstateMetrics(res.data.estate);
          setEstateForm(res.data.estate);
        }
        if (res.data.announcement) {
          setSiteAnnouncement(res.data.announcement);
          setAnnouncementForm(res.data.announcement);
        }
        if (res.data.certificates) {
          setSiteCertificates(res.data.certificates);
        }
        if (res.data.enquiries) {
          setEnquiries(res.data.enquiries);
        }
      }
    } catch (err) {
      console.warn("Could not fetch site data:", err);
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  // Route to admin via URL hash
  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === "#admin") setActiveTab("admin");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    if (!verifyCert) return;
    const handler = (e) => { if (e.key === "Escape") setVerifyCert(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [verifyCert]);

  // Initial tracker search on load
  useEffect(() => {
    handleTrackShipment("EXP-8842-NL");
  }, []);

  const handleTrackShipment = async (numToTrack) => {
    const code = numToTrack || trackingNumberInput;
    if (!code) return;
    setTrackingLoading(true);
    try {
      const res = await axios.post(`${API}/track-shipment`, { trackingNumber: code });
      setTrackingResult(res.data);
      toast.success("Shipment telemetry updated successfully.");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Tracking number not found. Try EXP-8842-NL");
      setTrackingResult(null);
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleCalculateQuote = async (formOverride) => {
    const payload = formOverride || calcForm;
    setCalcLoading(true);
    try {
      const res = await axios.post(`${API}/calculate-quote`, payload);
      setCalcResult(res.data);
    } catch (err) {
      toast.error("Error calculating quote.");
    } finally {
      setCalcLoading(false);
    }
  };

  // Live auto-recalculate when calculator form fields change
  useEffect(() => {
    handleCalculateQuote(calcForm);
  }, [calcForm]);

  const handleRfqSubmit = async (e) => {
    e.preventDefault();
    setRfqSubmitting(true);
    try {
      const res = await axios.post(`${API}/rfq`, rfqForm);
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F3E5AB", "#9A7B2C", "#ffffff"]
      });
      const refId = res.data.referenceId || "";
      if (res.data.emailDelivered) {
        toast.success(`Bulk Quote Request Transmitted!`, {
          description: `Ref #${refId}: Dispatched to Atweel Export Desk (${res.data.notificationEmail || "atweeltea@gmail.com"}) & confirmation sent to ${rfqForm.email}.`,
          action: {
            label: "Copy Ref ID",
            onClick: () => {
              navigator.clipboard.writeText(refId);
              toast.info(`Reference ID ${refId} copied to clipboard!`);
            }
          },
          duration: 9000
        });
      } else {
        toast.success(`Bulk Quote Inquiry Received!`, {
          description: `Ref #${refId}: Logged for ${rfqForm.companyName || rfqForm.fullName}. Dispatched to Atweel Tea export team (${rfqForm.quantityKg} KG ${rfqForm.teaGrade}).`,
          action: {
            label: "Copy Ref ID",
            onClick: () => {
              navigator.clipboard.writeText(refId);
              toast.info(`Reference ID ${refId} copied to clipboard!`);
            }
          },
          duration: 9000
        });
      }
      setRfqForm({
        fullName: "",
        companyName: "",
        email: "",
        country: "United States",
        teaGrade: "Kharsang Golden Tips Orthodox",
        quantityKg: 500,
        customBlendingNotes: "",
        targetPort: "Port of Rotterdam"
      });
      fetchSiteData();
    } catch (err) {
      toast.error("Failed to submit RFQ. Please check inputs.");
    } finally {
      setRfqSubmitting(false);
    }
  };

  const filteredCatalog = siteProducts.filter(item => {
    const matchesSearch = (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.origin || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.grade || "").toLowerCase().includes(searchQuery.toLowerCase());
    const certs = item.certifications || [];
    const matchesCert = selectedCertFilter === "All" || certs.includes(selectedCertFilter);
    return matchesSearch && matchesCert;
  });

  // ---------- ADMIN HELPERS & CMS HANDLERS ----------
  const fetchEnquiries = async (tokenToUse) => {
    const useToken = tokenToUse || adminToken;
    if (!useToken) return;
    setAdminLoading(true);
    try {
      const params = {};
      if (enqFilter.country && enqFilter.country !== "All") params.country = enqFilter.country;
      if (enqFilter.teaGrade && enqFilter.teaGrade !== "All") params.teaGrade = enqFilter.teaGrade;
      if (enqFilter.minKg) params.minKg = parseInt(enqFilter.minKg);
      if (enqFilter.search) params.search = enqFilter.search;
      const res = await axios.get(`${API}/admin/enquiries`, {
        headers: { "X-Admin-Token": useToken },
        params
      });
      setEnquiries(res.data.items || []);
      setEnquiryCounts(res.data.counts || { total: 0, highValue: 0, totalKgPipeline: 0, matching: 0 });
      setAdminAuthed(true);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid admin token — access denied");
        setAdminAuthed(false);
        localStorage.removeItem("atweel_admin_token");
        setAdminToken("");
      } else {
        toast.error("Unable to load enquiries");
      }
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const token = adminTokenInput.trim();
    if (!token) return;
    try {
      await axios.post(`${API}/admin/login`, { token });
      localStorage.setItem("atweel_admin_token", token);
      setAdminToken(token);
      setAdminAuthed(true);
      setAdminTokenInput("");
      toast.success("Admin CMS Access Granted!");
      await fetchEnquiries(token);
      await fetchSiteData();
    } catch (err) {
      toast.error("Invalid admin token. Default is: atweel-admin-change-me");
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("atweel_admin_token");
    setAdminToken("");
    setAdminAuthed(false);
    setEnquiries([]);
    toast.success("Logged out from Admin CMS");
  };

  // CMS: Open Product Modal
  const handleOpenProductModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setProductForm({
        name: prod.name || "",
        grade: prod.grade || "",
        origin: prod.origin || "Atweel Estate, Kharsang · Arunachal Pradesh",
        certificationsStr: Array.isArray(prod.certifications) ? prod.certifications.join(", ") : "ISO 22000, HACCP",
        moq: prod.moq || "100 KG",
        basePrice: prod.basePrice || 20.00,
        priceRange: prod.priceRange || `$${prod.basePrice || 20} / KG`,
        flavor: prod.flavor || "",
        image: prod.image || "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=75",
        description: prod.description || "",
        inStock: prod.inStock !== undefined ? prod.inStock : true,
        featured: !!prod.featured
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: "",
        grade: "FTGFOP1 Orthodox Grade",
        origin: "Atweel Estate, Kharsang · Arunachal Pradesh",
        certificationsStr: "ISO 22000, HACCP, India Organic (NPOP)",
        moq: "100 KG",
        basePrice: 24.00,
        priceRange: "$24.00 - $34.00 / KG",
        flavor: "Fresh aroma, bright amber cup",
        image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=75",
        description: "Single-estate organic tea harvested from Patkai foothill slopes.",
        inStock: true,
        featured: false
      });
    }
    setProductModalOpen(true);
  };

  // CMS: Save Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const certsArray = productForm.certificationsStr.split(",").map(s => s.trim()).filter(Boolean);
      const payload = {
        id: editingProduct ? editingProduct.id : undefined,
        name: productForm.name,
        grade: productForm.grade,
        origin: productForm.origin,
        certifications: certsArray,
        moq: productForm.moq,
        basePrice: Number(productForm.basePrice),
        priceRange: productForm.priceRange,
        flavor: productForm.flavor,
        image: productForm.image,
        description: productForm.description,
        inStock: productForm.inStock,
        featured: productForm.featured
      };
      const res = await axios.post(`${API}/admin/products`, payload, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success(res.data.message || "Product saved successfully!");
        setSiteProducts(res.data.products);
        setProductModalOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error saving product.");
    }
  };

  // CMS: Delete Product
  const handleDeleteProduct = async (prodId) => {
    if (!window.confirm("Are you sure you want to delete this tea grade from the live website?")) return;
    try {
      const res = await axios.delete(`${API}/admin/products/${prodId}`, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success("Tea grade removed from website catalog.");
        setSiteProducts(res.data.products);
      }
    } catch (err) {
      toast.error("Error deleting product.");
    }
  };

  // CMS: Open Shipment Modal
  const handleOpenShipmentModal = (shipment = null) => {
    if (shipment) {
      setShipmentForm({
        trackingNumber: shipment.trackingNumber || "",
        status: shipment.status || "In Transit · Customs Cleared",
        vessel: shipment.vessel || "",
        origin: shipment.origin || "Kolkata Port (via Kharsang Factory)",
        destination: shipment.destination || "Port of Rotterdam",
        eta: shipment.eta || "14 Jun 2026",
        temperature: shipment.temperature || "18.4°C",
        humidity: shipment.humidity || "45% RH"
      });
    } else {
      setShipmentForm({
        trackingNumber: `EXP-${Math.floor(1000 + Math.random() * 9000)}-EU`,
        status: "In Transit · Customs Cleared",
        vessel: "MV Kharsang Express V.402",
        origin: "Kolkata Port (via Kharsang Factory)",
        destination: "Port of Rotterdam",
        eta: "14 Jun 2026",
        temperature: "18.5°C",
        humidity: "45% RH"
      });
    }
    setShipmentModalOpen(true);
  };

  // CMS: Save Shipment
  const handleSaveShipment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/admin/shipments`, shipmentForm, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success(`Cargo tracking #${shipmentForm.trackingNumber} updated live!`);
        setSiteShipments(res.data.shipments);
        setShipmentModalOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error saving shipment.");
    }
  };

  // CMS: Delete Shipment
  const handleDeleteShipment = async (num) => {
    if (!window.confirm(`Delete cargo tracking record ${num}?`)) return;
    try {
      const res = await axios.delete(`${API}/admin/shipments/${num}`, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success(`Shipment ${num} deleted.`);
        setSiteShipments(res.data.shipments);
      }
    } catch (err) {
      toast.error("Error deleting shipment.");
    }
  };

  // CMS: Save Estate Metrics
  const handleSaveEstate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/admin/estate`, estateForm, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success("Estate KPIs & Operational Metrics saved live!");
        setSiteEstateMetrics(res.data.estate);
      }
    } catch (err) {
      toast.error("Error saving estate metrics.");
    }
  };

  // CMS: Update Enquiry Status
  const handleUpdateEnquiryStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(`${API}/admin/enquiries/${id}`, { status: newStatus }, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success(`Enquiry status updated to "${newStatus}"`);
        setEnquiries(res.data.enquiries);
      }
    } catch (err) {
      toast.error("Error updating status.");
    }
  };

  // CMS: Delete Enquiry
  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry record?")) return;
    try {
      const res = await axios.delete(`${API}/admin/enquiries/${id}`, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success("Enquiry deleted.");
        setEnquiries(res.data.enquiries);
      }
    } catch (err) {
      toast.error("Error deleting enquiry.");
    }
  };

  // CMS: Reset Defaults
  const handleResetSiteData = async () => {
    if (!window.confirm("Reset all website data (products, shipments, estate KPIs) back to factory defaults?")) return;
    try {
      const res = await axios.post(`${API}/admin/reset-defaults`, {}, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success("All website data reset to factory defaults.");
        setSiteProducts(res.data.products);
        setSiteShipments(res.data.shipments);
        setSiteEstateMetrics(res.data.estate);
      }
    } catch (err) {
      toast.error("Error resetting data.");
    }
  };

  // CMS: Save Announcement Ticker
  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/admin/announcement`, announcementForm, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success("Website notice ticker updated live!");
        setSiteAnnouncement(res.data.announcement);
      }
    } catch (err) {
      toast.error("Error saving announcement ticker.");
    }
  };

  // CMS: Open Certificate Modal
  const handleOpenCertModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setCertForm({
        title: cert.title || "",
        category: cert.category || "Quality Management",
        body: cert.body || "",
        validity: cert.validity || "Valid",
        status: cert.status || "Verified & Active",
        docUrl: cert.docUrl || "#"
      });
    } else {
      setEditingCert(null);
      setCertForm({
        title: "",
        category: "Quality Certification",
        body: "Bureau Veritas / SGS",
        validity: "Valid through 2028",
        status: "Verified & Active",
        docUrl: "#"
      });
    }
    setCertModalOpen(true);
  };

  // CMS: Save Certificate
  const handleSaveCert = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...certForm, id: editingCert ? editingCert.id : undefined };
      const res = await axios.post(`${API}/admin/certificates`, payload, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success(`Certificate "${certForm.title}" saved successfully!`);
        setSiteCertificates(res.data.certificates);
        setCertModalOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Error saving certificate.");
    }
  };

  // CMS: Delete Certificate
  const handleDeleteCert = async (certId) => {
    if (!window.confirm("Delete this factory quality/compliance certificate?")) return;
    try {
      const res = await axios.delete(`${API}/admin/certificates/${certId}`, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success("Certificate removed.");
        setSiteCertificates(res.data.certificates);
      }
    } catch (err) {
      toast.error("Error deleting certificate.");
    }
  };

  // CMS: Fetch Audit Logs
  const fetchAuditLog = async () => {
    try {
      const res = await axios.get(`${API}/admin/audit-log`, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        setSiteAuditLog(res.data.logs || []);
      }
    } catch (err) {
      console.warn("Error fetching audit logs:", err);
    }
  };

  // CMS: Export Backup JSON
  const handleExportBackup = async () => {
    try {
      const res = await axios.get(`${API}/admin/export-data`, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        const jsonStr = JSON.stringify(res.data.data, null, 2);
        setJsonBackupInput(jsonStr);
        
        // Trigger download as .json file
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `atweel-tea-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success("Site CMS backup exported successfully!");
      }
    } catch (err) {
      toast.error("Error exporting backup.");
    }
  };

  // CMS: Import / Restore Backup JSON
  const handleImportBackup = async () => {
    if (!jsonBackupInput.trim()) {
      toast.error("Please paste valid backup JSON data first.");
      return;
    }
    try {
      const parsed = JSON.parse(jsonBackupInput);
      const res = await axios.post(`${API}/admin/import-data`, { data: parsed }, {
        headers: { "x-admin-token": adminToken }
      });
      if (res.data.success) {
        toast.success(res.data.message || "Site restored successfully from backup!");
        if (res.data.products) setSiteProducts(res.data.products);
        if (res.data.shipments) setSiteShipments(res.data.shipments);
        if (res.data.estate) setSiteEstateMetrics(res.data.estate);
        if (res.data.announcement) setSiteAnnouncement(res.data.announcement);
        if (res.data.certificates) setSiteCertificates(res.data.certificates);
        if (res.data.enquiries) setEnquiries(res.data.enquiries);
      }
    } catch (err) {
      toast.error("Invalid JSON format or import failed: " + (err.message || err));
    }
  };

  // Auto-load enquiries when entering admin tab with a saved token
  useEffect(() => {
    if (activeTab === "admin" && adminToken && !adminAuthed) {
      fetchEnquiries(adminToken);
    }
  }, [activeTab, adminToken]); // eslint-disable-line

  const uniqueCountries = ["All", ...Array.from(new Set(enquiries.map(e => e.country)))];
  const uniqueGrades = ["All", ...Array.from(new Set(enquiries.map(e => e.teaGrade)))];

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans selection:bg-champagne selection:text-charcoal">
      <Suspense fallback={<div className="flex h-screen items-center justify-center text-charcoal font-serif text-lg tracking-widest uppercase">Loading Estate...</div>}>
        <MetadataConfig activeTab={activeTab} />
        <Toaster position="top-right" richColors />

      {/* CMS ANNOUNCEMENT TICKER BANNER */}
      {siteAnnouncement && siteAnnouncement.enabled && siteAnnouncement.message && (
        <div className="bg-gradient-to-r from-charcoal via-charcoal to-charcoal text-stone-600 border-b border-white/20 py-2 px-4 text-xs" data-testid="live-announcement-banner">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="bg-champagne text-charcoal text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                {siteAnnouncement.badge || "ESTATE UPDATE"}
              </span>
              <span className="font-medium text-stone-600 truncate">{siteAnnouncement.message}</span>
            </div>
            {siteAnnouncement.linkText && (
              <button
                onClick={() => setActiveTab(siteAnnouncement.linkTab || "rfq")}
                data-testid="banner-ticker-action"
                className="text-stone-800 hover:text-white text-xs font-bold underline flex items-center gap-1 whitespace-nowrap"
              >
                <span>{siteAnnouncement.linkText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* HEADER NAVIGATION */}
      {/* TRUST RIBBON — thin compliance strip above header */}
      <div className="hidden md:block bg-charcoal text-stone-600 border-b border-white/20 text-[11px] font-medium" data-testid="trust-ribbon">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-600 whitespace-nowrap overflow-hidden">
            <button onClick={() => setVerifyCert(CERTIFICATIONS["iso-22000"])} data-testid="ribbon-chip-iso" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-amber-100 hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-800" /> <span className="text-white font-semibold">ISO 22000</span>
            </button>
            <span className="text-stone-600">·</span>
            <button onClick={() => setVerifyCert(CERTIFICATIONS["haccp"])} data-testid="ribbon-chip-haccp" className="px-2 py-0.5 rounded-full hover:bg-amber-100 hover:text-white transition-colors">HACCP</button>
            <span className="text-stone-600">·</span>
            <button onClick={() => setVerifyCert(CERTIFICATIONS["india-organic"])} data-testid="ribbon-chip-npop" className="px-2 py-0.5 rounded-full hover:bg-amber-100 hover:text-white transition-colors">India Organic (NPOP)</button>
            <span className="text-stone-600 hidden lg:inline">·</span>
            <button onClick={() => setVerifyCert(CERTIFICATIONS["usda-organic"])} data-testid="ribbon-chip-usda" className="hidden lg:inline-block px-2 py-0.5 rounded-full hover:bg-amber-100 hover:text-white transition-colors">USDA Organic</button>
            <span className="text-stone-600 hidden lg:inline">·</span>
            <button onClick={() => setVerifyCert(CERTIFICATIONS["eu-organic"])} data-testid="ribbon-chip-eu" className="hidden lg:inline-block px-2 py-0.5 rounded-full hover:bg-amber-100 hover:text-white transition-colors">EU Organic</button>
            <span className="text-stone-600 hidden xl:inline">·</span>
            <button onClick={() => setVerifyCert(CERTIFICATIONS["sgs-eurofins"])} data-testid="ribbon-chip-sgs" className="hidden xl:inline-block px-2 py-0.5 rounded-full hover:bg-amber-100 hover:text-white transition-colors">SGS &amp; Eurofins Verified</button>
          </div>
          <a
            href="/atweel-sop.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="ribbon-sop-link"
            className="flex items-center gap-3 text-stone-600 hover:text-stone-800 transition-colors group"
          >
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-600">Global Compliance Manual</span>
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-stone-800 border border-white/20 px-3 py-1 rounded-md font-mono text-[10px] font-bold group-hover:bg-champagne group-hover:text-charcoal transition-all">
              <FileText className="w-3 h-3" />
              SOP V3 - 2026
            </span>
          </a>
        </div>
      </div>


      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-white/20 shadow-sm shadow-champagne/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between gap-6">
          
          {/* LOGO */}
          <div 
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 cursor-pointer group py-1 bg-transparent transition-all duration-300"
            data-testid="brand-logo"
          >
            <img
              src="/atweel-logo@4x.png"
              srcSet="/atweel-logo@4x.png 2x, /atweel-logo@3x.png 1.5x, /atweel-logo@2x.png 1x"
              onError={(e) => { e.currentTarget.src = "/atweel-official-logo.jpg"; }}
              alt="Atweel Tea — 100% Organic, Kharsang Arunachal"
              className="h-16 sm:h-[84px] w-auto object-contain max-w-none group-hover:scale-[1.02] transition-transform duration-300"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              data-testid="brand-logo-img"
            />
          </div>

          {/* DESKTOP NAV — Elegant Grouped Corporate Menu */}
          <nav className="hidden md:flex items-center h-full text-sm">
            {/* HOME */}
            <button
              onClick={() => { setActiveTab("home"); setOpenMenu(null); }}
              onMouseEnter={() => setOpenMenu(null)}
              data-testid="nav-home"
              className={`h-full px-4 flex items-center gap-1.5 uppercase tracking-[0.18em] text-[11px] font-semibold border-b-2 transition-all ${
                activeTab === "home"
                  ? "text-stone-800 border-amber-800/20"
                  : "text-charcoal border-transparent hover:text-charcoal hover:border-white/20"
              }`}
            >
              <span>Home</span>
            </button>

            <div className="w-px h-6 bg-champagne/25" />

            {/* PRODUCTS */}
            {[
              { key: "products", label: "Products", icon: Package, items: [
                { id: "catalog", label: "Tea Catalog", desc: "Six single-estate Kharsang grades", icon: Package },
                { id: "rfq", label: "Custom Blending RFQ", desc: "Bespoke private-label enquiry", icon: FileText },
                { id: "calculator", label: "Wholesale Calculator", desc: "Live FOB / CIF / DDP quotation", icon: Calculator }
              ]},
              { key: "operations", label: "Operations", icon: Truck, items: [
                { id: "tracker", label: "Shipment Tracker", desc: "Live container telemetry & ETA", icon: Truck },
                { id: "destinations", label: "Global Reach", desc: "45+ export destinations", icon: Globe }
              ]},
              { key: "compliance", label: "Compliance", icon: ShieldCheck, items: [
                { id: "standards", label: "Factory & Lab Standards", desc: "72,000 sq ft under HACCP", icon: Building },
                { id: "_sop", label: "Global SOP Manual", desc: "AT-SOP-QA-2026-V3 · PDF", icon: FileText, href: "/atweel-sop.pdf" }
              ]}
            ].map((menu, idx) => {
              const isActive = menu.items.some(i => i.id === activeTab);
              const isOpen = openMenu === menu.key;
              return (
                <React.Fragment key={menu.key}>
                  <div
                    className="relative h-full"
                    onMouseEnter={() => openDropdown(menu.key)}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      data-testid={`nav-menu-${menu.key}`}
                      onClick={() => setOpenMenu(isOpen ? null : menu.key)}
                      className={`h-full px-4 flex items-center gap-1.5 uppercase tracking-[0.18em] text-[11px] font-semibold border-b-2 transition-all ${
                        isActive
                          ? "text-stone-800 border-amber-800/20"
                          : "text-charcoal border-transparent hover:text-charcoal hover:border-white/20"
                      }`}
                    >
                      <span>{menu.label}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* DROPDOWN PANEL */}
                    {isOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                        onMouseEnter={() => openDropdown(menu.key)}
                        onMouseLeave={scheduleClose}
                        data-testid={`dropdown-${menu.key}`}
                      >
                        <div className="w-[320px] bg-white border border-white/20 rounded-2xl shadow-2xl shadow-charcoal/10 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="bg-gradient-to-r from-ivory to-ivory px-5 py-3 border-b border-white/20">
                            <div className="flex items-center gap-2">
                              <menu.icon className="w-3.5 h-3.5 text-stone-800" />
                              <span className="font-serif text-xs uppercase tracking-[0.22em] text-stone-800 font-bold">{menu.label}</span>
                            </div>
                          </div>
                          <div className="p-2">
                            {menu.items.map((item) => {
                              const ItemIcon = item.icon;
                              const isItemActive = activeTab === item.id;
                              const commonClass = `flex items-start gap-3 px-3 py-3 rounded-xl transition-colors group text-left w-full ${
                                isItemActive
                                  ? "bg-amber-50"
                                  : "hover:bg-ivory"
                              }`;
                              const content = (
                                <>
                                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                    isItemActive ? "bg-champagne text-charcoal" : "bg-ivory text-stone-800 group-hover:bg-amber-100"
                                  }`}>
                                    <ItemIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`font-serif font-bold text-sm leading-tight ${isItemActive ? "text-stone-800" : "text-charcoal"}`}>
                                      {item.label}
                                    </div>
                                    <div className="text-[11px] text-stone-600 mt-0.5 leading-snug">{item.desc}</div>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-stone-800/0 group-hover:text-stone-800 transition-all group-hover:translate-x-0.5 mt-2" />
                                </>
                              );
                              return item.href ? (
                                <a
                                  key={item.id}
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setOpenMenu(null)}
                                  data-testid={`nav-${item.id}`}
                                  className={commonClass}
                                >{content}</a>
                              ) : (
                                <button
                                  key={item.id}
                                  onClick={() => { setActiveTab(item.id); setOpenMenu(null); }}
                                  data-testid={`nav-${item.id}`}
                                  className={commonClass}
                                >{content}</button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-px h-6 bg-champagne/25" />
                </React.Fragment>
              );
            })}

            {/* ABOUT US */}
            <button
              onClick={() => {
                setActiveTab("home");
                setOpenMenu(null);
                setTimeout(() => {
                  const el = document.getElementById("about-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              onMouseEnter={() => setOpenMenu(null)}
              data-testid="nav-about"
              className="h-full px-4 flex items-center gap-1.5 uppercase tracking-[0.18em] text-[11px] font-semibold border-b-2 border-transparent text-charcoal hover:text-charcoal hover:border-white/20 transition-all"
            >
              <span>About Us</span>
            </button>
          </nav>

          {/* RIGHT SIDE — CONTACT + CTA + ADMIN CMS */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1.5 border-r border-white/20 pr-3">
              <a
                href="mailto:atweeltea@gmail.com"
                data-testid="header-email"
                className="flex items-center gap-1.5 text-charcoal hover:text-stone-800 text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors"
                title="Send email to atweeltea@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 text-stone-800" />
                <span>Export Desk</span>
              </a>
              <button
                type="button"
                onClick={(e) => handleCopyEmail(e, "atweeltea@gmail.com")}
                data-testid="header-copy-email-btn"
                className="p-1 rounded hover:bg-amber-100 text-stone-800 hover:text-charcoal transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy atweeltea@gmail.com to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-stone-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              onClick={() => setActiveTab("admin")}
              data-testid="header-admin-button"
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-md text-[11px] uppercase tracking-[0.15em] font-bold border transition-all ${
                activeTab === "admin"
                  ? "bg-charcoal text-amber-50 border-charcoal"
                  : "bg-ivory text-charcoal border-white/20 hover:bg-amber-100"
              }`}
              title="Access Dynamic Content Management System & Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-stone-800" />
              <span>Admin CMS</span>
            </button>

            <button
              onClick={() => setActiveTab("rfq")}
              data-testid="header-rfq-button"
              className="bg-champagne hover:bg-champagne text-charcoal font-bold px-5 py-2.5 rounded-md text-[11px] uppercase tracking-[0.15em] shadow-md shadow-champagne/20 transition-all flex items-center gap-2"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-charcoal p-2"
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-white/20 px-6 py-6 flex flex-col gap-4">
            {[
              { id: "home", label: "Home" },
              { id: "catalog", label: "Product Catalog" },
              { id: "rfq", label: "Custom Blending RFQ" },
              { id: "tracker", label: "Global Shipping Tracker" },
              { id: "standards", label: "Factory & Lab Standards" },
              { id: "calculator", label: "Wholesale & MOQ Calculator" },
              { id: "destinations", label: "Global Destinations" },
              { id: "admin", label: "🔐 Admin CMS & Content Manager" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 font-medium ${
                  activeTab === tab.id ? "text-stone-800" : "text-charcoal"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab("rfq");
                setMobileMenuOpen(false);
              }}
              className="mt-2 bg-champagne text-charcoal font-bold py-3 rounded-full text-center"
            >
              Request Bulk Quote
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main>
        {/* VIEW 1: HOME */}
        {activeTab === "home" && (
          <div data-testid="view-home">
            <section className="relative pt-12 pb-32 bg-ivory overflow-hidden">
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col gap-12 lg:gap-16">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                  <div className="flex flex-col gap-6 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200 shadow-sm w-max">
                      <Leaf className="w-4 h-4 text-stone-800" />
                      <span className="text-[11px] uppercase tracking-[0.18em] text-stone-800 font-bold">100% Organic · India Organic · USDA · ISO 22000</span>
                    </div>
                    
                    <h1 className="font-serif text-[42px] lg:text-[50px] font-medium tracking-tight text-charcoal leading-[1.1]">
                      Single-Estate <span className="text-stone-800 font-serif italic">Organic Tea</span> <br className="hidden sm:block" />from the Foothills of Arunachal.
                    </h1>
                    <div className="w-14 h-1 bg-champagne rounded-full my-1" />
                    <p className="text-lg text-charcoal/90 font-normal leading-relaxed">
                      Atweel Tea is grown, plucked and manufactured on our own <strong className="font-semibold text-charcoal">1,200-bigha</strong> organic garden in Kharsang, Arunachal Pradesh — processed in a <strong className="font-semibold text-charcoal">72,000 sq ft factory</strong> and shipped to tea houses, blenders and importers worldwide.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 shrink-0 pb-2">
                    <button
                      onClick={() => setActiveTab("catalog")}
                      data-testid="hero-explore-catalog"
                      className="bg-charcoal hover:bg-stone-800 text-white font-bold px-8 py-4 rounded-md text-xs uppercase tracking-[0.15em] shadow-lg transition-all flex items-center gap-2.5"
                    >
                      <span>Explore Our Tea</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => setActiveTab("standards")}
                      data-testid="hero-custom-rfq"
                      className="border-2 border-amber-800/20 bg-white/80 hover:bg-amber-50 text-stone-800 font-bold px-8 py-4 rounded-md text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-2.5"
                    >
                      <span>Our Operations</span>
                      <ArrowRight className="w-4 h-4 text-stone-800" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* FLOATING 4-FEATURE BANNER */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-20 mb-24" data-testid="hero-floating-banner">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-charcoal/10 border border-stone-200/60 p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/60" style={{ paddingTop: '40px', marginTop: '39px' }}>
                
                {/* ITEM 1 */}
                <div className="group flex flex-col items-center text-center gap-4 sm:pr-4 pt-4 sm:pt-0">
                  <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-200/80 shadow-sm flex items-center justify-center shrink-0 group-hover:bg-amber-50 group-hover:border-amber-900/20 group-hover:scale-110 transition-all duration-300">
                    <Leaf className="w-6 h-6 text-stone-700 group-hover:text-amber-900 transition-colors" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-[0.2em] text-charcoal">Single-Estate</div>
                    <div className="text-xs text-stone-500 mt-1.5 leading-relaxed">Full Control from Garden to Cup</div>
                  </div>
                </div>

                {/* ITEM 2 */}
                <div className="group flex flex-col items-center text-center gap-4 sm:px-4 pt-6 sm:pt-0">
                  <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-200/80 shadow-sm flex items-center justify-center shrink-0 group-hover:bg-amber-50 group-hover:border-amber-900/20 group-hover:scale-110 transition-all duration-300">
                    <Building className="w-6 h-6 text-stone-700 group-hover:text-amber-900 transition-colors" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-[0.2em] text-charcoal">72,000 Sq Ft Factory</div>
                    <div className="text-xs text-stone-500 mt-1.5 leading-relaxed">State-of-the-art Processing</div>
                  </div>
                </div>

                {/* ITEM 3 */}
                <div className="group flex flex-col items-center text-center gap-4 sm:px-4 pt-6 sm:pt-0">
                  <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-200/80 shadow-sm flex items-center justify-center shrink-0 group-hover:bg-amber-50 group-hover:border-amber-900/20 group-hover:scale-110 transition-all duration-300">
                    <Globe className="w-6 h-6 text-stone-700 group-hover:text-amber-900 transition-colors" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-[0.2em] text-charcoal">Global Exports</div>
                    <div className="text-xs text-stone-500 mt-1.5 leading-relaxed">Trusted by Partners Worldwide</div>
                  </div>
                </div>

                {/* ITEM 4 */}
                <div className="group flex flex-col items-center text-center gap-4 sm:pl-4 pt-6 sm:pt-0">
                  <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-200/80 shadow-sm flex items-center justify-center shrink-0 group-hover:bg-amber-50 group-hover:border-amber-900/20 group-hover:scale-110 transition-all duration-300">
                    <ShieldCheck className="w-6 h-6 text-stone-700 group-hover:text-amber-900 transition-colors" />
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-[0.2em] text-charcoal">Certified Organic</div>
                    <div className="text-xs text-stone-500 mt-1.5 leading-relaxed">Quality & Compliance Assured</div>
                  </div>
                </div>

              </div>
            </div>

            {/* ABOUT THE COMPANY SECTION */}
            <section className="py-24 px-6 max-w-7xl mx-auto" data-testid="about-section" style={{ paddingTop: '9px' }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl shadow-charcoal/10 aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-stone-800 text-[10px] uppercase tracking-[0.25em] font-semibold mb-1">Our Estate & Factory</div>
                      <div className="text-white font-serif text-xl font-medium">Nemphai 1, Kharsang · Arunachal Pradesh</div>
                      <div className="text-stone-600 text-[11px] mt-1 uppercase tracking-wider">Actual photograph · No stock imagery</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">About the Company</span>
                  <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
                    Rooted in Arunachal, <br/><span className="text-stone-800">Trusted by the World.</span>
                  </h2>
                  <p className="text-stone-600 text-base leading-relaxed">
                    <span className="font-semibold text-charcoal">Atweel Tea</span> is the flagship brand of <span className="font-semibold text-charcoal">Atweel Food & Beverages Private Limited</span> — a fully-integrated organic tea grower, manufacturer and exporter headquartered at the foothills of the Patkai range in Kharsang, Arunachal Pradesh.
                  </p>
                  <p className="text-stone-600 text-base leading-relaxed">
                    Every leaf we ship is grown on our own <span className="font-semibold text-stone-800">1,200-bigha certified organic estate</span> and processed under one roof at our <span className="font-semibold text-stone-800">72,000 sq ft state-of-the-art factory</span>. This complete plot-to-package control lets us guarantee traceability, freshness and consistency to global buyers — from private-label blenders to specialty tea houses and hospitality chains.
                  </p>
                  <p className="text-stone-600 text-base leading-relaxed">
                    With a philosophy built on <span className="font-semibold text-charcoal">soil health, ethical labour and uncompromising quality control</span>, Atweel Tea combines centuries-old orthodox craftsmanship with modern food-safety systems certified under ISO 22000, HACCP, FSSAI, India Organic (NPOP), USDA-NOP and EU Organic protocols.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    <div className="p-4 rounded-2xl bg-white border border-white/20 text-center">
                      <div className="font-serif text-2xl font-bold text-stone-800">1,200</div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-600 mt-1">Bigha Estate</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-white/20 text-center">
                      <div className="font-serif text-2xl font-bold text-stone-800">72K</div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-600 mt-1">Sq Ft Factory</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-white/20 text-center">
                      <div className="font-serif text-2xl font-bold text-stone-800">100%</div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-600 mt-1">Organic</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-white/20 text-center">
                      <div className="font-serif text-2xl font-bold text-stone-800">6+</div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-600 mt-1">Certifications</div>
                    </div>
                  </div>

                  <a
                    href="/atweel-sop.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="about-sop-link"
                    className="inline-flex items-center gap-3 mt-6 px-5 py-3 rounded-full bg-charcoal hover:bg-charcoal text-amber-50 font-semibold text-sm transition-all group"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download our Global Compliance SOP (PDF)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </section>




            {/* CINEMATIC SPLIT HERO */}

            {/* TRAJECTORY SOURCING MAP */}
            <TrajectorySourcingMap onNavigateTab={setActiveTab} />

            {/* B2B PRIVATE ALLOCATION CONTROL DESK */}
            <AllocationControlDesk onOpenLeadForm={() => setIsLeadFormOpen(true)} />
            {/* BENTO HIGHLIGHTS & B2B OPERATIONS SECTION */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
              {/* SECTION HEADER */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-[0.25em] text-stone-800 font-bold flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-stone-800" />
                  Global B2B Procurement & Estate Operations
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mt-3">
                  Everything You Need to Source Atweel Tea
                </h2>
                <p className="text-stone-600 mt-4 text-base leading-relaxed">
                  From single-estate specification sheets to real-time container telemetry — a modern B2B procurement platform for international buyers, blenders, and wholesale distributors.
                </p>
              </div>

              {/* CORPORATE B2B PROCUREMENT TOOLS GRID (6 CARDS) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                
                {/* CARD 1: CATALOG */}
                <div 
                  onClick={() => setActiveTab("catalog")}
                  className="bg-white border-2 border-white/20 hover:border-amber-800/20 p-8 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between shadow-md hover:shadow-2xl relative overflow-hidden"
                  data-testid="bento-card-catalog"
                >
                  <div className="absolute top-0 right-0 bg-ivory text-stone-800 text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl border-l border-b border-white/20">
                    Live Specs
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-charcoal to-charcoal border border-white/20 flex items-center justify-center text-stone-800 mb-6 group-hover:scale-110 transition-transform shadow-md">
                      <Package className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-stone-800 transition-colors">Tea Product Catalog</h3>
                    <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                      Browse FTGFOP1, BOP, Orthodox, and Green tea grades with complete organoleptic analysis & lab test certificates.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-stone-300 flex items-center justify-between text-stone-800 font-semibold text-sm">
                    <span>View Grades & Specs</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                {/* CARD 2: TRACKER */}
                <div 
                  onClick={() => setActiveTab("tracker")}
                  className="bg-white border-2 border-white/20 hover:border-amber-800/20 p-8 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between shadow-md hover:shadow-2xl relative overflow-hidden"
                  data-testid="bento-card-tracker"
                >
                  <div className="absolute top-0 right-0 bg-ivory text-stone-800 text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl border-l border-b border-white/20">
                    GPS Telemetry
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-charcoal to-charcoal border border-white/20 flex items-center justify-center text-stone-800 mb-6 group-hover:scale-110 transition-transform shadow-md">
                      <Truck className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-stone-800 transition-colors">Global Cargo Tracker</h3>
                    <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                      Monitor live vessel position, temperature-controlled container logs, and customs clearances at sea.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-stone-300 flex items-center justify-between text-stone-800 font-semibold text-sm">
                    <span>Track Cargo Container</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                {/* CARD 3: CALCULATOR */}
                <div 
                  onClick={() => setActiveTab("calculator")}
                  className="bg-white border-2 border-white/20 hover:border-amber-800/20 p-8 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between shadow-md hover:shadow-2xl relative overflow-hidden"
                  data-testid="bento-card-calculator"
                >
                  <div className="absolute top-0 right-0 bg-ivory text-stone-800 text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl border-l border-b border-white/20">
                    Instant Quote
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-charcoal to-charcoal border border-white/20 flex items-center justify-center text-stone-800 mb-6 group-hover:scale-110 transition-transform shadow-md">
                      <Calculator className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-stone-800 transition-colors">Wholesale & Freight Engine</h3>
                    <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                      Calculate tiered volume discounts, container loading capacity, and estimated FOB/CIF sea freight costs.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-stone-300 flex items-center justify-between text-stone-800 font-semibold text-sm">
                    <span>Calculate Wholesale Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                {/* CARD 4: DIRECT SAMPLES */}
                <div 
                  onClick={() => setActiveTab("rfq")}
                  className="bg-white border-2 border-white/20 hover:border-amber-800/20 p-8 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between shadow-md hover:shadow-2xl relative overflow-hidden"
                  data-testid="bento-card-samples"
                >
                  <div className="absolute top-0 right-0 bg-ivory text-stone-800 text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl border-l border-b border-white/20">
                    DHL Express
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-charcoal to-charcoal border border-white/20 flex items-center justify-center text-stone-800 mb-6 group-hover:scale-110 transition-transform shadow-md">
                      <Award className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-stone-800 transition-colors">Airmail Sample Request</h3>
                    <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                      Receive 100g sealed cupping tins of our latest orthodox harvest directly at your office within 5 business days.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-stone-300 flex items-center justify-between text-stone-800 font-semibold text-sm">
                    <span>Order Cupping Tins</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                {/* CARD 5: COMPLIANCE & AUDITS */}
                <div 
                  onClick={() => setVerifyCert(CERTIFICATIONS["iso-22000"])}
                  className="bg-white border-2 border-white/20 hover:border-amber-800/20 p-8 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between shadow-md hover:shadow-2xl relative overflow-hidden"
                  data-testid="bento-card-certifications"
                >
                  <div className="absolute top-0 right-0 bg-ivory text-stone-800 text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl border-l border-b border-white/20">
                    ISO & NPOP
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-charcoal to-charcoal border border-white/20 flex items-center justify-center text-stone-800 mb-6 group-hover:scale-110 transition-transform shadow-md">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-stone-800 transition-colors">Compliance & Audit Hub</h3>
                    <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                      Download ISO 22000 food safety certificates, USDA Organic credentials, and EU MRL pesticide residue clearance reports.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-stone-300 flex items-center justify-between text-stone-800 font-semibold text-sm">
                    <span>Verify Credentials</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                {/* CARD 6: OEM & CUSTOM BLENDING */}
                <div 
                  onClick={() => setActiveTab("rfq")}
                  className="bg-white border-2 border-white/20 hover:border-amber-800/20 p-8 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between shadow-md hover:shadow-2xl relative overflow-hidden"
                  data-testid="bento-card-oem"
                >
                  <div className="absolute top-0 right-0 bg-ivory text-stone-800 text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl border-l border-b border-white/20">
                    Custom Packaging
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-charcoal to-charcoal border border-white/20 flex items-center justify-center text-stone-800 mb-6 group-hover:scale-110 transition-transform shadow-md">
                      <FileText className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-stone-800 transition-colors">OEM & Custom Blending</h3>
                    <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                      Custom leaf sizing, bespoke particle cut for tea bags, and private-label vacuum foil chest packaging for retail brands.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-stone-300 flex items-center justify-between text-stone-800 font-semibold text-sm">
                    <span>Request OEM Quotation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

              </div>

              {/* ESTATE INFRASTRUCTURE & PRODUCTION METRICS GRID */}
              <div className="bg-gradient-to-r from-charcoal via-charcoal to-charcoal border-2 border-white/20 rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl relative overflow-hidden" data-testid="infrastructure-kpi-grid">
                <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-3xl mb-10">
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-800 font-bold flex items-center gap-2">
                    <Factory className="w-4 h-4 text-stone-800" />
                    Arunachal Pradesh Production Facilities
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
                    Single-Origin Estate Infrastructure
                  </h3>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                    Integrated cultivation, processing, and containerization operating under strict ISO 22000 and HACCP food safety protocols.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-charcoal/80 border border-white/20 p-6 rounded-2xl backdrop-blur-md">
                    <div className="text-stone-800 text-3xl font-serif font-bold">1,200 Bigha</div>
                    <div className="text-white font-semibold text-sm mt-1">Organic Plantation</div>
                    <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                      Highland gardens in Kharsang at 300m-800m elevation in the Patkai hills.
                    </p>
                  </div>

                  <div className="bg-charcoal/80 border border-white/20 p-6 rounded-2xl backdrop-blur-md">
                    <div className="text-stone-800 text-3xl font-serif font-bold">72,000 Sq Ft</div>
                    <div className="text-white font-semibold text-sm mt-1">Processing Plant</div>
                    <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                      Modern factory equipped with climate-controlled brass rolling and withering troughs.
                    </p>
                  </div>

                  <div className="bg-charcoal/80 border border-white/20 p-6 rounded-2xl backdrop-blur-md">
                    <div className="text-stone-800 text-3xl font-serif font-bold">100% Organic</div>
                    <div className="text-white font-semibold text-sm mt-1">Zero Pesticides</div>
                    <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                      NPOP & USDA Organic certified soil nourished by rainforest mountain streams.
                    </p>
                  </div>

                  <div className="bg-charcoal/80 border border-white/20 p-6 rounded-2xl backdrop-blur-md">
                    <div className="text-stone-800 text-3xl font-serif font-bold">Kolkata Port</div>
                    <div className="text-white font-semibold text-sm mt-1">Ocean Dispatch</div>
                    <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                      Direct sealed container trucking to port for dispatch to Europe, US & Middle East.
                    </p>
                  </div>
                </div>
              </div>

              {/* SINGLE-ESTATE TEA CRAFTSMANSHIP & LEAF GALLERY GRID */}
              <div className="pt-8 border-t border-white/20" data-testid="tea-craftsmanship-gallery">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-stone-800 font-bold flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5 text-stone-800" />
                      Single-Origin Visual Showcase
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-2">
                      Orthodox Tea Grades & Estate Craftsmanship
                    </h2>
                    <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                      Full plot-to-package transparency. Click any tea grade or estate process below to inspect high-resolution leaf texture, liquor color, and factory processing.
                    </p>
                  </div>
                  <div className="text-xs text-charcoal font-semibold bg-ivory border border-white/20 px-4 py-2 rounded-full w-max shadow-sm">
                    8 Export Grades & Estate Views
                  </div>
                </div>

                {/* ELEGANT CORPORATE 4-COLUMN IMAGE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {TEA_GALLERY_GRID.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImageModal(item)}
                      data-testid={`tea-gallery-card-${item.id}`}
                      className="group relative rounded-2xl overflow-hidden bg-charcoal border-2 border-white/20 hover:border-amber-800/20 transition-all cursor-pointer shadow-lg hover:shadow-2xl flex flex-col justify-between"
                    >
                      {/* Image container */}
                      <div className="aspect-[4/3] w-full overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-[0.95]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                        
                        {/* Top Badge */}
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider text-charcoal border border-white/20 shadow-sm">
                          {item.badge}
                        </div>

                        {/* Expand Icon */}
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-charcoal/80 text-amber-50 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Content Overlay */}
                      <div className="p-4 bg-gradient-to-b from-charcoal to-charcoal flex-1 flex flex-col justify-between border-t border-white/20">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-stone-800 font-semibold">{item.category}</span>
                          <h3 className="font-serif text-lg font-bold text-white mt-0.5 group-hover:text-stone-800 transition-colors line-clamp-1">{item.title}</h3>
                          <p className="text-stone-600 text-xs mt-1.5 leading-relaxed line-clamp-2">{item.desc}</p>
                        </div>
                        
                        <div className="mt-3 pt-2 border-t border-charcoal/60 flex items-center justify-between text-[10px] text-stone-600">
                          <span className="truncate font-mono text-stone-800/90">{item.spec}</span>
                          <span className="text-stone-800 font-semibold group-hover:underline shrink-0 ml-2">Inspect &rarr;</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* RESPONSIVE CERTIFICATION CAROUSEL COMPONENT */}
            <CertificationCarousel onNavigateTab={setActiveTab} />

            {/* RECHARTS QUALITY METRICS COMPONENT */}
            <QualityMetrics />

          </div>
        )}

        {/* VIEW: CORPORATE PROFILE (ABOUT US) */}
        {activeTab === "about" && (
          <CorporateGovernance onOpenLeadForm={() => setIsLeadFormOpen(true)} />
        )}

        {/* VIEW: SOURCING ORIGIN (KHARSANG ESTATES) */}
        {activeTab === "sourcing" && (
          <>
            <KharsangTerroir onNavigateTab={setActiveTab} onOpenLeadForm={() => setIsLeadFormOpen(true)} />
            <TrajectorySourcingMap onNavigateTab={setActiveTab} />
          </>
        )}

        {/* VIEW: COMPLIANCE DOSSIER */}
        {activeTab === "compliance" && (
          <>
            <ComplianceDossier onOpenLeadForm={() => setIsLeadFormOpen(true)} />
            <CertificationCarousel onNavigateTab={setActiveTab} />
          </>
        )}

        {/* VIEW 2: TEA PRODUCT CATALOG */}
        {activeTab === "catalog" && (
          <div className="py-16 px-6 max-w-7xl mx-auto" data-testid="view-catalog">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">Exquisite Collection</span>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mt-2">Global Tea Catalog & Grades</h1>
                <p className="text-stone-600 mt-2">Single-origin, orthodox, and specialty loose leaf teas packaged for bulk commercial export.</p>
              </div>

              {/* SEARCH & FILTER */}
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-600" />
                  <input
                    type="text"
                    placeholder="Search grade or origin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="catalog-search-input"
                    className="bg-white border border-white/20 rounded-full pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20 w-64"
                  />
                </div>

                <select
                  value={selectedCertFilter}
                  onChange={(e) => setSelectedCertFilter(e.target.value)}
                  data-testid="catalog-cert-filter"
                  className="bg-white border border-white/20 rounded-full px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                >
                  <option value="All">All Certifications</option>
                  <option value="ISO 22000">ISO 22000</option>
                  <option value="Organic USDA">USDA Organic</option>
                  <option value="Fair Trade">Fair Trade</option>
                  <option value="Rainforest Alliance">Rainforest Alliance</option>
                </select>

                <button
                  onClick={() => window.print()}
                  data-testid="print-catalog-btn"
                  className="no-print flex items-center gap-2 bg-charcoal hover:bg-charcoal text-amber-50 px-4 py-2.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-semibold transition-all"
                  title="Print the full tea catalog as a spec brochure"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Print Catalog</span>
                </button>
              </div>
            </div>

            {/* CATALOG GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCatalog.map((tea) => (
                <div 
                  key={tea.id}
                  data-testid={`catalog-item-${tea.id}`}
                  className="bg-white border border-white/20 rounded-2xl overflow-hidden hover:border-amber-800/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={tea.image} 
                        alt={tea.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-semibold text-stone-800 shadow-md">
                        MOQ: {tea.moq}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-xs uppercase tracking-wider text-stone-700 font-semibold">{tea.origin}</div>
                      <h3 className="font-serif text-xl font-bold text-charcoal mt-1">{tea.name}</h3>
                      <div className="text-xs text-stone-600 font-mono mt-1">{tea.grade}</div>
                      
                      <p className="text-stone-600 text-sm mt-3 leading-relaxed">{tea.description}</p>
                      
                      <div className="mt-4 p-3 rounded-xl bg-ivory border border-stone-300">
                        <span className="text-[11px] uppercase text-stone-600 block font-semibold">Cup Profile</span>
                        <span className="text-xs text-charcoal">{tea.flavor}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {tea.certifications.map((cert, idx) => (
                          <span key={idx} className="text-[10px] bg-amber-50 text-stone-800 px-2.5 py-1 rounded-md border border-white/20 font-medium">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-stone-300 mt-4">
                    <div>
                      <span className="text-[10px] text-stone-600 uppercase block">Wholesale Rate</span>
                      <span className="font-serif font-bold text-lg text-charcoal">{tea.priceRange}</span>
                    </div>
                    <button
                      onClick={() => {
                        setRfqForm(prev => ({ ...prev, teaGrade: tea.name }));
                        setActiveTab("rfq");
                      }}
                      data-testid={`request-sample-${tea.id}`}
                      className="bg-champagne text-charcoal font-bold px-4 py-2 rounded-xl text-xs hover:bg-champagne/80 transition-all flex items-center gap-1.5 shadow-md shadow-champagne/10"
                    >
                      <span>Request Sample</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* B2B EXPORT LOGISTICS & PROCUREMENT FAQ COMPONENT */}
            <section className="mt-20 pt-16 border-t-2 border-white/20" data-testid="catalog-b2b-faq-section">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs uppercase tracking-[0.25em] text-stone-800 font-bold flex items-center justify-center gap-2">
                  <HelpCircle className="w-4 h-4 text-stone-800" />
                  B2B Procurement &amp; Logistics Knowledge Base
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-2">
                  Frequently Asked Questions for Bulk Importers
                </h2>
                <p className="text-stone-600 mt-3 text-sm sm:text-base leading-relaxed">
                  Key operational answers regarding ocean shipping lead times, container loading specs, fumigation, phytosanitary certificates, and pre-shipment sample dispatch.
                </p>
              </div>

              {/* SEARCH & CATEGORY FILTER BAR */}
              <div className="bg-ivory border border-white/20 rounded-2xl p-4 sm:p-6 mb-10 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Category Pill Filters */}
                  <div className="flex flex-wrap gap-2 w-full md:w-auto" data-testid="faq-category-pills">
                    {["All", "Logistics & Lead Times", "Packaging & Container Loading", "Incoterms & Ocean Freight", "Compliance & Documentation", "Samples & Ordering"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFaqCategoryFilter(cat)}
                        data-testid={`faq-cat-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          faqCategoryFilter === cat
                            ? "bg-charcoal text-amber-50 shadow-sm"
                            : "bg-white text-charcoal hover:bg-amber-100 border border-white/20"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search bar inside FAQ */}
                  <div className="relative w-full md:w-72 shrink-0">
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-stone-600" />
                    <input
                      type="text"
                      placeholder="Filter questions (e.g. lead time, pallet)..."
                      value={faqSearchQuery}
                      onChange={(e) => setFaqSearchQuery(e.target.value)}
                      data-testid="faq-search-input"
                      className="w-full bg-white border border-white/20 rounded-full pl-9 pr-4 py-2 text-xs text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                    />
                    {faqSearchQuery && (
                      <button
                        onClick={() => setFaqSearchQuery("")}
                        className="absolute right-3 top-2 text-stone-600 hover:text-charcoal text-xs font-bold"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-white/20 font-mono">
                  <span>Showing {filteredFaqs.length} of {B2B_EXPORT_FAQS.length} export guidelines</span>
                  {openFaqId ? (
                    <button onClick={() => setOpenFaqId(null)} className="text-stone-800 hover:underline font-semibold cursor-pointer">Collapse All</button>
                  ) : (
                    <button onClick={() => setOpenFaqId("lead-times")} className="text-stone-800 hover:underline font-semibold cursor-pointer">Expand First Question</button>
                  )}
                </div>
              </div>

              {/* FAQ ACCORDION LIST */}
              <div className="space-y-4 max-w-5xl mx-auto" data-testid="faq-accordion-container">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-white/20 p-8">
                    <HelpCircle className="w-10 h-10 text-stone-600 mx-auto mb-3" />
                    <h3 className="font-serif font-bold text-lg text-charcoal">No matching questions found</h3>
                    <p className="text-stone-600 text-xs mt-1">Try clearing your search query or selecting "All" categories.</p>
                    <button
                      onClick={() => { setFaqSearchQuery(""); setFaqCategoryFilter("All"); }}
                      className="mt-4 px-4 py-2 bg-charcoal text-amber-50 text-xs font-bold rounded-xl"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredFaqs.map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    const IconComp = faq.icon;
                    return (
                      <div
                        key={faq.id}
                        data-testid={`faq-item-${faq.id}`}
                        className={`bg-white border transition-all rounded-2xl overflow-hidden shadow-sm hover:shadow-md ${
                          isOpen ? "border-amber-800/20 ring-1 ring-champagne/30" : "border-stone-300 hover:border-white/20"
                        }`}
                      >
                        {/* Question Header */}
                        <button
                          type="button"
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          data-testid={`faq-trigger-${faq.id}`}
                          className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                        >
                          <div className="flex items-start sm:items-center gap-3.5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isOpen ? "bg-charcoal text-amber-50" : "bg-ivory text-stone-800"
                            }`}>
                              <IconComp className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-800 bg-ivory px-2 py-0.5 rounded border border-white/20">
                                  {faq.category}
                                </span>
                              </div>
                              <h3 className="font-serif font-bold text-base sm:text-lg text-charcoal mt-1 pr-2">
                                {faq.question}
                              </h3>
                            </div>
                          </div>
                          <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isOpen ? "bg-charcoal text-amber-50 rotate-180" : "bg-stone-100 text-charcoal"
                          }`}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>

                        {/* Answer Body */}
                        {isOpen && (
                          <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-stone-300 bg-gradient-to-b from-ivory/40 to-white" data-testid={`faq-content-${faq.id}`}>
                            <p className="text-charcoal text-sm leading-relaxed mt-4">
                              {faq.answer}
                            </p>

                            {/* Key Operational Highlights */}
                            <div className="mt-5 p-4 rounded-xl bg-white border border-white/20 shadow-inner">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal block mb-2">
                                Key Operational Specs &amp; Highlights:
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {faq.highlights.map((h, hIdx) => (
                                  <div key={hIdx} className="flex items-center gap-2 text-xs text-charcoal">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                                    <span>{h}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Direct Action CTA */}
                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-300/80">
                              <span className="text-xs text-stone-600 italic">Need further operational details?</span>
                              <button
                                type="button"
                                onClick={() => setActiveTab(faq.ctaTab)}
                                data-testid={`faq-cta-${faq.id}`}
                                className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal text-amber-50 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
                              >
                                <span>{faq.ctaText}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* BOTTOM CUSTOM LOGISTICS DIRECT CTA BANNER */}
              <div className="mt-14 max-w-5xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-charcoal via-charcoal to-charcoal border-2 border-white/20 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden" data-testid="faq-bottom-cta-banner">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-1 text-center md:text-left z-10">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-stone-800 font-bold">B2B Procurement Helpdesk</span>
                  <h3 className="font-serif text-2xl font-bold text-white">Have a specific port requirement or custom blend inquiry?</h3>
                  <p className="text-stone-600 text-xs max-w-xl">
                    Our export desk provides custom CIF ocean freight quotes, private label sample kits, and port-specific customs compliance assistance.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10">
                  <button
                    onClick={() => setActiveTab("rfq")}
                    data-testid="faq-banner-rfq-btn"
                    className="w-full sm:w-auto bg-champagne hover:bg-champagne/80 text-charcoal font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Wholesale Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleCopyEmail(e, "atweeltea@gmail.com")}
                    data-testid="faq-banner-email-btn"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl text-xs transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-stone-600" /> : <Copy className="w-3.5 h-3.5 text-stone-800" />}
                    <span>{copiedEmail ? "Email Copied!" : "Copy Export Desk Email"}</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 3: CUSTOM BLENDING RFQ FORM */}
        {activeTab === "rfq" && (
          <div className="py-16 px-6 max-w-5xl mx-auto" data-testid="view-rfq">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">Direct Procurement</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mt-2">Bulk Export Inquiry & Custom Blending RFQ</h1>
              <p className="text-stone-600 mt-3">Submit your wholesale tea requirements, private label specifications, or master blend custom profiling.</p>
            </div>

            {/* Direct Email Quick Copy Banner */}
            <div className="mb-8 p-4 rounded-2xl bg-ivory border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm" data-testid="rfq-quick-contact-banner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-charcoal text-amber-50 flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-charcoal">Direct Export Desk &amp; Documentation</div>
                  <div className="text-xs text-stone-600 mt-0.5">Reach our team directly at <span className="font-mono font-bold text-stone-800">atweeltea@gmail.com</span> or copy for your records.</div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => handleCopyEmail(e, "atweeltea@gmail.com")}
                data-testid="rfq-copy-email-btn"
                className="bg-charcoal hover:bg-charcoal text-amber-50 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap shadow-sm transition-all cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-stone-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? "Email Copied!" : "Copy Company Email"}</span>
              </button>
            </div>

            <div className="bg-white border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none" />

              <form onSubmit={handleRfqSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={rfqForm.fullName}
                      onChange={(e) => setRfqForm({ ...rfqForm, fullName: e.target.value })}
                      data-testid="rfq-fullname"
                      className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Company / Importer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nordic Beverage Imports GmbH"
                      value={rfqForm.companyName}
                      onChange={(e) => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                      data-testid="rfq-company"
                      className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. e.vance@nordicbeverage.com"
                      value={rfqForm.email}
                      onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                      data-testid="rfq-email"
                      className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Destination Country *</label>
                    <select
                      value={rfqForm.country}
                      onChange={(e) => setRfqForm({ ...rfqForm, country: e.target.value })}
                      data-testid="rfq-country"
                      className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Japan">Japan</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Select Tea Grade / Master Blend *</label>
                    <select
                      value={rfqForm.teaGrade}
                      onChange={(e) => setRfqForm({ ...rfqForm, teaGrade: e.target.value })}
                      data-testid="rfq-teagrade"
                      className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                    >
                      {TEA_CATALOG.map(t => (
                        <option key={t.id} value={t.name}>{t.name} ({t.grade})</option>
                      ))}
                      <option value="Custom Private Blend">Custom Private Blend (Specified Below)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Quantity (KG) * (Min 100 KG)</label>
                    <input
                      type="number"
                      min="100"
                      step="50"
                      required
                      value={rfqForm.quantityKg}
                      onChange={(e) => setRfqForm({ ...rfqForm, quantityKg: parseInt(e.target.value) || 100 })}
                      data-testid="rfq-quantity"
                      className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Target Port of Delivery *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Port of Rotterdam, Hamburg, Los Angeles, Tokyo"
                    value={rfqForm.targetPort}
                    onChange={(e) => setRfqForm({ ...rfqForm, targetPort: e.target.value })}
                    data-testid="rfq-port"
                    className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Custom Blending / Packaging Specifications Notes</label>
                  <textarea
                    rows="4"
                    placeholder="Describe aroma profiles, liquor brightness, moisture requirements, or retail vacuum packaging instructions..."
                    value={rfqForm.customBlendingNotes}
                    onChange={(e) => setRfqForm({ ...rfqForm, customBlendingNotes: e.target.value })}
                    data-testid="rfq-notes"
                    className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={rfqSubmitting}
                    data-testid="rfq-submit-btn"
                    className="w-full bg-gradient-to-r from-champagne via-champagne/80 to-champagne text-charcoal font-bold py-4 rounded-xl text-base shadow-xl shadow-champagne/20 hover:brightness-110 transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>{rfqSubmitting ? "Transmitting Secure RFQ..." : "Submit Official Export RFQ"}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-xs text-center text-stone-600 mt-3">Our Chief Tea Taster and Export Director will respond within 4 business hours with certified COA and FOB/CIF quotation.</p>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* VIEW 4: GLOBAL SHIPPING & LOGISTICS TRACKER */}
        {activeTab === "tracker" && (
          <div className="py-16 px-6 max-w-6xl mx-auto" data-testid="view-tracker">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">Real-Time Telemetry</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mt-2">Global Shipping & Logistics Tracker</h1>
              <p className="text-stone-600 mt-3">Track container temperature, humidity, customs clearance status, and maritime milestones worldwide.</p>
            </div>

            {/* TRACKING SEARCH BAR */}
            <div className="bg-white border border-white/20 p-6 rounded-2xl max-w-2xl mx-auto mb-12 shadow-xl">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Truck className="absolute left-4 top-3.5 w-5 h-5 text-stone-800" />
                  <input
                    type="text"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    placeholder="Enter Tracking ID (e.g. EXP-8842-NL)"
                    data-testid="tracker-input"
                    className="w-full bg-ivory border border-stone-300 rounded-xl pl-12 pr-4 py-3 text-sm text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                  />
                </div>
                <button
                  onClick={() => handleTrackShipment(trackingNumberInput)}
                  disabled={trackingLoading}
                  data-testid="tracker-submit"
                  className="bg-champagne text-charcoal font-bold px-8 py-3 rounded-xl hover:bg-champagne/80 transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>{trackingLoading ? "Locating..." : "Track"}</span>
                </button>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-stone-600">
                <span>Sample Tracking IDs:</span>
                <button 
                  onClick={() => { setTrackingNumberInput("EXP-8842-NL"); handleTrackShipment("EXP-8842-NL"); }}
                  className="text-stone-800 underline hover:text-stone-800"
                >
                  EXP-8842-NL (Rotterdam)
                </button>
                <button 
                  onClick={() => { setTrackingNumberInput("TEA-9921-US"); handleTrackShipment("TEA-9921-US"); }}
                  className="text-stone-800 underline hover:text-stone-800"
                >
                  TEA-9921-US (Los Angeles)
                </button>
              </div>
            </div>

            {/* TRACKING RESULTS DISPLAY */}
            {trackingResult && (
              <div className="bg-white border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in" data-testid="tracking-results">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-300 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-700 font-semibold">Active Bill of Lading</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-1">{trackingResult.trackingNumber}</h2>
                  </div>
                  <div className="flex items-center gap-3 bg-amber-50 border border-white/20 px-4 py-2 rounded-xl">
                    <div className="w-3 h-3 rounded-full bg-stone-100 animate-ping" />
                    <span className="text-xs font-semibold text-stone-800">{trackingResult.status}</span>
                  </div>
                </div>

                {/* METADATA CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-ivory p-4 rounded-xl border border-stone-300">
                    <span className="text-[11px] text-stone-600 uppercase block font-medium">Vessel / Carrier</span>
                    <span className="text-sm font-bold text-charcoal mt-1 block">{trackingResult.vessel}</span>
                  </div>
                  <div className="bg-ivory p-4 rounded-xl border border-stone-300">
                    <span className="text-[11px] text-stone-600 uppercase block font-medium">Route</span>
                    <span className="text-sm font-bold text-charcoal mt-1 block truncate">{trackingResult.destination}</span>
                  </div>
                  <div className="bg-ivory p-4 rounded-xl border border-stone-300">
                    <span className="text-[11px] text-stone-600 uppercase block font-medium">Container Climate</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Thermometer className="w-4 h-4 text-stone-800" />
                      <span className="text-sm font-bold text-charcoal">{trackingResult.temperature}</span>
                    </div>
                  </div>
                  <div className="bg-ivory p-4 rounded-xl border border-stone-300">
                    <span className="text-[11px] text-stone-600 uppercase block font-medium">Estimated Arrival</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-stone-800" />
                      <span className="text-sm font-bold text-charcoal">{trackingResult.eta}</span>
                    </div>
                  </div>
                </div>

                {/* MILESTONES TIMELINE */}
                <div className="pt-4">
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-6">Logistics & Quality Milestones</h3>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-stone-100">
                    {trackingResult.milestones.map((m, idx) => (
                      <div key={idx} className="flex items-start gap-4 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          m.completed ? "bg-champagne text-charcoal shadow-md shadow-champagne/30" : "bg-stone-100 text-charcoal border border-stone-300"
                        }`}>
                          {m.completed ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2.5 h-2.5 rounded-full bg-stone-100" />}
                        </div>
                        <div className="flex-1 bg-ivory p-4 rounded-xl border border-stone-300">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-charcoal text-sm">{m.step}</h4>
                            <span className="text-xs text-stone-800">{m.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* VIEW 5: FACTORY STANDARDS & QUALITY LAB SHOWCASE */}
        {activeTab === "standards" && (
          <div className="py-16 px-6 max-w-7xl mx-auto" data-testid="view-standards">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">Kharsang Manufacturing Facility</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mt-2">Factory Standards & Quality Lab</h1>
              <p className="text-stone-600 mt-4">Our 72,000 sq ft integrated tea factory in Nemphai 1, Kharsang, houses withering troughs, orthodox rollers, CTC units, an in-house tasting suite and a certified analytical laboratory — all under one HACCP-managed roof.</p>
            </div>

            {/* INSIDE THE KHARSANG FACTORY — REAL FOOTAGE */}
            <div className="mb-20" data-testid="factory-gallery">
              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-stone-100 animate-pulse" />
                  Inside the Kharsang Factory
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-charcoal mt-2">Real Machinery · Real Craftsmanship</h2>
                <p className="text-stone-600 mt-3 max-w-2xl mx-auto text-sm">
                  Live footage from our 72,000 sq ft manufacturing hall — the orthodox rollers, CTC units and sifter drums that turn today's plucked leaf into tomorrow's export lot.
                </p>
              </div>

              <div className="grid grid-cols-12 gap-4 md:gap-5">
                {/* Full-width video */}
                <div className="col-span-12 rounded-3xl overflow-hidden border-2 border-white/20 bg-charcoal relative group aspect-video shadow-2xl">
                  <video
                    src="/factory/factory-video.mp4"
                    poster="/factory/factory-video-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    data-testid="factory-video"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                    <div className="flex items-center gap-2 text-stone-800 text-[10px] uppercase tracking-[0.25em] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-charcoal text-ivory animate-pulse" />
                      Recorded on the Factory Floor
                    </div>
                    <div className="text-white font-serif text-2xl sm:text-3xl font-bold mt-2">Orthodox Rolling & CTC Line · Live Shift</div>
                    <div className="text-stone-600 text-sm mt-2 max-w-xl">Food-grade 304/316 stainless steel contact surfaces · Real-time moisture control locked at 3.0-3.5% · 500 m chemical-free buffer zone.</div>
                  </div>
                </div>

                {/* Portrait 1 — Orthodox rolling machine close-up */}
                <div className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-3xl overflow-hidden border-2 border-white/20 relative group aspect-[4/5] shadow-xl">
                  <img
                    src="/factory/factory-2-lg.jpg"
                    srcSet="/factory/factory-2-md.jpg 960w, /factory/factory-2-lg.jpg 1920w"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt="Orthodox rolling table at the Atweel factory, Kharsang"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-stone-800 text-[10px] uppercase tracking-[0.2em] font-bold">Orthodox Roller</div>
                    <div className="text-white font-serif text-lg font-bold mt-1">Traditional Leaf Bruising & Twist</div>
                    <div className="text-stone-600 text-[11px] mt-1">Preserves cell walls to release aromatic essential oils</div>
                  </div>
                </div>

                {/* Portrait 2 — Row of rolling machines */}
                <div className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-3xl overflow-hidden border-2 border-white/20 relative group aspect-[4/5] shadow-xl">
                  <img
                    src="/factory/factory-3-lg.jpg"
                    srcSet="/factory/factory-3-md.jpg 960w, /factory/factory-3-lg.jpg 1920w"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt="Multiple orthodox roller units running in parallel at Atweel Kharsang factory"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-stone-800 text-[10px] uppercase tracking-[0.2em] font-bold">Parallel Rolling Bay</div>
                    <div className="text-white font-serif text-lg font-bold mt-1">Multi-Unit Production Line</div>
                    <div className="text-stone-600 text-[11px] mt-1">Scaled to process 1,200-bigha peak-flush yield</div>
                  </div>
                </div>

                {/* Info card — factory metrics */}
                <div className="col-span-12 lg:col-span-4 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 border-2 border-white/20 shadow-xl relative overflow-hidden">
                  <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-amber-50 blur-3xl" />
                  <div className="relative">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-stone-800 font-semibold">Factory Snapshot</div>
                    <div className="font-serif text-3xl font-bold text-white mt-2 leading-tight">72,000 sq ft under one HACCP-managed roof</div>

                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                        <Package className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">Withering · Rolling · Fermentation</div>
                          <div className="text-stone-600 text-xs">Full orthodox &amp; CTC processing capability</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                        <Thermometer className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">Real-time Moisture Analysers</div>
                          <div className="text-stone-600 text-xs">Digital output locked 3.0 – 3.5%</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">Food-Grade 304/316 Stainless</div>
                          <div className="text-stone-600 text-xs">Zero ferrous ingress tolerance</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* LAB GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <img 
                  src="/factory/factory-1-lg.jpg" 
                  srcSet="/factory/factory-1-md.jpg 960w, /factory/factory-1-lg.jpg 1920w"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt="Atweel Tea sorting and sifting hall at the Kharsang factory" 
                  className="rounded-3xl border border-white/20 shadow-2xl h-[400px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-white/20 text-xs font-semibold text-stone-800">
                  ISO 22000 & HACCP Certified · India Organic
                </div>
                <h2 className="font-serif text-3xl font-bold text-charcoal">Plot-to-Package Quality Control</h2>
                <p className="text-stone-600 leading-relaxed text-sm">
                  Because we own every stage — from the 1,200-bigha organic garden to the 72,000 sq ft factory floor — our master tea maker and in-house analytical team can hold every batch to ISO 3103 cupping protocols, verify moisture and residue thresholds, and issue a Certificate of Analysis before the container seal is applied. No middlemen. No blending losses. No surprises for the buyer.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-stone-300">
                    <span className="font-serif font-bold text-2xl text-charcoal">≤ 3.5%</span>
                    <span className="text-xs text-stone-600 block mt-1">Max Moisture Standard</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-stone-300">
                    <span className="font-serif font-bold text-2xl text-charcoal">0.0 ppm</span>
                    <span className="text-xs text-stone-600 block mt-1">Chemical Pesticide Residue</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-stone-300">
                    <span className="font-serif font-bold text-2xl text-charcoal">72,000</span>
                    <span className="text-xs text-stone-600 block mt-1">Sq Ft Factory Area</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-stone-300">
                    <span className="font-serif font-bold text-2xl text-charcoal">1,200</span>
                    <span className="text-xs text-stone-600 block mt-1">Bigha Organic Garden</span>
                  </div>
                </div>
              </div>
            </div>

            {/* OFFICIAL SOP DOWNLOAD BANNER */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 mb-20 overflow-hidden shadow-2xl" data-testid="sop-banner">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.18),transparent_60%)]" />
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-50 blur-3xl" />
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-8 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-white/20 text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-800">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Document ID · AT-SOP-QA-2026-V3</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                    The Atweel Tea <span className="text-stone-800">Global Compliance Manual</span>
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed max-w-2xl">
                    A 12-section end-to-end Standard Operating Procedure covering plantation care, zero-residue pest control, GMP factory hygiene, super-barrier vacuum packaging, climate-controlled storage and unbreachable DDP ocean transit — the same document we share with our EU and US-FDA compliance buyers.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-600">Effective 12 Jul 2026</span>
                    <span className="text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-600">Annual Review Cycle</span>
                    <span className="text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-amber-50 border border-white/20 text-stone-800 font-semibold">0.0% Pesticide Residue</span>
                  </div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <a
                    href="/atweel-sop.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="download-sop-btn"
                    className="group flex items-center justify-between gap-4 bg-gradient-to-r from-champagne to-champagne hover:brightness-110 text-charcoal font-bold px-6 py-4 rounded-2xl transition-all shadow-lg shadow-champagne/30"
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-wider opacity-80">Download Official SOP</div>
                      <div className="font-serif text-lg">PDF · 44 KB · 7 pages</div>
                    </div>
                    <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href="/atweel-sop.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="view-sop-btn"
                    className="text-center text-stone-800 text-xs font-semibold hover:text-white transition-colors py-2 border border-white/20 rounded-xl"
                  >
                    Open in browser →
                  </a>
                </div>
              </div>
            </div>

            {/* 12 SOP PILLARS */}
            <div className="mb-20">
              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">Twelve-Pillar Compliance Framework</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-2">Every Step of Farm-to-Container, Codified</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { n: "01", icon: Sparkles, title: "Sustainable Plantation Care", body: "Annual soil analysis. pH strictly 4.5-5.5. Leguminous shade forestry with Albizia chinensis. Zero glyphosate — manual weeding and organic mulching only." },
                  { n: "02", icon: Award, title: "Organic Nutrition (KHAD)", body: "2-3 kg vermicompost & mature FYM per bush annually. Neem cake and castor cake botanical inputs. Azotobacter + PSB bio-fertilizer inoculation post pruning." },
                  { n: "03", icon: ShieldAlert, title: "Zero-Residue Pest Control", body: "Only medical-grade Azadirachtin (10,000 PPM neem oil). Bacillus thuringiensis for loopers, Beauveria bassiana for sucking pests. Absolute 21-30 day Pre-Harvest Interval." },
                  { n: "04", icon: Package, title: "Fine Harvesting Standards", body: "Strict 'Two Leaves and a Bud' fine pluck. Award-grade export from Second Flush (May-Jun) only. Ventilated food-grade crates — no jute or nylon sacks." },
                  { n: "05", icon: Building, title: "Factory Cleanliness Controls", body: "500 m chemical-free buffer zone. Food-grade 304/316 stainless steel contact surfaces. Real-time moisture analyzers locked at 3.0-3.5%." },
                  { n: "06", icon: ShieldCheck, title: "GMP Personnel Hygiene", body: "Full PPE, hairnets covering ears, nitrile gloves. Multi-stage non-touch sanitization stations. Annual medical clearance. Zero jewellery/phones on the floor." },
                  { n: "07", icon: Package, title: "Super-Barrier Vacuum Packaging", body: "4-layer aluminium foil liners at WVTR 0.00 · BPA-free · EU EC 10/2011. Double 99.99% nitrogen flush. Automated metal detection & pneumatic pressure integrity audit." },
                  { n: "08", icon: Thermometer, title: "Climate-Controlled Storage", body: "Grade-A dehumidified vaults at Kolkata Port. 20-22 °C · 50-55% RH continuously logged. Pallets raised 6 in off floor, 15 cm off walls, isolated from spices." },
                  { n: "09", icon: CheckCircle2, title: "Pre-Shipment Lab Verification", body: "Third-party random composite sampling by SGS or Eurofins. 500+ pesticide multi-complex, heavy metals (Pb, As), Ochratoxin A. Loading blocked until 'Passed for EU/USA'." },
                  { n: "10", icon: Truck, title: "Unbreachable Container Prep", body: "Light-leak & odour audit on empty 20 ft container. Full aluminium laminated thermal liner. 10+ CaCl₂ desiccant poles. Reefer option at continuous +18 °C for ultra-premium lots." },
                  { n: "11", icon: Globe, title: "DDP Delivered-Duty-Paid", body: "All customs clearance, tariffs and VAT pre-cleared by our broker. Unbroken door-to-warehouse delivery at destination — buyer receives goods with zero import friction." },
                  { n: "12", icon: Search, title: "Traceability & Recall System", body: "Laser-coded multidimensional batch ID maps back to blending shift, machinery log, field section and bio-input history. Bi-annual mock recall isolates any lot within 24 hours." }
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.n} className="group bg-white border border-white/20 rounded-2xl p-6 hover:border-amber-800/20 hover:shadow-lg hover:shadow-champagne/10 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-white/20 flex items-center justify-center text-stone-600 shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-stone-400 font-bold text-sm">{s.n}</span>
                            <h4 className="font-serif font-bold text-base text-charcoal leading-tight">{s.title}</h4>
                          </div>
                          <p className="text-stone-600 text-xs mt-2 leading-relaxed">{s.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* QUALITY METRICS THRESHOLD MATRIX */}
            <div className="mb-20 bg-white border border-white/20 rounded-3xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-ivory to-ivory px-8 py-6 border-b border-white/20">
                <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">Quality Metrics Summary Matrix</span>
                <h3 className="font-serif text-2xl font-bold text-charcoal mt-1">Critical Thresholds · Verifying Authorities</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ivory text-[11px] uppercase tracking-wider text-stone-700">
                      <th className="text-left px-6 py-4 font-semibold">Operational Phase</th>
                      <th className="text-left px-4 py-4 font-semibold">Critical Parameter Target</th>
                      <th className="text-left px-4 py-4 font-semibold">Frequency</th>
                      <th className="text-left px-6 py-4 font-semibold">Verifying Authority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { phase: "Soil Health", target: "pH 4.5-5.5 · 0% Heavy Metal Contamination", freq: "Annual Test", auth: "Agronomy Lab / QA Team" },
                      { phase: "Crop Protection", target: "Zero Synthetic Residues · Neem Oil at 10,000 PPM", freq: "Per Application", auth: "Plantation Supervisor" },
                      { phase: "Plucking Standard", target: "100% Two Leaves and a Bud fine pluck", freq: "Every Batch / Hourly", auth: "Field Quality Auditor" },
                      { phase: "Factory Output", target: "Moisture 3.0-3.5% · 0% Ferrous Ingress", freq: "Hourly Digital Scan", auth: "Factory In-Charge" },
                      { phase: "Packaging Liner", target: "WVTR 0.00 · Multi-Layer Aluminium (BPA-Free)", freq: "Per Lot Intake", auth: "Supplier Certification" },
                      { phase: "Terminal Storage", target: "Temp 20-22 °C · Humidity 50-55% RH", freq: "Continuous Log", auth: "Automated Data Logger" },
                      { phase: "Pre-Shipment Cert", target: "0.0% Trace across 500+ Chemicals", freq: "Per Export Lot", auth: "SGS / Eurofins Certified" }
                    ].map((row, idx) => (
                      <tr key={row.phase} className={idx % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                        <td className="px-6 py-4 font-serif font-bold text-charcoal">{row.phase}</td>
                        <td className="px-4 py-4 text-stone-600">{row.target}</td>
                        <td className="px-4 py-4 text-stone-600">{row.freq}</td>
                        <td className="px-6 py-4 text-charcoal font-medium">{row.auth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TRACEABILITY NARRATIVE */}
            <div className="mb-20 grid grid-cols-1 md:grid-cols-5 gap-8 items-center bg-emerald-950 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(212,175,55,0.15),transparent_50%)]" />
              <div className="md:col-span-2 relative">
                <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-white/20 flex items-center justify-center text-stone-800 mb-4">
                  <Search className="w-10 h-10" />
                </div>
                <div className="font-mono text-stone-800 text-xs tracking-wider">BATCH · AT-KHR-{new Date().getFullYear()}-042</div>
                <div className="text-3xl font-serif font-bold mt-2 text-white">24-Hour Recall Guarantee</div>
              </div>
              <div className="md:col-span-3 relative">
                <p className="text-stone-600 text-sm leading-relaxed">
                  Every export unit carries a laser-coded <span className="text-stone-800 font-semibold">multidimensional Batch Identifier</span> that maps the finished tea back to its exact blending shift, machinery log, field section within the estate, and full bio-input application history for that harvest window.
                </p>
                <p className="text-stone-600 text-sm leading-relaxed mt-3">
                  Bi-annual <span className="text-white font-semibold">mock recall simulations</span> validate that any specific batch can be isolated from international retail networks and quarantined within <span className="text-stone-800 font-bold">24 hours</span>, giving importers absolute confidence in food-safety incident response.
                </p>
              </div>
            </div>


            {/* CERTIFICATES SHOWCASE */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-charcoal text-center mb-10">Accreditations & Global Compliance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "India Organic (NPOP)", desc: "Certified under APEDA's National Programme for Organic Production for cultivation, processing and handling.", code: "IN-ORG-021" },
                  { title: "USDA Organic (NOP)", desc: "Compliant with the US National Organic Program standards for growing, processing and labelling.", code: "NOP-1082" },
                  { title: "ISO 22000:2018", desc: "International Food Safety Management System certification covering the entire farm-to-container chain.", code: "ISO-98421" },
                  { title: "HACCP & FSSAI", desc: "Hazard analysis, critical control point protocols and India's food regulator licence for manufacture & export.", code: "FSSAI-10023" }
                ].map((cert, idx) => (
                  <div key={idx} className="bg-white border border-white/20 p-6 rounded-2xl hover:border-amber-800/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-stone-800 mb-4">
                        <Award className="w-6 h-6" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-charcoal">{cert.title}</h4>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">{cert.desc}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-stone-300 flex items-center justify-between text-xs">
                      <span className="text-stone-600 font-mono">{cert.code}</span>
                      <span className="text-stone-800 font-semibold flex items-center gap-1">
                        <span>Verified</span>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESPONSIVE CERTIFICATION CAROUSEL COMPONENT */}
            <CertificationCarousel onNavigateTab={setActiveTab} />

            {/* RECHARTS QUALITY METRICS COMPONENT */}
            <QualityMetrics />

          </div>
        )}

        {/* VIEW 6: WHOLESALE PRICE & MOQ CALCULATOR */}
        {activeTab === "calculator" && (
          <div className="py-16 px-6 max-w-6xl mx-auto" data-testid="view-calculator">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">Interactive Estimator</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mt-2">Wholesale Price & MOQ Calculator</h1>
              <p className="text-stone-600 mt-3">Configure your order parameters to calculate tiered volume discounts, packaging rates, and CIF/FOB export estimates instantly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* CALCULATOR CONTROLS */}
              <div className="lg:col-span-7 bg-white border border-white/20 p-8 rounded-3xl shadow-xl space-y-6">
                
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Select Tea Grade</label>
                  <select
                    value={calcForm.teaGrade}
                    onChange={(e) => setCalcForm({ ...calcForm, teaGrade: e.target.value })}
                    data-testid="calc-teagrade"
                    className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                  >
                    {TEA_CATALOG.map(t => (
                      <option key={t.id} value={t.name}>{t.name} (Base: ${t.priceRange})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-wider text-stone-700 font-semibold">Order Quantity (KG)</label>
                    <div className="flex items-center gap-1.5 bg-ivory border border-stone-300 rounded-lg px-2.5 py-1">
                      <input
                        type="number"
                        min="1"
                        max="50000"
                        step="50"
                        value={calcForm.quantityKg}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setCalcForm({ ...calcForm, quantityKg: val });
                        }}
                        data-testid="calc-quantity-input"
                        className="w-24 text-right text-sm font-mono font-bold text-charcoal bg-transparent focus:outline-none"
                      />
                      <span className="text-xs text-stone-600 font-semibold">KG</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={Math.min(calcForm.quantityKg, 10000)}
                    onChange={(e) => setCalcForm({ ...calcForm, quantityKg: parseInt(e.target.value) })}
                    data-testid="calc-slider"
                    className="w-full accent-champagne cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-600 mt-1">
                    <span>MOQ: 100 KG</span>
                    <span>2,000 KG (12% off)</span>
                    <span>5,000+ KG (18% off)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Packaging Standard</label>
                  <select
                    value={calcForm.packagingType}
                    onChange={(e) => setCalcForm({ ...calcForm, packagingType: e.target.value })}
                    data-testid="calc-packaging"
                    className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                  >
                    <option value="Bulk Vacuum Foil (10kg/25kg)">Bulk Vacuum Foil (10kg/25kg)</option>
                    <option value="Retail Tin Caddies (100g/250g)">Retail Tin Caddies (100g/250g)</option>
                    <option value="Biodegradable Pyramid Pouches">Biodegradable Pyramid Pouches</option>
                    <option value="Master Export Cartons">Master Export Cartons</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Shipping & Incoterms Method</label>
                  <select
                    value={calcForm.shippingMethod}
                    onChange={(e) => setCalcForm({ ...calcForm, shippingMethod: e.target.value })}
                    data-testid="calc-shipping"
                    className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                  >
                    <option value="FOB - Ocean Freight (Standard Container)">FOB - Ocean Freight (Standard Container)</option>
                    <option value="CIF - Cost, Insurance & Freight">CIF - Cost, Insurance & Freight</option>
                    <option value="EXW - Ex-Works Factory Gate">EXW - Ex-Works Factory Gate</option>
                    <option value="Air Freight Express (Sample/Urgent)">Air Freight Express (Sample/Urgent)</option>
                  </select>
                </div>

                <button
                  onClick={() => handleCalculateQuote(calcForm)}
                  disabled={calcLoading}
                  data-testid="calc-recalculate-btn"
                  className="w-full bg-champagne text-charcoal font-bold py-3.5 rounded-xl hover:bg-champagne/80 transition-all shadow-lg shadow-champagne/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{calcLoading ? "Updating Estimate..." : "Recalculate Estimate"}</span>
                </button>

              </div>

              {/* CALCULATOR RESULTS CARD */}
              <div className="lg:col-span-5 bg-white border border-white/20 p-8 rounded-3xl shadow-2xl space-y-6 sticky top-28">
                <div className="flex items-center justify-between pb-6 border-b border-stone-300">
                  <h3 className="font-serif text-2xl font-bold text-charcoal">Estimate Summary</h3>
                  <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${
                    calcResult?.moqMet
                      ? "bg-amber-50 text-stone-800 border-white/20"
                      : "bg-stone-100 text-charcoal border-stone-300"
                  }`}>
                    {calcResult?.moqMet ? "MOQ Verified" : "Below MOQ (Min 100 KG)"}
                  </span>
                </div>

                {calcResult && (
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between text-stone-600">
                      <span>Selected Grade:</span>
                      <span className="font-semibold text-charcoal text-right">{calcResult.teaGrade}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Quantity:</span>
                      <span className="font-semibold text-charcoal">{calcResult.quantityKg} KG</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Base Unit Price:</span>
                      <span className="font-semibold text-charcoal">${calcResult.baseUnitPrice?.toFixed(2)} / KG</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Volume Discount:</span>
                      <span className="font-semibold text-charcoal">-{calcResult.discountAppliedPercent}%</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Adjusted Unit Price:</span>
                      <span className="font-semibold text-charcoal">${calcResult.adjustedUnitPrice?.toFixed(2)} / KG</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal (Tea):</span>
                      <span className="font-semibold text-charcoal">${calcResult.subtotalUsd?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Packaging Cost:</span>
                      <span className="font-semibold text-charcoal">${calcResult.packagingCostUsd?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Freight & Logistics:</span>
                      <span className="font-semibold text-charcoal">${calcResult.freightCostUsd?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-stone-600 pt-1 border-t border-dashed border-stone-300">
                      <span>Est. Shipping Lead Time:</span>
                      <span className="font-semibold text-charcoal">
                        ~{calcResult.estimatedTransitDays || 14} Days Transit
                      </span>
                    </div>

                    <div className="pt-5 border-t border-stone-300 flex justify-between items-center">
                      <span className="font-serif text-lg font-bold text-charcoal">Total Estimated (USD):</span>
                      <span className="font-serif text-2xl font-bold text-charcoal">${calcResult.totalEstimatedUsd?.toLocaleString()}</span>
                    </div>

                    <button
                      onClick={() => {
                        setRfqForm(prev => ({
                          ...prev,
                          quantityKg: calcForm.quantityKg,
                          teaGrade: calcForm.teaGrade,
                          customBlendingNotes: `Calculated Estimate Details:\n- Grade: ${calcForm.teaGrade}\n- Order Volume: ${calcForm.quantityKg} KG\n- Packaging: ${calcForm.packagingType}\n- Incoterms/Shipping: ${calcForm.shippingMethod}\n- Estimated Price: $${calcResult.totalEstimatedUsd?.toLocaleString() || ''} USD ($${calcResult.adjustedUnitPrice?.toFixed(2)}/kg base)`
                        }));
                        setActiveTab("rfq");
                        toast.success("Quote specifications transferred to Export RFQ form.");
                      }}
                      data-testid="calc-convert-rfq"
                      className="w-full mt-4 bg-gradient-to-r from-champagne to-champagne text-charcoal font-bold py-3.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-champagne/20"
                    >
                      <span>Lock In Price & Send RFQ</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* VIEW 7: GLOBAL DESTINATIONS & TESTIMONIALS */}
        {activeTab === "destinations" && (
          <div className="py-16 px-6 max-w-7xl mx-auto" data-testid="view-destinations">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">Global Footprint</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mt-2">Export Destinations & Client Testimonials</h1>
              <p className="text-stone-600 mt-4">Trusted by premier importers, tea houses, and beverage corporations across 45+ countries.</p>
            </div>

            {/* DESTINATIONS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                { country: "Netherlands & Europe", port: "Port of Rotterdam Hub", volume: "4,200 Tons/Yr", lead: "12-14 Days Transit" },
                { country: "United States", port: "Ports of LA & New York", volume: "3,800 Tons/Yr", lead: "18-22 Days Transit" },
                { country: "United Kingdom", port: "Port of Felixstowe", volume: "2,500 Tons/Yr", lead: "14-16 Days Transit" },
                { country: "Japan & East Asia", port: "Ports of Tokyo & Yokohama", volume: "2,000 Tons/Yr", lead: "10-12 Days Transit" }
              ].map((dest, idx) => (
                <div key={idx} className="bg-white border border-white/20 p-6 rounded-2xl hover:border-amber-800/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-stone-800 mb-4">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-charcoal">{dest.country}</h3>
                  <div className="text-xs text-charcoal font-semibold mt-1">{dest.port}</div>
                  <div className="mt-4 pt-4 border-t border-stone-300 flex justify-between text-xs text-stone-600">
                    <span>{dest.volume}</span>
                    <span>{dest.lead}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* TESTIMONIALS */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-charcoal text-center mb-10">What Executive Importers Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote: "Atweel Tea's single-estate organic orthodox has become the anchor of our premium loose-leaf range across Europe. The traceability from their Kharsang factory is best-in-class.",
                    author: "Henrik Van Der Meer",
                    title: "Director of Procurement, Amsterdam Tea Guild",
                    country: "Netherlands"
                  },
                  {
                    quote: "The custom blending RFQ process and real-time shipping telemetry give us absolute peace of mind for our 5-ton quarterly orders.",
                    author: "Sarah Jenkins, C.T.C.",
                    title: "VP Supply Chain, Pacific Leaf & Brew Co.",
                    country: "United States"
                  },
                  {
                    quote: "Unmatched leaf uniformity, pristine liquor notes, and flawless customs documentation every single time.",
                    author: "Kenji Sato",
                    title: "Master Blender, Nippon Fine Teas Ltd.",
                    country: "Japan"
                  }
                ].map((test, idx) => (
                  <div key={idx} className="bg-white border border-white/20 p-8 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 text-stone-800 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-stone-600 text-sm italic leading-relaxed">"{test.quote}"</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-stone-300">
                      <h4 className="font-semibold text-charcoal text-sm">{test.author}</h4>
                      <p className="text-xs text-stone-600 mt-0.5">{test.title}</p>
                      <p className="text-[11px] text-stone-600">{test.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}


        {/* VIEW 8: DYNAMIC WEBSITE DATA CMS & ADMIN PORTAL */}
        {activeTab === "admin" && (
          <div className="py-12 px-6 max-w-7xl mx-auto" data-testid="view-admin">
            
            {/* CMS HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/20 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-700 font-semibold">Live Content Management</span>
                  <span className="bg-amber-100 text-stone-800 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border border-white/20">CMS Active</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-1">Website Data & Content Manager</h1>
                <p className="text-stone-600 text-sm mt-1">Make dynamic real-time changes to tea catalog grades, live pricing, cargo telemetry, estate stats, and buyer RFQs.</p>
              </div>

              {adminAuthed && (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleResetSiteData}
                    data-testid="admin-reset-defaults"
                    className="flex items-center gap-1.5 border border-charcoal bg-charcoal text-ivory hover:bg-stone-800 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    title="Reset products, shipments and estate metrics back to factory defaults"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={() => { fetchSiteData(); fetchEnquiries(); }}
                    disabled={adminLoading}
                    data-testid="admin-refresh"
                    className="flex items-center gap-1.5 border border-white/20 bg-white text-charcoal px-4 py-2 rounded-xl text-xs font-semibold hover:bg-amber-50 transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${adminLoading ? "animate-spin text-stone-800" : ""}`} />
                    <span>{adminLoading ? "Refreshing…" : "Refresh All Data"}</span>
                  </button>

                  <button
                    onClick={handleAdminLogout}
                    data-testid="admin-logout"
                    className="text-stone-600 hover:text-charcoal text-xs font-medium underline px-2 py-1"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {!adminAuthed ? (
              <div className="max-w-md mx-auto bg-white border border-white/20 rounded-3xl p-10 shadow-xl my-12">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-white/20 flex items-center justify-center text-stone-800 mb-6 mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-charcoal text-center">Admin CMS Sign-In</h2>
                <p className="text-stone-600 text-xs text-center mt-2 leading-relaxed">
                  Enter your admin token to unlock dynamic editing for tea products, pricing, shipment telemetry, and estate metrics.
                </p>
                <div className="mt-4 p-3 bg-ivory border border-white/20 rounded-xl text-center">
                  <span className="text-[11px] text-stone-600 block">Default Development Admin Token:</span>
                  <code className="text-xs font-mono font-bold text-stone-800">atweel-admin-change-me</code>
                </div>
                <form onSubmit={handleAdminLogin} className="mt-6 space-y-4">
                  <input
                    type="password"
                    placeholder="Enter Admin Token"
                    value={adminTokenInput}
                    onChange={(e) => setAdminTokenInput(e.target.value)}
                    data-testid="admin-token-input"
                    className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                    autoFocus
                  />
                  <button
                    type="submit"
                    data-testid="admin-login-btn"
                    className="w-full bg-gradient-to-r from-champagne to-champagne text-charcoal font-bold py-3 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-champagne/20"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Unlock CMS Dashboard</span>
                  </button>
                </form>
              </div>
            ) : (
              <>
                {/* CMS SUB-TAB NAVIGATION BAR */}
                <div className="flex flex-wrap gap-2 border-b border-stone-300 mb-8 pb-3">
                  <button
                    onClick={() => setCmsTab("products")}
                    data-testid="cms-tab-products"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      cmsTab === "products"
                        ? "bg-charcoal text-amber-50 shadow-md"
                        : "bg-white text-stone-600 hover:bg-ivory border border-stone-300"
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Tea Catalog & Pricing ({siteProducts.length})</span>
                  </button>

                  <button
                    onClick={() => setCmsTab("shipments")}
                    data-testid="cms-tab-shipments"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      cmsTab === "shipments"
                        ? "bg-charcoal text-amber-50 shadow-md"
                        : "bg-white text-stone-600 hover:bg-ivory border border-stone-300"
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Cargo Telemetry ({Array.isArray(siteShipments) ? siteShipments.length : Object.keys(siteShipments).length})</span>
                  </button>

                  <button
                    onClick={() => setCmsTab("estate")}
                    data-testid="cms-tab-estate"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      cmsTab === "estate"
                        ? "bg-charcoal text-amber-50 shadow-md"
                        : "bg-white text-stone-600 hover:bg-ivory border border-stone-300"
                    }`}
                  >
                    <Factory className="w-4 h-4" />
                    <span>Estate & Operational KPIs</span>
                  </button>

                  <button
                    onClick={() => setCmsTab("announcement")}
                    data-testid="cms-tab-announcement"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      cmsTab === "announcement"
                        ? "bg-charcoal text-amber-50 shadow-md"
                        : "bg-white text-stone-600 hover:bg-ivory border border-stone-300"
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    <span>Banner Alert Ticker</span>
                  </button>

                  <button
                    onClick={() => setCmsTab("certificates")}
                    data-testid="cms-tab-certificates"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      cmsTab === "certificates"
                        ? "bg-charcoal text-amber-50 shadow-md"
                        : "bg-white text-stone-600 hover:bg-ivory border border-stone-300"
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>Compliance & Licenses ({siteCertificates.length})</span>
                  </button>

                  <button
                    onClick={() => { setCmsTab("audit"); fetchAuditLog(); }}
                    data-testid="cms-tab-audit"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      cmsTab === "audit"
                        ? "bg-charcoal text-amber-50 shadow-md"
                        : "bg-white text-stone-600 hover:bg-ivory border border-stone-300"
                    }`}
                  >
                    <History className="w-4 h-4" />
                    <span>Audit Log</span>
                  </button>

                  <button
                    onClick={() => setCmsTab("backup")}
                    data-testid="cms-tab-backup"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      cmsTab === "backup"
                        ? "bg-charcoal text-amber-50 shadow-md"
                        : "bg-white text-stone-600 hover:bg-ivory border border-stone-300"
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Backup & Restore</span>
                  </button>

                  <button
                    onClick={() => setCmsTab("enquiries")}
                    data-testid="cms-tab-enquiries"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      cmsTab === "enquiries"
                        ? "bg-charcoal text-amber-50 shadow-md"
                        : "bg-white text-stone-600 hover:bg-ivory border border-stone-300"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Buyer RFQ Inbox ({enquiryCounts.total || enquiries.length})</span>
                  </button>
                </div>

                {/* SUB-PANEL 1: PRODUCTS & PRICING CMS */}
                {cmsTab === "products" && (
                  <div className="space-y-6" data-testid="cms-products-panel">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-white/20">
                      <div>
                        <h2 className="font-serif text-xl font-bold text-charcoal">Dynamic Tea Catalog & Wholesale Rates</h2>
                        <p className="text-stone-600 text-xs mt-1">Changes made here automatically update the public catalog, quote estimator, and sample request selectors in real time.</p>
                      </div>
                      <button
                        onClick={() => handleOpenProductModal(null)}
                        data-testid="cms-add-product-btn"
                        className="bg-champagne text-charcoal font-bold px-5 py-2.5 rounded-xl text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-md shadow-champagne/20"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Tea Grade</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {siteProducts.map((prod) => (
                        <div
                          key={prod.id}
                          data-testid={`cms-product-card-${prod.id}`}
                          className="bg-white border border-stone-300 rounded-2xl overflow-hidden hover:border-amber-800/20 transition-all flex flex-col justify-between shadow-sm"
                        >
                          <div>
                            <div className="h-44 overflow-hidden relative bg-stone-100">
                              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                              <div className="absolute top-3 right-3 flex gap-1">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${
                                  prod.inStock !== false ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"
                                }`}>
                                  {prod.inStock !== false ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}
                                </span>
                              </div>
                            </div>
                            <div className="p-5">
                              <span className="text-[10px] uppercase font-semibold text-charcoal tracking-wider block">{prod.origin}</span>
                              <h3 className="font-serif font-bold text-lg text-charcoal mt-1">{prod.name}</h3>
                              <div className="text-xs text-stone-600 font-mono mt-0.5">{prod.grade}</div>
                              <p className="text-xs text-stone-600 mt-2 line-clamp-2">{prod.description}</p>
                              
                              <div className="mt-3 pt-3 border-t border-stone-300 flex items-center justify-between text-xs">
                                <div>
                                  <span className="text-[10px] uppercase text-stone-600 block font-semibold">Wholesale Rate</span>
                                  <span className="font-serif font-bold text-charcoal">{prod.priceRange || `$${prod.basePrice}/KG`}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[10px] uppercase text-stone-600 block font-semibold">MOQ</span>
                                  <span className="font-semibold text-charcoal">{prod.moq}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-ivory/50 border-t border-stone-300 flex items-center justify-between gap-2">
                            <button
                              onClick={() => handleOpenProductModal(prod)}
                              data-testid={`cms-edit-product-${prod.id}`}
                              className="flex items-center gap-1.5 text-xs font-semibold text-charcoal bg-white border border-white/20 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-all flex-1 justify-center"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-charcoal" />
                              <span>Edit Details</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              data-testid={`cms-delete-product-${prod.id}`}
                              className="flex items-center gap-1 text-xs font-semibold text-charcoal bg-charcoal text-ivory border border-charcoal px-3 py-1.5 rounded-lg hover:bg-charcoal text-ivory transition-all"
                              title="Delete from catalog"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-PANEL 2: CARGO TELEMETRY & TRACKING CMS */}
                {cmsTab === "shipments" && (
                  <div className="space-y-6" data-testid="cms-shipments-panel">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-white/20">
                      <div>
                        <h2 className="font-serif text-xl font-bold text-charcoal">Live Cargo Shipment Telemetry</h2>
                        <p className="text-stone-600 text-xs mt-1">Manage active tracking numbers, container sensor readings, vessel ETA, and port milestones.</p>
                      </div>
                      <button
                        onClick={() => handleOpenShipmentModal(null)}
                        data-testid="cms-add-shipment-btn"
                        className="bg-champagne text-charcoal font-bold px-5 py-2.5 rounded-xl text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-md shadow-champagne/20"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create Shipment Record</span>
                      </button>
                    </div>

                    <div className="bg-white border border-stone-300 rounded-2xl overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-ivory text-[11px] uppercase tracking-wider text-stone-600">
                              <th className="text-left px-6 py-4 font-semibold">Tracking #</th>
                              <th className="text-left px-4 py-4 font-semibold">Status & Milestone</th>
                              <th className="text-left px-4 py-4 font-semibold">Vessel</th>
                              <th className="text-left px-4 py-4 font-semibold">Route (Origin → Dest)</th>
                              <th className="text-left px-4 py-4 font-semibold">ETA</th>
                              <th className="text-left px-4 py-4 font-semibold">Telemetry</th>
                              <th className="text-right px-6 py-4 font-semibold">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(siteShipments).map(([code, s]) => (
                              <tr key={code} className="border-t border-stone-300 hover:bg-ivory/50 transition-colors" data-testid={`cms-shipment-row-${code}`}>
                                <td className="px-6 py-4 font-mono font-bold text-charcoal text-xs">
                                  {code}
                                </td>
                                <td className="px-4 py-4">
                                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-charcoal border border-white/20">
                                    {s.status}
                                  </span>
                                </td>
                                <td className="px-4 py-4 text-xs font-semibold text-charcoal">{s.vessel}</td>
                                <td className="px-4 py-4 text-xs text-stone-600">
                                  <div className="font-semibold text-charcoal">{s.origin}</div>
                                  <div className="text-[11px] text-stone-600">→ {s.destination}</div>
                                </td>
                                <td className="px-4 py-4 text-xs font-bold text-charcoal">{s.eta}</td>
                                <td className="px-4 py-4 text-xs font-mono text-stone-600">
                                  <div>🌡️ {s.temperature}</div>
                                  <div>💧 {s.humidity}</div>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                  <button
                                    onClick={() => {
                                      setTrackingNumberInput(code);
                                      handleTrackShipment(code);
                                      setActiveTab("tracking");
                                    }}
                                    data-testid={`cms-test-track-${code}`}
                                    className="text-xs font-semibold text-charcoal bg-ivory border border-stone-300 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-all"
                                  >
                                    Test Tracker
                                  </button>
                                  <button
                                    onClick={() => handleOpenShipmentModal({ trackingNumber: code, ...s })}
                                    data-testid={`cms-edit-shipment-${code}`}
                                    className="text-xs font-semibold text-charcoal bg-white border border-white/20 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-all"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteShipment(code)}
                                    data-testid={`cms-delete-shipment-${code}`}
                                    className="text-xs font-semibold text-charcoal bg-charcoal text-ivory border border-charcoal px-2.5 py-1.5 rounded-lg hover:bg-charcoal text-ivory transition-all"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-PANEL 3: ESTATE & OPERATIONAL KPIS CMS */}
                {cmsTab === "estate" && (
                  <div className="bg-white border border-white/20 rounded-3xl p-8 shadow-xl max-w-4xl mx-auto" data-testid="cms-estate-panel">
                    <div className="mb-6 border-b border-stone-300 pb-4">
                      <h2 className="font-serif text-2xl font-bold text-charcoal">Estate Operational KPIs & Capacity</h2>
                      <p className="text-stone-600 text-xs mt-1">Update garden acreage, factory footprint, certified organic purity %, and export capacity metrics displayed across the site.</p>
                    </div>

                    <form onSubmit={handleSaveEstate} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Plantation Garden Area</label>
                        <input
                          type="text"
                          value={estateForm.bighaArea}
                          onChange={(e) => setEstateForm({ ...estateForm, bighaArea: e.target.value })}
                          data-testid="cms-estate-bigha"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. 1,200 Bigha"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Processing Factory Area</label>
                        <input
                          type="text"
                          value={estateForm.factorySqFt}
                          onChange={(e) => setEstateForm({ ...estateForm, factorySqFt: e.target.value })}
                          data-testid="cms-estate-factory"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. 72,000 Sq Ft"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Organic Purity Certification</label>
                        <input
                          type="text"
                          value={estateForm.organicPurity}
                          onChange={(e) => setEstateForm({ ...estateForm, organicPurity: e.target.value })}
                          data-testid="cms-estate-purity"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. 100% Organic"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Primary Dispatch Ocean Port</label>
                        <input
                          type="text"
                          value={estateForm.dispatchPort}
                          onChange={(e) => setEstateForm({ ...estateForm, dispatchPort: e.target.value })}
                          data-testid="cms-estate-port"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. Kolkata Port"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Active Export Destination Countries</label>
                        <input
                          type="number"
                          value={estateForm.exportCountriesCount}
                          onChange={(e) => setEstateForm({ ...estateForm, exportCountriesCount: Number(e.target.value) })}
                          data-testid="cms-estate-countries"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. 45"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Annual Orthodox Production (MT)</label>
                        <input
                          type="number"
                          value={estateForm.annualProductionMt}
                          onChange={(e) => setEstateForm({ ...estateForm, annualProductionMt: Number(e.target.value) })}
                          data-testid="cms-estate-production"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. 850"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2 pt-4">
                        <button
                          type="submit"
                          data-testid="cms-save-estate-btn"
                          className="w-full bg-gradient-to-r from-champagne to-champagne text-charcoal font-bold py-3.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-champagne/20"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Estate KPIs Live</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* SUB-PANEL 4: LIVE BANNER TICKER ALERT CMS */}
                {cmsTab === "announcement" && (
                  <div className="bg-white border border-white/20 rounded-3xl p-8 shadow-xl max-w-3xl mx-auto" data-testid="cms-announcement-panel">
                    <div className="mb-6 border-b border-stone-300 pb-4 flex items-center justify-between">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-charcoal">Website Header Announcement Ticker</h2>
                        <p className="text-stone-600 text-xs mt-1">Publish live notices, auction alerts, or harvest season updates at the top of every page on the website.</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${announcementForm.enabled ? "bg-stone-100 text-charcoal" : "bg-stone-100 text-charcoal"}`}>
                        {announcementForm.enabled ? "Live Banner Active" : "Banner Hidden"}
                      </span>
                    </div>

                    <form onSubmit={handleSaveAnnouncement} className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-ivory border border-white/20 rounded-2xl">
                        <div>
                          <div className="font-bold text-sm text-charcoal">Display Announcement Ticker</div>
                          <div className="text-xs text-stone-600">Toggle whether this notice is visible on the live site.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={announcementForm.enabled}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, enabled: e.target.checked })}
                          data-testid="cms-announcement-toggle"
                          className="w-5 h-5 accent-champagne cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Badge Category</label>
                          <input
                            type="text"
                            value={announcementForm.badge}
                            onChange={(e) => setAnnouncementForm({ ...announcementForm, badge: e.target.value })}
                            data-testid="cms-announcement-badge"
                            className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                            placeholder="e.g. 2026 Spring Harvest"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Action Button Label</label>
                          <input
                            type="text"
                            value={announcementForm.linkText}
                            onChange={(e) => setAnnouncementForm({ ...announcementForm, linkText: e.target.value })}
                            data-testid="cms-announcement-linktext"
                            className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                            placeholder="e.g. Request Allocation"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-700 font-semibold mb-2">Notice Message Text</label>
                        <textarea
                          rows={3}
                          value={announcementForm.message}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                          data-testid="cms-announcement-message"
                          className="w-full bg-ivory border border-stone-300 rounded-xl p-4 text-sm text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. First-Flush Golden Tips plucking commenced at Kharsang Estate — Reserve direct allocations."
                          required
                        />
                      </div>

                      {/* LIVE PREVIEW BOX */}
                      <div className="p-4 bg-charcoal border border-white/20 rounded-2xl">
                        <div className="text-[10px] uppercase font-bold text-charcoal tracking-wider mb-2">Live Ticker Preview</div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-600">
                          <div className="flex items-center gap-2">
                            <span className="bg-champagne text-charcoal text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                              {announcementForm.badge || "ESTATE UPDATE"}
                            </span>
                            <span className="font-medium text-stone-600">{announcementForm.message || "Your announcement message here..."}</span>
                          </div>
                          {announcementForm.linkText && (
                            <span className="text-charcoal font-bold underline text-xs whitespace-nowrap">{announcementForm.linkText} &rarr;</span>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        data-testid="cms-save-announcement-btn"
                        className="w-full bg-gradient-to-r from-champagne to-champagne text-charcoal font-bold py-3.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-champagne/20"
                      >
                        <Save className="w-4 h-4" />
                        <span>Publish Ticker Banner Live</span>
                      </button>
                    </form>
                  </div>
                )}

                {/* SUB-PANEL 5: COMPLIANCE & QUALITY LICENSES CMS */}
                {cmsTab === "certificates" && (
                  <div className="space-y-6" data-testid="cms-certificates-panel">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-white/20">
                      <div>
                        <h2 className="font-serif text-xl font-bold text-charcoal">Quality Certifications & Export Licenses Manager</h2>
                        <p className="text-stone-600 text-xs mt-1">Manage food safety standards, organic accreditations, and regulatory export certificates shown in the trust ribbon.</p>
                      </div>
                      <button
                        onClick={() => handleOpenCertModal(null)}
                        data-testid="cms-add-cert-btn"
                        className="bg-champagne text-charcoal font-bold px-5 py-2.5 rounded-xl text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-md shadow-champagne/20"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Certificate</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {siteCertificates.map((c) => (
                        <div key={c.id} className="bg-white border border-white/20 p-6 rounded-2xl relative group hover:border-amber-800/20 transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="bg-ivory text-charcoal text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                                {c.category}
                              </span>
                              <span className="bg-stone-100 text-charcoal border border-stone-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> {c.status}
                              </span>
                            </div>

                            <h3 className="font-serif font-bold text-lg text-charcoal">{c.title}</h3>
                            <p className="text-xs text-stone-600 mt-1">Issuing Body: <strong className="text-charcoal">{c.body}</strong></p>
                            <p className="text-xs text-stone-600 mt-0.5">Validity Period: <strong className="text-charcoal">{c.validity}</strong></p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-stone-300 flex justify-end gap-2">
                            <button
                              onClick={() => handleOpenCertModal(c)}
                              data-testid={`cms-edit-cert-${c.id}`}
                              className="text-xs font-semibold text-charcoal bg-ivory border border-stone-300 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCert(c.id)}
                              data-testid={`cms-delete-cert-${c.id}`}
                              className="text-xs font-semibold text-charcoal bg-charcoal text-ivory border border-charcoal px-3 py-1.5 rounded-lg hover:bg-charcoal text-ivory transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-PANEL 6: CMS ACTIVITY AUDIT LOG */}
                {cmsTab === "audit" && (
                  <div className="bg-white border border-white/20 rounded-3xl p-8 shadow-xl" data-testid="cms-audit-panel">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-stone-300 pb-4">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-charcoal">CMS Change & Audit History</h2>
                        <p className="text-stone-600 text-xs mt-1">Immutable audit trail of catalog price changes, cargo updates, certificate edits, and backup restorations.</p>
                      </div>
                      <div className="w-full sm:w-auto flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Search audit trail..."
                          value={auditSearch}
                          onChange={(e) => setAuditSearch(e.target.value)}
                          data-testid="cms-audit-search"
                          className="bg-ivory border border-stone-300 text-xs rounded-xl px-3 py-2 w-full sm:w-64 focus:outline-none focus:border-amber-800/20"
                        />
                        <button
                          onClick={fetchAuditLog}
                          data-testid="cms-audit-refresh"
                          className="bg-white border border-white/20 text-xs font-bold text-charcoal px-3 py-2 rounded-xl hover:bg-ivory transition-all"
                        >
                          Refresh
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto border border-stone-300 rounded-2xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-ivory border-b border-stone-300 text-charcoal uppercase tracking-wider font-bold text-[10px]">
                          <tr>
                            <th className="p-3.5">Log ID</th>
                            <th className="p-3.5">Timestamp</th>
                            <th className="p-3.5">Action</th>
                            <th className="p-3.5">Details</th>
                            <th className="p-3.5">User</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-charcoal">
                          {siteAuditLog
                            .filter(l => !auditSearch || (l.action + l.details + l.id).toLowerCase().includes(auditSearch.toLowerCase()))
                            .map((log) => (
                              <tr key={log.id} className="hover:bg-stone-100 transition-colors">
                                <td className="p-3.5 font-mono font-bold text-charcoal">{log.id}</td>
                                <td className="p-3.5 text-stone-600 whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                                <td className="p-3.5">
                                  <span className="bg-charcoal text-amber-50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">
                                    {log.action}
                                  </span>
                                </td>
                                <td className="p-3.5 font-medium text-charcoal">{log.details}</td>
                                <td className="p-3.5 font-bold text-stone-600">{log.user || "Admin"}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SUB-PANEL 7: JSON BACKUP & RESTORE CMS */}
                {cmsTab === "backup" && (
                  <div className="bg-white border border-white/20 rounded-3xl p-8 shadow-xl max-w-4xl mx-auto" data-testid="cms-backup-panel">
                    <div className="mb-6 border-b border-stone-300 pb-4">
                      <h2 className="font-serif text-2xl font-bold text-charcoal">Site Data Backup & Instant Restore</h2>
                      <p className="text-stone-600 text-xs mt-1">Export full snapshot of website catalog, cargo tracking, estate metrics, and certificates as a portable JSON report.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* EXPORT SECTION */}
                      <div className="bg-ivory border border-white/20 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-stone-800 mb-4">
                            <Download className="w-5 h-5" />
                          </div>
                          <h3 className="font-serif font-bold text-lg text-charcoal">Export Complete CMS Backup</h3>
                          <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                            Generates a complete JSON backup file containing all active tea products, wholesale prices, cargo telemetry records, estate metrics, and certificates.
                          </p>
                        </div>
                        <button
                          onClick={handleExportBackup}
                          data-testid="cms-export-backup-btn"
                          className="mt-6 w-full bg-charcoal text-amber-50 font-bold py-3 rounded-xl hover:bg-charcoal transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Backup JSON</span>
                        </button>
                      </div>

                      {/* IMPORT / RESTORE SECTION */}
                      <div className="bg-ivory border border-white/20 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-stone-800 mb-4">
                            <Upload className="w-5 h-5" />
                          </div>
                          <h3 className="font-serif font-bold text-lg text-charcoal">Restore Data from JSON</h3>
                          <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                            Paste a previously exported JSON backup bundle below to restore all website content instantly.
                          </p>
                        </div>

                        <div className="mt-4">
                          <textarea
                            rows={4}
                            value={jsonBackupInput}
                            onChange={(e) => setJsonBackupInput(e.target.value)}
                            data-testid="cms-backup-json-textarea"
                            placeholder="Paste backup JSON data here..."
                            className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs font-mono text-charcoal focus:outline-none focus:border-amber-800/20"
                          />
                          <button
                            onClick={handleImportBackup}
                            data-testid="cms-import-backup-btn"
                            className="mt-3 w-full bg-gradient-to-r from-champagne to-champagne text-charcoal font-bold py-3 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Restore Backup Live</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-PANEL 8: ENQUIRIES & BUYER RFQS */}
                {cmsTab === "enquiries" && (
                  <div className="space-y-6" data-testid="cms-enquiries-panel">
                    {/* SUMMARY STATS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white border border-white/20 p-5 rounded-2xl">
                        <div className="text-[11px] text-stone-600 uppercase tracking-wider font-semibold">Total RFQs Received</div>
                        <div className="font-serif text-3xl font-bold text-charcoal mt-1">{enquiryCounts.total}</div>
                      </div>
                      <div className="bg-white border border-white/20 p-5 rounded-2xl">
                        <div className="text-[11px] text-stone-600 uppercase tracking-wider font-semibold">High-Value (≥1,000 kg)</div>
                        <div className="font-serif text-3xl font-bold text-charcoal mt-1">{enquiryCounts.highValue}</div>
                      </div>
                      <div className="bg-white border border-white/20 p-5 rounded-2xl">
                        <div className="text-[11px] text-stone-600 uppercase tracking-wider font-semibold">Pipeline Volume (KG)</div>
                        <div className="font-serif text-3xl font-bold text-charcoal mt-1">{(enquiryCounts.totalKgPipeline || 0).toLocaleString()}</div>
                      </div>
                      <div className="bg-white border border-white/20 p-5 rounded-2xl">
                        <div className="text-[11px] text-stone-600 uppercase tracking-wider font-semibold">Filtered Count</div>
                        <div className="font-serif text-3xl font-bold text-charcoal mt-1">{enquiryCounts.matching}</div>
                      </div>
                    </div>

                    {/* FILTERS */}
                    <div className="bg-white border border-stone-300 rounded-2xl p-5 flex flex-wrap gap-4 items-end shadow-sm">
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1.5">Search Keywords</label>
                        <input
                          type="text"
                          placeholder="Company, buyer, email, ref ID"
                          value={enqFilter.search}
                          onChange={(e) => setEnqFilter({ ...enqFilter, search: e.target.value })}
                          data-testid="admin-filter-search"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-4 py-2 text-xs text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                        />
                      </div>
                      <div className="min-w-[160px]">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1.5">Country</label>
                        <select
                          value={enqFilter.country}
                          onChange={(e) => setEnqFilter({ ...enqFilter, country: e.target.value })}
                          data-testid="admin-filter-country"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        >
                          {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="min-w-[180px]">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1.5">Tea Grade</label>
                        <select
                          value={enqFilter.teaGrade}
                          onChange={(e) => setEnqFilter({ ...enqFilter, teaGrade: e.target.value })}
                          data-testid="admin-filter-grade"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        >
                          {uniqueGrades.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div className="min-w-[120px]">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1.5">Min KG</label>
                        <input
                          type="number"
                          min="0"
                          step="100"
                          placeholder="0"
                          value={enqFilter.minKg}
                          onChange={(e) => setEnqFilter({ ...enqFilter, minKg: e.target.value })}
                          data-testid="admin-filter-minkg"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal placeholder-lightgrey focus:outline-none focus:border-amber-800/20"
                        />
                      </div>
                      <button
                        onClick={() => fetchEnquiries()}
                        data-testid="admin-apply-filters"
                        className="bg-champagne text-charcoal font-bold px-5 py-2 rounded-xl text-xs hover:brightness-110 transition-all"
                      >
                        Apply Filters
                      </button>
                    </div>

                    {/* ENQUIRIES TABLE */}
                    <div className="bg-white border border-stone-300 rounded-2xl overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-ivory text-[11px] uppercase tracking-wider text-stone-600">
                              <th className="text-left px-6 py-4 font-semibold">Reference</th>
                              <th className="text-left px-4 py-4 font-semibold">Received</th>
                              <th className="text-left px-4 py-4 font-semibold">Buyer & Company</th>
                              <th className="text-left px-4 py-4 font-semibold">Destination</th>
                              <th className="text-left px-4 py-4 font-semibold">Grade & Qty</th>
                              <th className="text-left px-4 py-4 font-semibold">Status</th>
                              <th className="text-right px-6 py-4 font-semibold">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {enquiries.length === 0 ? (
                              <tr><td colSpan="7" className="text-center py-16 text-stone-600">No enquiries match your current filters.</td></tr>
                            ) : enquiries.map((enq) => (
                              <tr key={enq.id} className="border-t border-stone-300 hover:bg-ivory/50 transition-colors" data-testid={`enq-row-${enq.referenceId}`}>
                                <td className="px-6 py-4">
                                  <div className="font-mono text-xs text-charcoal font-semibold">{enq.referenceId}</div>
                                  {enq.isHighValue && <span className="inline-block mt-1 text-[9px] uppercase tracking-wider bg-champagne text-charcoal font-bold px-2 py-0.5 rounded">High Value</span>}
                                </td>
                                <td className="px-4 py-4 text-xs text-stone-600">
                                  {new Date(enq.createdAt).toLocaleString(undefined, { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                                </td>
                                <td className="px-4 py-4">
                                  <div className="font-semibold text-charcoal text-xs">{enq.fullName}</div>
                                  <div className="text-xs text-stone-600">{enq.companyName}</div>
                                  <a href={`mailto:${enq.email}`} className="text-xs text-charcoal hover:underline font-mono">{enq.email}</a>
                                </td>
                                <td className="px-4 py-4 text-xs text-charcoal">
                                  <div className="font-semibold">{enq.country}</div>
                                  <div className="text-[11px] text-stone-600">{enq.targetPort}</div>
                                </td>
                                <td className="px-4 py-4 text-xs text-charcoal">
                                  <div className="font-semibold">{enq.teaGrade}</div>
                                  <div className="font-serif font-bold text-charcoal text-sm">{enq.quantityKg.toLocaleString()} KG</div>
                                </td>
                                <td className="px-4 py-4">
                                  <select
                                    value={enq.status || "New"}
                                    onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                                    data-testid={`enq-status-${enq.referenceId}`}
                                    className="bg-ivory border border-stone-300 rounded-lg px-2.5 py-1 text-xs text-charcoal font-semibold focus:outline-none focus:border-amber-800/20"
                                  >
                                    <option value="New">New RFQ</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Proforma Issued">Proforma Issued</option>
                                    <option value="Approved">Approved / Contract</option>
                                    <option value="Closed">Closed</option>
                                  </select>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                  <a
                                    href={`mailto:${enq.email}?subject=Re:%20Atweel%20Tea%20Quotation%20Ref%20${enq.referenceId}`}
                                    data-testid={`reply-${enq.referenceId}`}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal bg-champagne px-3 py-1.5 rounded-lg hover:brightness-110 transition-all"
                                  >
                                    <Mail className="w-3.5 h-3.5" />
                                    Reply
                                  </a>
                                  <button
                                    onClick={() => handleDeleteEnquiry(enq.id)}
                                    data-testid={`delete-enq-${enq.referenceId}`}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal bg-charcoal text-ivory border border-charcoal px-2 py-1.5 rounded-lg hover:bg-charcoal text-ivory transition-all"
                                    title="Delete enquiry"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* PRODUCT ADD/EDIT MODAL OVERLAY */}
            {productModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" data-testid="product-modal">
                <div className="bg-white border border-white/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8">
                  <button
                    onClick={() => setProductModalOpen(false)}
                    className="absolute top-5 right-5 text-stone-600 hover:text-stone-600"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    {editingProduct ? `Edit Tea Grade #${editingProduct.id}` : "Add New Tea Grade to Catalog"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Updates will immediately reflect across the Tea Catalog, Wholesale Price Calculator, and Sample Inquiry forms.
                  </p>

                  <form onSubmit={handleSaveProduct} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Tea Name *</label>
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          data-testid="modal-prod-name"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. Kharsang White Peony"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Tea Grade Code *</label>
                        <input
                          type="text"
                          required
                          value={productForm.grade}
                          onChange={(e) => setProductForm({ ...productForm, grade: e.target.value })}
                          data-testid="modal-prod-grade"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. SFTGFOP1 Orthodox"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Base Price ($/KG) *</label>
                        <input
                          type="number"
                          step="0.5"
                          required
                          value={productForm.basePrice}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setProductForm({
                              ...productForm,
                              basePrice: val,
                              priceRange: `$${val.toFixed(2)} - $${(val * 1.45).toFixed(2)} / KG`
                            });
                          }}
                          data-testid="modal-prod-price"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Minimum Order Quantity (MOQ) *</label>
                        <input
                          type="text"
                          required
                          value={productForm.moq}
                          onChange={(e) => setProductForm({ ...productForm, moq: e.target.value })}
                          data-testid="modal-prod-moq"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. 100 KG"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Origin / Estate</label>
                        <input
                          type="text"
                          value={productForm.origin}
                          onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                          data-testid="modal-prod-origin"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Certifications (comma separated)</label>
                        <input
                          type="text"
                          value={productForm.certificationsStr}
                          onChange={(e) => setProductForm({ ...productForm, certificationsStr: e.target.value })}
                          data-testid="modal-prod-certs"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="ISO 22000, HACCP, USDA Organic, India Organic (NPOP)"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Cup Profile / Flavor Notes</label>
                        <input
                          type="text"
                          value={productForm.flavor}
                          onChange={(e) => setProductForm({ ...productForm, flavor: e.target.value })}
                          data-testid="modal-prod-flavor"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. Muscatel honey notes, golden liquor with a smooth finish"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Product Photo URL</label>
                        <input
                          type="url"
                          value={productForm.image}
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          data-testid="modal-prod-image"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          data-testid="modal-prod-desc"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="inStockCheck"
                          checked={productForm.inStock}
                          onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                          data-testid="modal-prod-stock"
                          className="w-4 h-4 text-stone-800 focus:ring-champagne rounded"
                        />
                        <label htmlFor="inStockCheck" className="text-xs font-semibold text-charcoal">Available in Stock</label>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-300">
                      <button
                        type="button"
                        onClick={() => setProductModalOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-charcoal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        data-testid="modal-prod-save-btn"
                        className="bg-champagne text-charcoal font-bold px-6 py-2.5 rounded-xl text-xs hover:brightness-110 transition-all shadow-md shadow-champagne/20"
                      >
                        Save Product Live
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* SHIPMENT ADD/EDIT MODAL OVERLAY */}
            {shipmentModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" data-testid="shipment-modal">
                <div className="bg-white border border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative my-8">
                  <button
                    onClick={() => setShipmentModalOpen(false)}
                    className="absolute top-5 right-5 text-stone-600 hover:text-stone-600"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    Edit / Create Cargo Tracking Record
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Updates live vessel telemetry, ETA, container temperature, and humidity sensor readings.
                  </p>

                  <form onSubmit={handleSaveShipment} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Tracking Number *</label>
                        <input
                          type="text"
                          required
                          value={shipmentForm.trackingNumber}
                          onChange={(e) => setShipmentForm({ ...shipmentForm, trackingNumber: e.target.value })}
                          data-testid="modal-shipment-num"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal font-mono font-bold focus:outline-none focus:border-amber-800/20"
                          placeholder="EXP-8842-NL"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Vessel / Carrier *</label>
                        <input
                          type="text"
                          required
                          value={shipmentForm.vessel}
                          onChange={(e) => setShipmentForm({ ...shipmentForm, vessel: e.target.value })}
                          data-testid="modal-shipment-vessel"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="MV Kharsang Express"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Origin Port *</label>
                        <input
                          type="text"
                          required
                          value={shipmentForm.origin}
                          onChange={(e) => setShipmentForm({ ...shipmentForm, origin: e.target.value })}
                          data-testid="modal-shipment-origin"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Destination Port *</label>
                        <input
                          type="text"
                          required
                          value={shipmentForm.destination}
                          onChange={(e) => setShipmentForm({ ...shipmentForm, destination: e.target.value })}
                          data-testid="modal-shipment-dest"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Status Summary *</label>
                        <input
                          type="text"
                          required
                          value={shipmentForm.status}
                          onChange={(e) => setShipmentForm({ ...shipmentForm, status: e.target.value })}
                          data-testid="modal-shipment-status"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">ETA Date *</label>
                        <input
                          type="text"
                          required
                          value={shipmentForm.eta}
                          onChange={(e) => setShipmentForm({ ...shipmentForm, eta: e.target.value })}
                          data-testid="modal-shipment-eta"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Sensor Temp (°C)</label>
                        <input
                          type="text"
                          value={shipmentForm.temperature}
                          onChange={(e) => setShipmentForm({ ...shipmentForm, temperature: e.target.value })}
                          data-testid="modal-shipment-temp"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Sensor Humidity (% RH)</label>
                        <input
                          type="text"
                          value={shipmentForm.humidity}
                          onChange={(e) => setShipmentForm({ ...shipmentForm, humidity: e.target.value })}
                          data-testid="modal-shipment-humidity"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-300">
                      <button
                        type="button"
                        onClick={() => setShipmentModalOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-charcoal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        data-testid="modal-shipment-save-btn"
                        className="bg-champagne text-charcoal font-bold px-6 py-2.5 rounded-xl text-xs hover:brightness-110 transition-all shadow-md shadow-champagne/20"
                      >
                        Save Shipment Telemetry
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* COMPLIANCE CERTIFICATE ADD/EDIT MODAL OVERLAY */}
            {certModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" data-testid="cert-modal">
                <div className="bg-white border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8">
                  <button
                    onClick={() => setCertModalOpen(false)}
                    className="absolute top-5 right-5 text-stone-600 hover:text-charcoal text-lg font-bold"
                  >
                    ✕
                  </button>
                  <h3 className="font-serif text-2xl font-bold text-charcoal mb-1">
                    {editingCert ? "Edit Compliance Certificate" : "Add Factory Certificate / License"}
                  </h3>
                  <p className="text-stone-600 text-xs mb-6">Manage verified accreditations shown across client trust badges.</p>

                  <form onSubmit={handleSaveCert} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Certificate Title *</label>
                      <input
                        type="text"
                        required
                        value={certForm.title}
                        onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                        data-testid="modal-cert-title"
                        className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        placeholder="e.g. ISO 22000:2018 Food Safety Management"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Category</label>
                        <select
                          value={certForm.category}
                          onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                          data-testid="modal-cert-category"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        >
                          <option value="Quality Management">Quality Management</option>
                          <option value="Food Safety">Food Safety</option>
                          <option value="Organic Certification">Organic Certification</option>
                          <option value="Regulatory License">Regulatory License</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Issuing Auditor Body *</label>
                        <input
                          type="text"
                          required
                          value={certForm.body}
                          onChange={(e) => setCertForm({ ...certForm, body: e.target.value })}
                          data-testid="modal-cert-body"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. Bureau Veritas / SGS"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Validity Period</label>
                        <input
                          type="text"
                          value={certForm.validity}
                          onChange={(e) => setCertForm({ ...certForm, validity: e.target.value })}
                          data-testid="modal-cert-validity"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                          placeholder="e.g. Valid through Oct 2028"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-1">Status</label>
                        <select
                          value={certForm.status}
                          onChange={(e) => setCertForm({ ...certForm, status: e.target.value })}
                          data-testid="modal-cert-status"
                          className="w-full bg-ivory border border-stone-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-amber-800/20"
                        >
                          <option value="Verified & Active">Verified & Active</option>
                          <option value="Pending Renewal">Pending Renewal</option>
                          <option value="Under Review">Under Review</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-300">
                      <button
                        type="button"
                        onClick={() => setCertModalOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-charcoal"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        data-testid="modal-cert-save-btn"
                        className="bg-champagne text-charcoal font-bold px-6 py-2.5 rounded-xl text-xs hover:brightness-110 transition-all shadow-md shadow-champagne/20"
                      >
                        Save Certificate
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-ivory to-ivory border-t-2 border-white/20 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 pb-6 border-b border-stone-300/60">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/atweel-logo@4x.png"
                srcSet="/atweel-logo@4x.png 2x, /atweel-logo@3x.png 1.5x, /atweel-logo@2x.png 1x"
                onError={(e) => { e.currentTarget.src = "/atweel-official-logo.jpg"; }}
                alt="Atweel Tea — 100% Organic, Kharsang Arunachal"
                className="h-14 w-auto object-contain drop-shadow-[0_2px_6px_rgba(212,175,55,0.2)]"
                loading="lazy"
                decoding="async"
                data-testid="footer-logo-img"
              />
              <div className="border-l border-white/20 pl-3 leading-tight">
                <div className="font-serif font-bold text-sm text-charcoal tracking-wider uppercase">ATWEEL TEA</div>
                <div className="text-[10px] text-stone-600 tracking-wide mt-0.5">Product of Atweel Food &amp; Beverages Pvt Ltd</div>
              </div>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed max-w-sm">
              Single-estate organic tea grown, processed and exported directly from our 1,200-bigha garden in Kharsang, Arunachal Pradesh — under ISO 22000, HACCP, FSSAI, India Organic & USDA certifications.
            </p>
          </div>

          <div className="md:col-span-2 space-y-2">
            <h4 className="font-serif font-bold text-charcoal text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs text-stone-600 font-medium">
              <li><button onClick={() => setActiveTab("catalog")} className="hover:text-charcoal transition-colors">Product Catalog</button></li>
              <li><button onClick={() => setActiveTab("rfq")} className="hover:text-charcoal transition-colors">Custom RFQ</button></li>
              <li><button onClick={() => setActiveTab("tracker")} className="hover:text-charcoal transition-colors">Cargo Tracker</button></li>
              <li><button onClick={() => setActiveTab("standards")} className="hover:text-charcoal transition-colors">Factory & Lab</button></li>
              <li><button onClick={() => setActiveTab("destinations")} className="hover:text-charcoal transition-colors">Export Reach</button></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="font-serif font-bold text-charcoal text-xs uppercase tracking-wider">Estate & Factory</h4>
            <ul className="space-y-1.5 text-xs text-stone-600 font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-600 mt-0.5 shrink-0" />
                <span>Nemphai 1, Kharsang, Arunachal Pradesh 792056, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                <span>1,200 Bigha Organic Tea Estate</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                <span>72,000 sq ft Integrated Factory</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="font-serif font-bold text-charcoal text-xs uppercase tracking-wider">Contact & Export Desk</h4>
            <div className="flex items-center gap-2">
              <a href="mailto:atweeltea@gmail.com" className="text-xs font-semibold text-charcoal hover:text-charcoal transition-colors flex items-center gap-2" data-testid="footer-email">
                <Mail className="w-3.5 h-3.5" />
                <span>atweeltea@gmail.com</span>
              </a>
              <button
                type="button"
                onClick={(e) => handleCopyEmail(e, "atweeltea@gmail.com")}
                data-testid="footer-copy-email-btn"
                className="p-1 px-1.5 rounded bg-amber-50 hover:bg-amber-100 text-stone-800 transition-colors flex items-center gap-1 text-[10px] font-mono cursor-pointer"
                title="Copy company email"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-stone-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <a href="https://www.atweeltea.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-charcoal hover:text-charcoal transition-colors flex items-center gap-2" data-testid="footer-website">
              <Globe className="w-3.5 h-3.5" />
              <span>www.atweeltea.com</span>
            </a>
            <p className="text-[11px] text-stone-600 pt-1.5 border-t border-stone-300/80 mt-2">
              Atweel Food & Beverages Pvt. Ltd. · FSSAI & CIN available on request
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all" aria-label="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-charcoal hover:text-white hover:border-charcoal transition-all" aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600">
          <p>© 2026 Atweel Food & Beverages Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0 font-medium text-[10px] uppercase tracking-wider text-charcoal">
            <span>ISO 22000</span>
            <span>·</span>
            <span>HACCP</span>
            <span>·</span>
            <span>India Organic</span>
            <span>·</span>
            <span>USDA</span>
            <span>·</span>
            <span>FSSAI</span>
          </div>
        </div>
      </footer>

      {/* COMPLIANCE VERIFY MODAL — audit passport for each certification */}
      {verifyCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setVerifyCert(null)}
          data-testid="verify-modal-backdrop"
        >
          <div className="absolute inset-0 bg-charcoal/75 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border-2 border-white/20 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            data-testid="verify-modal"
            role="dialog"
            aria-labelledby="verify-modal-title"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-50 blur-3xl" />
              <button
                onClick={() => setVerifyCert(null)}
                data-testid="verify-modal-close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-start gap-4 relative">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-white/20 flex items-center justify-center text-stone-600 shrink-0">
                  <Award className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-stone-800 font-semibold">Audit Passport · Verified</div>
                  <h3 id="verify-modal-title" className="font-serif text-2xl font-bold text-white mt-1 leading-tight">{verifyCert.fullName}</h3>
                  <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-0.5 rounded-full bg-stone-100/15 border border-stone-300/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-100 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-stone-600">Active &amp; In Good Standing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-ivory rounded-xl p-4 border border-white/20">
                  <div className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold">Certificate ID</div>
                  <div className="font-mono text-sm text-charcoal font-bold mt-1 break-all">{verifyCert.certId}</div>
                </div>
                <div className="bg-ivory rounded-xl p-4 border border-white/20">
                  <div className="text-[10px] uppercase tracking-wider text-stone-700 font-semibold">Valid Until</div>
                  <div className="font-serif text-sm text-charcoal font-bold mt-1">{verifyCert.validUntil}</div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 pb-3 border-b border-stone-300">
                  <Building className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-stone-600 font-semibold">Issuing Body</div>
                    <div className="text-charcoal font-medium mt-0.5">{verifyCert.issuer}</div>
                    <div className="text-xs text-stone-600 mt-0.5">{verifyCert.issuerCountry}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-stone-300">
                  <Clock className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-stone-600 font-semibold">Date Issued</div>
                    <div className="text-charcoal font-medium mt-0.5">{verifyCert.issued}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-stone-300">
                  <Search className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-stone-600 font-semibold">Scope of Certification</div>
                    <div className="text-charcoal mt-1 leading-relaxed text-[13px]">{verifyCert.scope}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-stone-600 font-semibold">Accreditation Backing</div>
                    <div className="text-charcoal mt-1 leading-relaxed text-[13px]">{verifyCert.accreditation}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-300 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`mailto:atweeltea@gmail.com?subject=Certificate%20Verification%20Request%20-%20${encodeURIComponent(verifyCert.label)}&body=Dear%20Atweel%20Export%20Team,%0A%0APlease%20share%20a%20digitally%20signed%20copy%20of%20the%20${encodeURIComponent(verifyCert.label)}%20certificate%20(ID:%20${encodeURIComponent(verifyCert.certId)})%20for%20our%20audit%20file.%0A%0AThank%20you.`}
                  data-testid="verify-modal-request-copy"
                  className="flex-1 w-full sm:w-auto text-center bg-gradient-to-r from-champagne to-champagne text-charcoal font-bold px-6 py-3 rounded-full hover:brightness-110 transition-all text-sm"
                >
                  Request Signed Copy
                </a>
                <a
                  href="/atweel-sop.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="verify-modal-view-sop"
                  className="flex-1 w-full sm:w-auto text-center border-2 border-white/20 hover:border-amber-800/20 text-charcoal px-6 py-3 rounded-full font-semibold text-sm transition-all"
                >
                  Read Global SOP
                </a>
              </div>

              <div className="text-[10px] text-stone-600 text-center pt-2 italic">
                Displayed data is a public summary. Full digitally-signed certificate PDFs are dispatched on written request.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR TEA GALLERY IMAGES */}
      {selectedImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-md animate-fadeIn"
          data-testid="tea-image-lightbox-modal"
          onClick={() => setSelectedImageModal(null)}
        >
          <div
            className="bg-emerald-950 border-2 border-emerald-800/50 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImageModal(null)}
              data-testid="close-tea-image-modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-charcoal/80 hover:bg-charcoal text-amber-50 border border-white/20 flex items-center justify-center transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <div className="md:col-span-7 aspect-[4/3] md:aspect-auto bg-black relative flex items-center justify-center">
                <img
                  src={selectedImageModal.image}
                  alt={selectedImageModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-sm px-3 py-1 rounded-md text-[10px] uppercase font-bold text-amber-50 border border-white/20">
                  {selectedImageModal.badge}
                </div>
              </div>

              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-stone-800 font-semibold">{selectedImageModal.category}</span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">{selectedImageModal.title}</h3>
                  <div className="w-10 h-0.5 bg-champagne rounded-full my-3" />
                  <p className="text-stone-600 text-sm leading-relaxed">{selectedImageModal.desc}</p>

                  <div className="mt-6 p-3.5 rounded-xl bg-charcoal border border-white/20">
                    <span className="text-[10px] uppercase text-stone-600 font-bold block mb-1">Technical Specification</span>
                    <span className="text-xs text-stone-800 font-mono leading-relaxed block">{selectedImageModal.spec}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/20">
                  <button
                    onClick={() => {
                      setRfqForm(prev => ({ ...prev, teaGrade: selectedImageModal.title }));
                      setSelectedImageModal(null);
                      setActiveTab("rfq");
                    }}
                    data-testid="modal-request-sample-btn"
                    className="w-full bg-gradient-to-r from-champagne to-champagne hover:brightness-110 text-charcoal font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Request Export Sample</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImageModal(null)}
                    className="w-full border border-charcoal hover:border-stone-300 text-stone-600 hover:text-white py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* LEAD QUALIFICATION MODAL */}
      <LeadQualificationForm isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />

      {/* FLOATING REQUEST SAMPLE BUTTON & MODAL */}
      <SampleRequestModal />

      {/* LUXURY COMPLIANCE FOOTER */}
      </Suspense>
    </div>
  );
}
