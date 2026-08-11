import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, Award, CheckCircle2, FileText, ChevronLeft, ChevronRight, 
  Download, ExternalLink, Copy, Check, Info, Sparkles, Globe, Leaf, 
  Building, Lock, Pause, Play, RefreshCw, Eye, X, CheckSquare
} from "lucide-react";

export const CERTIFICATION_ITEMS = [
  {
    id: "npop",
    key: "india-organic",
    badge: "NPOP Organic",
    shortName: "NPOP (India Organic)",
    fullName: "National Programme for Organic Production — NPOP",
    certId: "IN-ORG-021 / NPOP-AP-1122",
    issuer: "IndoCert (Accredited by APEDA, Ministry of Commerce, Govt. of India)",
    issuerCountry: "India",
    issued: "22 Jun 2024",
    validUntil: "21 Jun 2027",
    category: "Organic",
    scope: "100% Organic cultivation, processing, handling, and export certification for the 1,200-bigha Atweel Tea estate at Kharsang, Arunachal Pradesh.",
    accreditation: "APEDA Accredited · Equivalent to Swiss Organic Regulations & Canadian Organic Regime (COR)",
    auditSummary: "Annual physical soil, leaf tissue, and water audit passed with 0.00 ppm synthetic chemical residue across all 12 plantation blocks.",
    highlights: [
      "1,200 Bigha Certified Organic Soil",
      "Zero Synthetic Pesticides / Fertilizers",
      "Full Traceability to Kharsang Factory Lot",
      "APEDA Mutual Recognition for Exports"
    ],
    badgeColor: "from-charcoal to-charcoal",
    accentColor: "#10B981"
  },
  {
    id: "usda-organic",
    key: "usda-organic",
    badge: "USDA Organic",
    shortName: "USDA Organic (NOP)",
    fullName: "USDA Organic — National Organic Program (7 CFR Part 205)",
    certId: "NOP-1082-USA",
    issuer: "OneCert International Pvt. Ltd. (USDA Accredited Certifying Agent)",
    issuerCountry: "USA / India",
    issued: "30 Aug 2024",
    validUntil: "29 Aug 2027",
    category: "Organic",
    scope: "Compliance with United States Department of Agriculture NOP standards for growing, processing, blending, and ocean bulk container export to North America.",
    accreditation: "USDA-Accredited Certifying Agent (ACA)",
    auditSummary: "100% Organic NOP compliant handling protocol verified from tea bush plucking to inert vacuum aluminum foil sea-chest seal.",
    highlights: [
      "US FDA & USDA Export Compliant",
      "Inert Gas Vacuum Foil Bag Packaging",
      "No Chemical Processing Agents",
      "US Customs Direct Clearance Eligible"
    ],
    badgeColor: "from-charcoal to-charcoal",
    accentColor: "#D4AF37"
  },
  {
    id: "fssai",
    key: "fssai-export",
    badge: "FSSAI Export",
    shortName: "FSSAI Central Export License",
    fullName: "Food Safety & Standards Authority of India (Central Export)",
    certId: "Lic No. 10023083000182",
    issuer: "Food Safety & Standards Authority of India (Ministry of Health & Family Welfare)",
    issuerCountry: "India",
    issued: "14 Jan 2024",
    validUntil: "13 Jan 2029",
    category: "Regulatory",
    scope: "Central License for Manufacturing, Processing, Blending, Packaging, and 100% Export Operations of Black, Green, White, and CTC Teas.",
    accreditation: "Govt. of India Apex Food Authority",
    auditSummary: "Category 14.1.5 (Tea & Herbal Infusions) sanitary hygiene audit passed with maximum Grade A rating for factory cleanliness.",
    highlights: [
      "Central Manufacturing & Export License",
      "100% Statutory Compliance in India",
      "Full Batch Traceability & QR Logging",
      "Approved for Global Maritime Dispatches"
    ],
    badgeColor: "from-charcoal to-charcoal",
    accentColor: "#38BDF8"
  },
  {
    id: "haccp",
    key: "haccp",
    badge: "HACCP Certified",
    shortName: "HACCP Codex Alimentarius",
    fullName: "HACCP — Hazard Analysis Critical Control Point Protocol",
    certId: "HACCP-IN-4482",
    issuer: "Bureau Veritas India Pvt. Ltd. / Bureau Veritas Quality International",
    issuerCountry: "France / India",
    issued: "03 Sep 2024",
    validUntil: "02 Sep 2027",
    category: "Food Safety",
    scope: "Comprehensive preventive food safety protocol covering green leaf intake, withering, CTC/Orthodox rolling, fermentation, drying, magnetic metal separation, and vacuum seal.",
    accreditation: "Codex Alimentarius Aligned · Recognized by US FDA & EU RASFF",
    auditSummary: "Zero Critical Control Point (CCP) deviations recorded in bi-annual independent audit of factory processing line.",
    highlights: [
      "Codex Alimentarius Global Standard",
      "Dual In-Line Rare-Earth Magnet Trap",
      "Automated Temperature Drying Monitors",
      "HACCP Qualified Processing Staff"
    ],
    badgeColor: "from-charcoal to-charcoal",
    accentColor: "#60A5FA"
  },
  {
    id: "iso-22000",
    key: "iso-22000",
    badge: "ISO 22000:2018",
    shortName: "ISO 22000:2018 FSMS",
    fullName: "ISO 22000:2018 — Food Safety Management System",
    certId: "IS-QF-98421 / ATWL-2024",
    issuer: "TÜV SÜD South Asia Pvt. Ltd.",
    issuerCountry: "Germany / India",
    issued: "16 Dec 2024",
    validUntil: "15 Dec 2027",
    category: "Food Safety",
    scope: "Farm-to-container manufacturing, blending, custom packing, and export of Orthodox, CTC, Green, White, and Oolong teas at Kharsang Factory.",
    accreditation: "Accredited by DAkkS (Germany) & NABCB (India)",
    auditSummary: "Full Prerequisite Program (PRP) and Operational PRP compliance for international food trade.",
    highlights: [
      "DAkkS Germany Accredited",
      "Farm-to-Container Security Control",
      "International Standard for Food Trade",
      "Third-Party Bi-Annual Surveillance"
    ],
    badgeColor: "from-charcoal to-charcoal",
    accentColor: "#34D399"
  },
  {
    id: "eu-organic",
    key: "eu-organic",
    badge: "EU Organic",
    shortName: "EU Organic (Reg 2018/848)",
    fullName: "EU Organic — European Union Regulation (EU) 2018/848",
    certId: "EU-ORG-9432 / CE-DE-BIO",
    issuer: "Ceres GmbH",
    issuerCountry: "Germany",
    issued: "12 Nov 2024",
    validUntil: "11 Nov 2027",
    category: "Organic",
    scope: "Organic production and processing compliance for duty-free entry into all 27 EU Member States and EFTA countries.",
    accreditation: "Notified by German Federal Office for Agriculture (BLE)",
    auditSummary: "Full EU MRL laboratory screen passed for all European customs entry requirements.",
    highlights: [
      "EU Reg (EU) 2018/848 Compliant",
      "German BLE Notified Auditor",
      "Duty-Free EU Customs Entry",
      "Multi-Residual Pesticide Free (< 0.01 mg/kg)"
    ],
    badgeColor: "from-charcoal to-charcoal",
    accentColor: "#38BDF8"
  },
  {
    id: "sgs-eurofins",
    key: "sgs-eurofins",
    badge: "SGS / Eurofins",
    shortName: "SGS & Eurofins Lab Verified",
    fullName: "SGS & Eurofins — Independent Pre-Shipment Lot Screening",
    certId: "Per-Lot Certificate (Latest: EF-2026-4482)",
    issuer: "SGS India Pvt. Ltd. · Eurofins Analytik GmbH",
    issuerCountry: "Switzerland / Germany",
    issued: "Rolling · Issued Per Batch",
    validUntil: "Batch Specific",
    category: "Lab Testing",
    scope: "Independent 3rd-party laboratory testing of every ocean container lot for 500+ pesticide active ingredients, heavy metals (Pb, As, Cd, Hg), and mycotoxins.",
    accreditation: "ISO/IEC 17025 Accredited Laboratories · Recognised by US FDA, EU, & Japan MHLW",
    auditSummary: "LC-MS/MS & GC-MS/MS multi-residue test reports attached directly to shipping bill documentation.",
    highlights: [
      "500+ Pesticide Residue Screen",
      "Heavy Metals & Micro-Toxin Clearance",
      "ISO/IEC 17025 Certified Testing",
      "Certificate of Analysis per Shipping Lot"
    ],
    badgeColor: "from-charcoal to-charcoal",
    accentColor: "#C084FC"
  }
];

