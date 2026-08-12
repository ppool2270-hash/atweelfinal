import React from "react";
import {
  Building,
  ShieldCheck,
  Award,
  Globe,
  CheckCircle2,
  FileText,
  UserCheck,
  Building2,
  Calendar,
  Lock,
  ArrowRight
} from "lucide-react";

export default function CorporateGovernance({ onOpenLeadForm }) {
  return (
    <div className="bg-gray-50 text-black py-16 sm:py-24" id="corporate-profile" data-testid="corporate-governance-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HERO TITLE BLOCK */}
        <div className="bg-black text-gray-50 rounded-none p-8 sm:p-14 border-2 border-gray-200 shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50 rounded-none blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-black border border-gray-200 text-gray-400 text-xs font-bold uppercase tracking-[0.25em]">
              <Building className="w-4 h-4 text-black" />
              <span>Corporate Profile &amp; Governance Dossier</span>
            </div>
            
            <h1 className="font-sans tracking-tight text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Atweel Food &amp; Beverages Private Limited
            </h1>

            <p className="text-black text-sm sm:text-base leading-relaxed font-sans pt-2">
              Established in 2019 as a premier, globally compliant agricultural and beverage export corporation. Headquartered in Thane, Maharashtra, Atweel stewards a vertically integrated supply chain encompassing 1,200 bighas of certified organic tea gardens in Kharsang, Arunachal Pradesh.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 font-mono text-xs text-black">
              <div>
                <span className="block text-[10px] text-gray-400 uppercase">Corporate Identification</span>
                <strong className="text-white text-sm">CIN: U15100MH2019PTC331942</strong>
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 uppercase">Year of Establishment</span>
                <strong className="text-white text-sm">Incorporated 2019</strong>
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 uppercase">Registered Jurisdiction</span>
                <strong className="text-white text-sm">Thane, Maharashtra, India</strong>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: EXECUTIVE LEADERSHIP SECTION */}
        <div className="bg-white border-2 border-gray-200 rounded-none p-8 sm:p-12 shadow-none space-y-8">
          <div>
            <span className="text-xs font-bold text-black uppercase tracking-[0.25em] block mb-2 font-mono">
              Board of Directors &amp; Active Governance
            </span>
            <h2 className="font-sans tracking-tight text-3xl sm:text-4xl font-bold text-black">
              Executive Leadership
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-3xl leading-relaxed">
              Atweel Food &amp; Beverages Private Limited operates under the rigorous active oversight of its founding Board of Directors, maintaining uncompromising standards of international compliance, statutory transparency, and agrarian stewardship.
            </p>
          </div>

          {/* Leadership Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Director 1 */}
            <div className="bg-gray-50 border border-gray-200 rounded-none p-6 space-y-4 hover:border-black/20 transition-all relative overflow-hidden group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-none bg-black text-gray-400 flex items-center justify-center font-sans tracking-tight text-2xl font-bold border border-gray-200 shadow-none">
                  KD
                </div>
                <div>
                  <h3 className="font-sans tracking-tight text-xl font-bold text-black">
                    Kulshreshth Harishankar Dubey
                  </h3>
                  <span className="text-xs font-mono font-bold text-gray-400 block mt-0.5">
                    Board Director &amp; Executive Chairman
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pt-2 border-t border-gray-200">
                Guiding corporate strategy, international export relations, and statutory compliance under Ministry of Corporate Affairs (MCA) protocols. Under his direct oversight, Atweel expanded its export infrastructure across European, North American, and Middle Eastern markets.
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-2 border-t border-gray-200">
                <span>Director Identification Number (DIN)</span>
                <span className="font-bold text-black">MCA Verified</span>
              </div>
            </div>

            {/* Director 2 */}
            <div className="bg-gray-50 border border-gray-200 rounded-none p-6 space-y-4 hover:border-black/20 transition-all relative overflow-hidden group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-none bg-black text-gray-400 flex items-center justify-center font-sans tracking-tight text-2xl font-bold border border-gray-200 shadow-none">
                  RS
                </div>
                <div>
                  <h3 className="font-sans tracking-tight text-xl font-bold text-black">
                    Rinku Govindanath Shukla
                  </h3>
                  <span className="text-xs font-mono font-bold text-gray-400 block mt-0.5">
                    Board Director &amp; Operations Controller
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pt-2 border-t border-gray-200">
                Directing plantation operations, factory quality assurance, and laboratory standards at the 72,000 sq ft processing plant in Kharsang. Oversees NPOP, USDA Organic, ISO 22000, and HACCP compliance audits to ensure zero-pesticide integrity.
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-2 border-t border-gray-200">
                <span>Director Identification Number (DIN)</span>
                <span className="font-bold text-black">MCA Verified</span>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: STATUTORY & LEGAL REGISTER */}
        <div className="bg-black text-gray-50 rounded-none p-8 sm:p-12 border-2 border-gray-200 shadow-none space-y-8">
          <div>
            <span className="text-xs font-bold text-black uppercase tracking-[0.25em] block mb-2 font-mono">
              Corporate Governance &amp; Compliance Matrix
            </span>
            <h2 className="font-sans tracking-tight text-3xl font-bold text-white">
              Statutory Credentials &amp; Registered Entity Data
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono">
            
            <div className="p-5 bg-black rounded-none border border-gray-200 space-y-1.5">
              <span className="text-gray-400 block text-[10px] uppercase">Corporate Entity</span>
              <strong className="text-white font-sans tracking-tight text-base block">Atweel Food &amp; Beverages Pvt Ltd</strong>
              <span className="text-black block text-[10px]">Private Limited Company</span>
            </div>

            <div className="p-5 bg-black rounded-none border border-gray-200 space-y-1.5">
              <span className="text-gray-400 block text-[10px] uppercase">CIN Number</span>
              <strong className="text-gray-400 font-sans tracking-tight text-base block">U15100MH2019PTC331942</strong>
              <span className="text-gray-400 block text-[10px]">MCA Registered 2019</span>
            </div>

            <div className="p-5 bg-black rounded-none border border-gray-200 space-y-1.5">
              <span className="text-gray-400 block text-[10px] uppercase">Registered Address</span>
              <strong className="text-white font-sans text-xs block">G.B. Road, Thane, Maharashtra, India</strong>
              <span className="text-black block text-[10px]">Corporate Head Office</span>
            </div>

            <div className="p-5 bg-black rounded-none border border-gray-200 space-y-1.5">
              <span className="text-gray-400 block text-[10px] uppercase">FSSAI License</span>
              <strong className="text-white font-sans tracking-tight text-base block">10023083000182</strong>
              <span className="text-gray-400 block text-[10px]">Food Safety Authority</span>
            </div>

          </div>

          {/* CTA Banner inside Governance */}
          <div className="p-6 bg-gradient-to-r from-black to-black rounded-none border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-sans tracking-tight text-xl font-bold text-white">
                Request Official Statutory Compliance Dossier
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Complete MCA filing history, FSSAI certificates, and Eurofins pesticide MRL lab sheets are available for enterprise buyer diligence.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenLeadForm}
              className="bg-black hover:bg-black text-white font-bold px-6 py-3 rounded-none text-xs uppercase tracking-wider transition-all shadow-none shrink-0 cursor-pointer"
            >
              Request Compliance Packet
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
