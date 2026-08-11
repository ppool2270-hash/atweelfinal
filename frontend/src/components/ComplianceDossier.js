import React from "react";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck,
  FileText,
  Download,
  Building,
  Lock,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function ComplianceDossier({ onOpenLeadForm }) {
  const CERTIFICATES = [
    {
      title: "Corporate Identity Number (CIN) Register",
      authority: "Ministry of Corporate Affairs (MCA), Govt. of India",
      number: "U15100MH2019PTC331942",
      validity: "Active & Fully Compliant (Incorporated 2019)",
      scope: "Agricultural & Food Processing Export Jurisdiction"
    },
    {
      title: "Food Safety & Standards Authority (FSSAI)",
      authority: "FSSAI Food Safety License",
      number: "10023083000182",
      validity: "Active License",
      scope: "Factory Manufacturing & Bulk Export Operations"
    },
    {
      title: "India Organic (NPOP) Certification",
      authority: "APEDA / NPOP Certification Standards",
      number: "ORG/SC/2309/001842",
      validity: "Annual Renewal Verified",
      scope: "1,200 Bigha Kharsang Estate & Processing Plant"
    },
    {
      title: "USDA Organic Certificate",
      authority: "United States Dept. of Agriculture (USDA-NOP)",
      number: "USDA-NOP-98421",
      validity: "Current Year Certified",
      scope: "North American B2B Import Clearance"
    },
    {
      title: "ISO 22000:2018 Food Safety System",
      authority: "TÜV SÜD / Bureau Veritas Audit",
      number: "FSMS-489201",
      validity: "ISO Certified Facility",
      scope: "72,000 Sq Ft Processing Factory Operations"
    },
    {
      title: "HACCP Hazard Analysis Standard",
      authority: "SGS Food Integrity Testing",
      number: "HACCP-2024-91",
      validity: "Active Compliance",
      scope: "Critical Control Point Hazard Management"
    }
  ];

  return (
    <div className="bg-ivory text-charcoal py-16 sm:py-24" id="compliance-dossier" data-testid="compliance-dossier-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HEADER */}
        <div className="bg-charcoal text-ivory rounded-3xl p-8 sm:p-14 border-2 border-white/20 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-white/20 text-amber-50 text-xs font-bold uppercase tracking-[0.25em]">
              <ShieldCheck className="w-4 h-4 text-stone-800" />
              <span>International Compliance &amp; Verification</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Statutory Certification Dossier
            </h1>

            <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-sans pt-2">
              Atweel Food &amp; Beverages Pvt. Ltd. maintains rigorous, uncompromised compliance across international trade, food safety, and organic farming registries. Review verified statutory details below.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-stone-800 border-t border-white/20">
              <span>Corporate CIN: U15100MH2019PTC331942</span>
              <span>•</span>
              <span>Registered HQ: Thane, Maharashtra</span>
            </div>
          </div>
        </div>

        {/* CERTIFICATES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 rounded-3xl border-2 border-white/20 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-charcoal text-amber-50">
                    <Award className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-charcoal font-bold border border-stone-300">
                    VERIFIED ACTIVE
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {cert.title}
                </h3>
                <p className="text-xs text-stone-600 font-mono">
                  Issuing Body: {cert.authority}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-300 font-mono text-xs">
                <div>
                  <span className="text-stone-600 text-[10px] uppercase block">Registry Number</span>
                  <strong className="text-charcoal text-sm font-bold block">{cert.number}</strong>
                </div>
                <div>
                  <span className="text-stone-600 text-[10px] uppercase block">Scope of Operations</span>
                  <span className="text-charcoal text-[11px] block">{cert.scope}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* MRL PESTICIDE LABORATORY SCREENING BLOCK */}
        <div className="bg-charcoal text-ivory rounded-3xl p-8 sm:p-12 border-2 border-white/20 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-[0.25em] font-mono">
                Eurofins / SGS Independent Testing Protocols
              </span>
              <h2 className="font-serif text-3xl font-bold text-white">
                500+ Multi-Residue Pesticide MRL Screening (0.00 ppm)
              </h2>
              <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
                Prior to sealing every export container at Kolkata Port, independent samples are dispatched to Eurofins / SGS laboratories for comprehensive gas and liquid chromatography analysis (GC-MS/MS &amp; LC-MS/MS).
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenLeadForm}
              className="bg-champagne hover:bg-champagne text-charcoal font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
            >
              Request Full MRL Lab Report PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