export default function CertificationCarousel({ onNavigateTab }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCertId, setCopiedCertId] = useState(null);
  const [selectedCertModal, setSelectedCertModal] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Filter items based on active category
  const filteredItems = CERTIFICATION_ITEMS.filter(item => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  // Keep index in bounds when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Auto slide effect
  useEffect(() => {
    if (isPaused || filteredItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, filteredItems.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handleCopyCertId = (certId) => {
    navigator.clipboard.writeText(certId);
    setCopiedCertId(certId);
    setTimeout(() => setCopiedCertId(null), 2500);
  };

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  const activeCert = filteredItems[currentIndex] || filteredItems[0];

  return (
    <section 
      className="py-16 sm:py-20 bg-gradient-to-b from-ivory via-champagne/40 to-ivory border-y border-white/20 text-charcoal-800 relative overflow-hidden"
      data-testid="certification-carousel-section"
    >
      {/* Background Decorative Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-stone-100 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-charcoal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal text-amber-50 border border-white/20 text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-3">
            <ShieldCheck className="w-4 h-4 text-stone-800" />
            <span>Institutional Trust &amp; Global Compliance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
            Verified Export Certifications
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base mt-3 leading-relaxed">
            Every shipment from our 1,200-bigha Kharsang estate is backed by rigorous government accreditations, international organic standards, and 100% batch traceability.
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10" data-testid="cert-category-tabs">
          {["All", "Organic", "Food Safety", "Regulatory", "Lab Testing"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              data-testid={`cert-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat
                  ? "bg-charcoal text-amber-50 shadow-md border border-white/20"
                  : "bg-white text-charcoal hover:bg-champagne border border-stone-300"
              }`}
            >
              {cat === "Organic" && <Leaf className="w-3.5 h-3.5 text-stone-600" />}
              {cat === "Food Safety" && <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />}
              {cat === "Regulatory" && <Building className="w-3.5 h-3.5 text-stone-600" />}
              {cat === "Lab Testing" && <Award className="w-3.5 h-3.5 text-stone-600" />}
              <span>{cat}</span>
              {cat === "All" && <span className="ml-1 text-[10px] opacity-75 bg-black/10 px-1.5 py-0.5 rounded-full">{CERTIFICATION_ITEMS.length}</span>}
            </button>
          ))}
        </div>

        {/* CAROUSEL CONTAINER */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          data-testid="cert-carousel-container"
        >
          {/* Main Card */}
          <div className="bg-white border-2 border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden transition-all duration-500">
            {/* Top Accent Stripe */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-charcoal via-champagne to-charcoal" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Emblem / Badge Display */}
              <div className="lg:col-span-5 flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-charcoal to-charcoal text-white border border-white/20 relative shadow-inner">
                
                {/* Active Verified Pill */}
                <div className="absolute top-4 right-4 bg-stone-100/20 text-stone-600 border border-stone-300/40 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-stone-100 animate-pulse" />
                  <span>Verified Active</span>
                </div>

                {/* Big Emblem Circle */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center my-4 p-4 shadow-lg backdrop-blur-sm">
                  {activeCert.id === "npop" || activeCert.id === "usda-organic" || activeCert.id === "eu-organic" ? (
                    <Leaf className="w-12 h-12 text-stone-800" />
                  ) : activeCert.id === "fssai" ? (
                    <Building className="w-12 h-12 text-stone-600" />
                  ) : activeCert.id === "haccp" || activeCert.id === "iso-22000" ? (
                    <ShieldCheck className="w-12 h-12 text-stone-600" />
                  ) : (
                    <Award className="w-12 h-12 text-stone-600" />
                  )}
                </div>

                {/* Short Name & Category */}
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-800 bg-black/30 px-3 py-1 rounded-full border border-white/20 mb-2">
                  {activeCert.category} Certification
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
                  {activeCert.shortName}
                </h3>
                <p className="text-stone-600 text-xs font-mono">
                  Issuer: {activeCert.issuerCountry}
                </p>

                {/* Copy Certificate ID Button */}
                <div className="mt-5 w-full pt-4 border-t border-white/15 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-stone-600 uppercase tracking-wider">Official Certificate / Reg No:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyCertId(activeCert.certId)}
                    data-testid={`copy-cert-id-${activeCert.id}`}
                    className="w-full bg-white/10 hover:bg-white/20 text-stone-800 border border-white/20 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedCertId === activeCert.certId ? (
                      <>
                        <Check className="w-4 h-4 text-stone-600" />
                        <span className="text-stone-600">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-800" />
                        <span className="truncate">{activeCert.certId}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Detailed Specifications */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                      Certification Scope &amp; Audit Profile
                    </span>
                    <span className="text-xs text-stone-600 font-mono">
                      Valid: <strong className="text-charcoal">{activeCert.validUntil}</strong>
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-1">
                    {activeCert.fullName}
                  </h3>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                    {activeCert.scope}
                  </p>
                </div>

                {/* Key Institutional Highlights Grid */}
                <div className="bg-ivory border border-white/20 rounded-2xl p-4 sm:p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal block mb-3">
                    Institutional Audit Highlights:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeCert.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-charcoal">
                        <CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Issuer & Audit Summary Bar */}
                <div className="text-xs bg-stone-100 text-charcoal border border-stone-300 rounded-xl p-3 font-mono leading-snug">
                  <span className="font-bold text-charcoal">Auditing Authority: </span>
                  {activeCert.issuer}
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCertModal(activeCert)}
                    data-testid={`inspect-modal-btn-${activeCert.id}`}
                    className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal text-amber-50 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Inspect Full Audit Specs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateTab && onNavigateTab("compliance")}
                    data-testid="view-all-compliance-btn"
                    className="inline-flex items-center gap-1.5 text-xs text-charcoal font-bold hover:text-stone-800 hover:underline cursor-pointer"
                  >
                    <span>View Corporate Regulatory Dossier</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* CAROUSEL NAVIGATION CONTROLS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            
            {/* Left: Pause / Play Toggle & Slide Counter */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                data-testid="carousel-play-pause-btn"
                className="w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center text-charcoal hover:text-charcoal hover:border-stone-800/20 transition-all cursor-pointer shadow-sm"
                title={isPaused ? "Resume Auto Slide" : "Pause Auto Slide"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-stone-600" /> : <Pause className="w-3.5 h-3.5" />}
              </button>

              <span className="text-xs font-mono text-stone-600">
                Certification <strong className="text-charcoal">{currentIndex + 1}</strong> of <strong className="text-charcoal">{filteredItems.length}</strong>
              </span>
            </div>

            {/* Middle: Dot Indicators */}
            <div className="flex items-center gap-2" data-testid="carousel-dot-indicators">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  data-testid={`carousel-dot-${idx}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx 
                      ? "w-8 bg-charcoal" 
                      : "w-2.5 bg-stone-100 hover:bg-champagne"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right: Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                data-testid="carousel-prev-btn"
                className="p-2.5 rounded-xl bg-white border border-stone-300 text-charcoal hover:bg-charcoal hover:text-amber-50 hover:border-charcoal transition-all cursor-pointer shadow-sm"
                aria-label="Previous Certification"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                data-testid="carousel-next-btn"
                className="p-2.5 rounded-xl bg-white border border-stone-300 text-charcoal hover:bg-charcoal hover:text-amber-50 hover:border-charcoal transition-all cursor-pointer shadow-sm"
                aria-label="Next Certification"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

        {/* INSTITUTIONAL TRUST LOGO GRID SUMMARY */}
        <div className="mt-14 pt-10 border-t border-white/20 max-w-5xl mx-auto">
          <span className="text-center block text-[11px] font-bold uppercase tracking-[0.25em] text-stone-600 mb-6">
            Institutional Procurement Compliance Matrix
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {CERTIFICATION_ITEMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setCurrentIndex(index);
                }}
                data-testid={`trust-grid-item-${item.id}`}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  currentIndex === index && activeCategory === "All"
                    ? "bg-charcoal text-amber-50 border-stone-800/20 shadow-md ring-2 ring-champagne/30"
                    : "bg-white text-charcoal border-stone-300 hover:border-white/20 hover:bg-ivory"
                }`}
              >
                <span className="text-[11px] font-bold block truncate">{item.badge}</span>
                <span className="text-[9px] font-mono opacity-80 block truncate mt-0.5">{item.category}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* DETAILED AUDIT SPECS MODAL */}
      {selectedCertModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          data-testid="cert-modal-backdrop"
        >
          <div className="bg-white border-2 border-stone-800/20 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedCertModal(null)}
              data-testid="close-cert-modal-btn"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-charcoal hover:text-amber-50 flex items-center justify-center text-stone-600 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 pr-10">
              <div className="w-12 h-12 rounded-2xl bg-charcoal text-amber-50 flex items-center justify-center shrink-0 border border-white/20 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-800 bg-ivory px-2.5 py-0.5 rounded border border-white/20">
                  {selectedCertModal.category} Standard
                </span>
                <h3 className="font-serif text-2xl font-bold text-charcoal mt-1">
                  {selectedCertModal.fullName}
                </h3>
              </div>
            </div>

            {/* Modal Details Grid */}
            <div className="mt-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-ivory p-4 rounded-2xl border border-white/20">
                <div>
                  <span className="text-stone-600 block font-mono">Certificate / License ID:</span>
                  <span className="font-mono font-bold text-charcoal text-sm">{selectedCertModal.certId}</span>
                </div>
                <div>
                  <span className="text-stone-600 block font-mono">Status:</span>
                  <span className="font-bold text-stone-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-600" />
                    Verified Active ({selectedCertModal.validUntil})
                  </span>
                </div>
                <div>
                  <span className="text-stone-600 block font-mono">Issued Date:</span>
                  <span className="font-medium text-charcoal">{selectedCertModal.issued}</span>
                </div>
                <div>
                  <span className="text-stone-600 block font-mono">Issuing Authority:</span>
                  <span className="font-medium text-charcoal">{selectedCertModal.issuer}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-charcoal mb-1">Accreditation Body &amp; Standards:</h4>
                <p className="text-stone-600 leading-relaxed bg-stone-100 p-3 rounded-xl border border-stone-300">
                  {selectedCertModal.accreditation}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-charcoal mb-1">Full Certified Scope:</h4>
                <p className="text-stone-600 leading-relaxed bg-stone-100 p-3 rounded-xl border border-stone-300">
                  {selectedCertModal.scope}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-charcoal mb-1">Audit Protocol &amp; Quality Findings:</h4>
                <p className="text-charcoal font-medium leading-relaxed bg-stone-100 text-charcoal p-3 rounded-xl border border-stone-300">
                  {selectedCertModal.auditSummary}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-stone-300 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCopyCertId(selectedCertModal.certId)}
                className="bg-stone-100 hover:bg-stone-100 text-charcoal font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
              >
                {copiedCertId === selectedCertModal.certId ? <Check className="w-4 h-4 text-stone-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCertId === selectedCertModal.certId ? "Cert ID Copied!" : "Copy Cert ID"}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCertModal(null)}
                className="bg-charcoal hover:bg-charcoal text-amber-50 font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
              >
                Close Audit Viewer
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
