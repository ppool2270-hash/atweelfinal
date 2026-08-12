const fs = require('fs');

let code = `import React, { useState } from "react";
import {
  ShieldCheck,
  Award,
  FileCheck,
  Building,
  Lock,
  Sparkles,
  MessageSquare,
  Send,
  Loader2,
  Bot
} from "lucide-react";

export default function ComplianceDossier({ onOpenLeadForm }) {
  const [aiQuery, setAiQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", text: "Hello. I am the Atweel AI Compliance Consultant. Ask me anything about our USDA/EU Organic standards, MRL testing, or export clearances." }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const CERTIFICATES = [
    {
      title: "Corporate Identity Number (CIN)",
      authority: "Ministry of Corporate Affairs (MCA)",
      number: "U15100MH2019PTC331942",
      validity: "Active & Fully Compliant",
      scope: "Agricultural & Food Processing Export"
    },
    {
      title: "Food Safety & Standards Authority",
      authority: "FSSAI Food Safety License",
      number: "10023083000182",
      validity: "Active License",
      scope: "Factory Manufacturing & Bulk Export"
    },
    {
      title: "India Organic (NPOP)",
      authority: "APEDA / NPOP Certification",
      number: "ORG/SC/2309/001842",
      validity: "Annual Renewal Verified",
      scope: "1,200 Bigha Kharsang Estate"
    },
    {
      title: "USDA Organic Certificate",
      authority: "United States Dept. of Agriculture",
      number: "USDA-NOP-98421",
      validity: "Current Year Certified",
      scope: "North American B2B Import Clearance"
    },
    {
      title: "ISO 22000:2018 Food Safety",
      authority: "TÜV SÜD / Bureau Veritas Audit",
      number: "FSMS-489201",
      validity: "ISO Certified Facility",
      scope: "72,000 Sq Ft Processing Factory"
    },
    {
      title: "HACCP Hazard Analysis",
      authority: "SGS Food Integrity Testing",
      number: "HACCP-2024-91",
      validity: "Active Compliance",
      scope: "Critical Control Point Management"
    }
  ];

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userMessage = { role: "user", text: aiQuery };
    setChatHistory((prev) => [...prev, userMessage]);
    setAiQuery("");
    setIsAiLoading(true);

    try {
      const res = await fetch("/api/ai-compliance-consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.text, certificates: CERTIFICATES })
      });
      const data = await res.json();
      if (data.error) {
        setChatHistory((prev) => [...prev, { role: "ai", text: data.error }]);
      } else {
        setChatHistory((prev) => [...prev, { role: "ai", text: data.text }]);
      }
    } catch (err) {
      setChatHistory((prev) => [...prev, { role: "ai", text: "Connection error. Please try again later." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="bg-tata-bg-light text-tata-dark py-16 sm:py-24" id="compliance-dossier" data-testid="compliance-dossier-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HEADER */}
        <div className="bg-gradient-to-br from-[#174195] via-[#1468b3] to-[#231F20] text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
            <ShieldCheck className="w-96 h-96" />
          </div>
          
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.25em]">
              <Lock className="w-3.5 h-3.5" />
              <span>International Compliance & Verification</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-md">
              Statutory Certification Dossier
            </h1>
            
            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans pt-2 max-w-2xl">
              Atweel Food & Beverages Pvt. Ltd. maintains rigorous, uncompromised compliance across international trade, food safety, and organic farming registries. Review verified statutory details below.
            </p>
            
            <div className="pt-6 flex flex-wrap items-center gap-6 text-[11px] font-mono text-white/70 border-t border-white/20">
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
              className="bg-white p-8 rounded-3xl border border-tata-grey-light/60 shadow-sm hover:shadow-xl hover:border-[#174195]/20 transition-all duration-300 space-y-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#174195]/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-[#174195]/10"></div>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="p-3 rounded-2xl bg-[#174195]/5 text-[#174195] group-hover:bg-[#174195] group-hover:text-white transition-colors duration-300">
                    <Award className="w-6 h-6" />
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    VERIFIED ACTIVE
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-tata-dark leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs text-tata-grey font-mono">
                  Issuing Body: {cert.authority}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-tata-grey-light font-mono text-xs relative z-10">
                <div className="flex justify-between items-end">
                  <span className="text-tata-grey text-[10px] uppercase">Registry Number</span>
                  <strong className="text-tata-dark text-sm font-bold">{cert.number}</strong>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-tata-grey text-[10px] uppercase">Scope</span>
                  <span className="text-tata-dark text-[11px] text-right max-w-[150px] leading-tight">{cert.scope}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TWO-COLUMN LAYOUT: MRL PROTOCOL & AI CONSULTANT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* MRL PESTICIDE LABORATORY SCREENING BLOCK */}
          <div className="bg-[#231F20] text-white rounded-3xl p-8 sm:p-12 border border-[#231F20] shadow-xl space-y-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
              <FileCheck className="w-80 h-80" />
            </div>
            <div className="space-y-4 relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold text-white uppercase tracking-[0.2em] font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> Eurofins / SGS Testing
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                500+ Multi-Residue Pesticide MRL Screening (0.00 ppm)
              </h2>
              <p className="text-sm text-white/70 max-w-lg leading-relaxed pt-2">
                Prior to sealing every export container at Kolkata Port, independent samples are dispatched to Eurofins / SGS laboratories for comprehensive gas and liquid chromatography analysis (GC-MS/MS & LC-MS/MS).
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenLeadForm}
              className="bg-[#174195] hover:bg-[#1468b3] text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(23,65,149,0.4)] hover:shadow-[0_0_30px_rgba(23,65,149,0.6)] self-start relative z-10"
            >
              Request Full MRL Lab Report PDF
            </button>
          </div>

          {/* AI COMPLIANCE CONSULTANT WIDGET */}
          <div className="bg-white rounded-3xl border border-tata-grey-light/80 shadow-xl flex flex-col h-[500px] overflow-hidden relative">
            <div className="p-6 border-b border-tata-grey-light bg-[#f8f9fa] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#174195] to-[#1468b3] flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-tata-dark text-lg">AI Compliance Analyst</h3>
                  <p className="text-[10px] text-tata-grey uppercase tracking-widest font-bold">Ask about our Certifications</p>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest border border-emerald-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/50">
              {chatHistory.map((msg, i) => (
                <div key={i} className={\`flex \${msg.role === "user" ? "justify-end" : "justify-start"}\`}>
                  <div className={\`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm \${msg.role === "user" ? "bg-[#174195] text-white rounded-br-sm" : "bg-white border border-tata-grey-light text-tata-dark rounded-bl-sm"}\`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-4 rounded-2xl bg-white border border-tata-grey-light text-tata-dark rounded-bl-sm flex items-center gap-3 shadow-sm">
                    <Loader2 className="w-4 h-4 text-[#174195] animate-spin" />
                    <span className="text-xs text-tata-grey font-mono">Analyzing compliance data...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleAiSubmit} className="p-4 bg-white border-t border-tata-grey-light">
              <div className="relative flex items-center">
                <MessageSquare className="w-4 h-4 text-tata-grey absolute left-4" />
                <input 
                  type="text" 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask about MRLs, USDA Organic..."
                  className="w-full bg-[#f8f9fa] border border-tata-grey-light rounded-xl py-3.5 pl-11 pr-14 text-sm focus:outline-none focus:border-[#174195] focus:ring-1 focus:ring-[#174195] transition-all text-tata-dark placeholder-tata-grey"
                  disabled={isAiLoading}
                />
                <button 
                  type="submit"
                  disabled={isAiLoading || !aiQuery.trim()}
                  className="absolute right-2 bg-[#174195] hover:bg-[#1468b3] disabled:bg-tata-grey-light disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
`

fs.writeFileSync('frontend/src/components/ComplianceDossier.js', code);
