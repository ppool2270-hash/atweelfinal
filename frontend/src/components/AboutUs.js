import React from "react";
import {
  Building,
  Leaf,
  ShieldCheck,
  Award,
  Globe,
  MapPin,
  CheckCircle2,
  Users,
  Factory,
  Mail,
  Phone,
  ArrowRight,
  FileText,
  Sparkles,
  HeartHandshake,
  Sun,
  Droplets,
  PackageCheck
} from "lucide-react";

export default function AboutUs({ onNavigateTab, onOpenLeadForm }) {
  return (
    <div className="bg-ivory min-h-screen pb-20 animate-in fade-in duration-300" data-testid="view-about-us">
      {/* HERO BANNER */}
      <section className="relative bg-charcoal text-white py-20 px-6 overflow-hidden border-b-2 border-stone-800/20">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal border border-white/20 text-amber-50 text-xs uppercase tracking-[0.2em] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Corporate Profile &amp; Estate Heritage</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              About <span className="text-stone-800 italic font-serif">Atweel Tea</span>
            </h1>

            <p className="text-lg text-stone-600 max-w-2xl font-sans leading-relaxed">
              Atweel Food &amp; Beverages Pvt. Ltd. is a premier single-estate organic tea producer based in <strong className="text-white">Kharsang, Arunachal Pradesh</strong>. Operating <strong className="text-stone-800">1,200 bighas</strong> of certified organic gardens and a <strong className="text-white">72,000 sq ft processing plant</strong>, we craft ultra-premium Orthodox, White, Green, and Oolong teas for discerning international tea importers.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigateTab("catalog")}
                data-testid="about-hero-catalog-btn"
                className="bg-gradient-to-r from-champagne to-champagne hover:brightness-110 text-charcoal font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-widest shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Tea Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateTab("rfq")}
                data-testid="about-hero-rfq-btn"
                className="border-2 border-white/20 hover:border-stone-800/20 bg-white/5 hover:bg-white/10 text-white font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Custom Blending</span>
                <Mail className="w-4 h-4 text-stone-800" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="p-6 rounded-3xl bg-charcoal border-2 border-white/20 shadow-2xl space-y-6 w-full max-w-md">
              <div className="flex items-center gap-3 border-b border-white/20 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-charcoal border border-stone-800/20 flex items-center justify-center text-amber-50">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white text-base">Atweel Food &amp; Beverages</h3>
                  <p className="text-[11px] text-stone-800 uppercase tracking-wider font-mono">Pvt. Ltd. · Est. 2018</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span className="text-stone-600 uppercase tracking-wider text-[10px] font-bold">Estate Location:</span>
                  <span className="font-semibold text-white">Kharsang, Arunachal Pradesh</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span className="text-stone-600 uppercase tracking-wider text-[10px] font-bold">Cultivated Area:</span>
                  <span className="font-mono font-bold text-stone-800">1,200 Bighas Organic</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span className="text-stone-600 uppercase tracking-wider text-[10px] font-bold">Factory Facility:</span>
                  <span className="font-semibold text-white">72,000 sq. ft. ISO 22000</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span className="text-stone-600 uppercase tracking-wider text-[10px] font-bold">Annual Capacity:</span>
                  <span className="font-mono font-bold text-stone-800">1.5M KG Fine Tea</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span className="text-stone-600 uppercase tracking-wider text-[10px] font-bold">Certifications:</span>
                  <span className="font-semibold text-stone-600">NPOP, USDA, EU, HACCP</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="mailto:atweeltea@gmail.com"
                  className="w-full bg-charcoal hover:bg-charcoal text-amber-50 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>atweeltea@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STATS GRID */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Organic Garden Area", stat: "1,200 Bighas", desc: "100% Chemical-free certified soil", icon: Leaf },
            { label: "Modern Factory", stat: "72,000 Sq. Ft.", desc: "HACCP & ISO 22000 compliant", icon: Factory },
            { label: "Export Destinations", stat: "45+ Countries", desc: "Direct container shipping from Kolkata", icon: Globe },
            { label: "Community Artisans", stat: "450+ Families", desc: "Local tribal plucking & welfare", icon: Users }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-white/20 shadow-xl shadow-charcoal/5 space-y-2">
              <item.icon className="w-6 h-6 text-stone-800 mb-1" />
              <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">{item.stat}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800">{item.label}</div>
              <p className="text-[11px] text-stone-600 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY & HERITAGE */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-800">Origin &amp; Terroir</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
              Grown in the Pristine Foothills of Changlang, Arunachal Pradesh
            </h2>
            <div className="w-16 h-1 bg-champagne rounded-full" />
            <p className="text-sm text-charcoal leading-relaxed">
              Nestled at an elevation of 800 meters along the sub-Himalayan Patkai range in Kharsang, Arunachal Pradesh, Atweel Tea benefits from an ideal tea-growing terroir. Misty mornings, heavy monsoon rainfalls, and virgin mineral-rich soil create a naturally sweet, aromatic leaf profile unmatched by low-altitude estates.
            </p>
            <p className="text-sm text-charcoal leading-relaxed">
              Every leaf is hand-plucked according to the strict <em>&ldquo;Two Leaves and a Bud&rdquo;</em> standard by skilled local artisans from the Tangsa and Singpho tribes, preserving the delicate essential oils and golden tips.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-white/20 flex items-start gap-3">
                <Sun className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">800m Elevation</h4>
                  <p className="text-xs text-stone-600">Sub-tropical mountain climate encouraging slow leaf growth for concentrated polyphenols.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-white/20 flex items-start gap-3">
                <Droplets className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">Sub-Himalayan Rain</h4>
                  <p className="text-xs text-stone-600">Pure glacial water sources nourishment without synthetic irrigation.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-charcoal">
              <img
                src="/estate/estate-1-md.jpg"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1577016029703-cc22a7c0c28c?auto=format&fit=crop&w=800&q=75"; }}
                alt="Atweel Estate Kharsang Arunachal Pradesh"
                className="w-full h-[440px] object-cover filter brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-charcoal/90 backdrop-blur-md border border-white/20 text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-800">Kharsang Estate View</span>
                <h3 className="font-serif text-lg font-bold text-white">100% Single-Estate Traceability</h3>
                <p className="text-xs text-stone-600">
                  Every batch dispatched from our factory bears lot numbers tied to specific garden sections in Nemphai &amp; Kharsang.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SUSTAINABILITY & ETHICAL COMMITMENT */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-white/20 shadow-xl space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-800">Sustainability &amp; Ethics</span>
            <h2 className="font-serif text-3xl font-bold text-charcoal">
              Our Four Pillars of Estate Excellence
            </h2>
            <div className="w-12 h-1 bg-champagne rounded-full mx-auto" />
            <p className="text-xs text-stone-600">
              We combine traditional organic farming wisdom with modern food safety science to deliver uncompromised quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "100% Organic Organic",
                desc: "Certified under NPOP (India Organic), USDA Organic, and EU Organic standards. Zero synthetic pesticides or chemical fertilizers.",
                icon: ShieldCheck
              },
              {
                title: "72,000 Sq Ft Processing",
                desc: "Clean-room environment featuring stainless-steel orthodox rollers, temperature-controlled oxidation chambers, and optical sorters.",
                icon: Factory
              },
              {
                title: "Fair Trade & Community",
                desc: "Empowering 450+ indigenous families with fair wages, medical coverage, safe housing, and educational scholarships for children.",
                icon: HeartHandshake
              },
              {
                title: "Direct B2B Export",
                desc: "No middlemen. Direct container shipping from Kolkata Port with full phyto-sanitary documentation and certificate of origin.",
                icon: PackageCheck
              }
            ].map((pillar, index) => (
              <div key={index} className="p-6 rounded-2xl bg-ivory border border-white/20 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-charcoal text-amber-50 flex items-center justify-center font-bold">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal">{pillar.title}</h3>
                <p className="text-xs text-charcoal leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ORGANIC CERTIFICATIONS SHOWCASE */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 border-2 border-stone-800/20 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/20 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-800">Global Compliance</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Certified for Worldwide Distribution
              </h3>
            </div>

            <button
              onClick={() => onNavigateTab("standards")}
              data-testid="about-view-compliance-btn"
              className="bg-champagne hover:bg-champagne text-charcoal font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Full Lab Standards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "India Organic", sub: "NPOP Certified" },
              { name: "USDA Organic", sub: "NOP Compliant" },
              { name: "EU Organic", sub: "Regulation (EC)" },
              { name: "ISO 22000", sub: "Food Safety" },
              { name: "HACCP", sub: "Hazard Control" },
              { name: "FSSAI", sub: "Govt of India" }
            ].map((cert, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-charcoal border border-white/20 text-center space-y-1">
                <CheckCircle2 className="w-5 h-5 text-stone-800 mx-auto mb-2" />
                <div className="font-serif font-bold text-xs text-white">{cert.name}</div>
                <div className="text-[10px] text-stone-800/80 font-mono">{cert.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CORPORATE CONTACT & HEADQUARTERS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-white/20 shadow-xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-800">Registered Corporate Entity</span>
            <h3 className="font-serif text-2xl font-bold text-charcoal">Atweel Food &amp; Beverages Pvt. Ltd.</h3>
            
            <p className="text-xs text-charcoal leading-relaxed">
              We welcome international tea buyers, blenders, and brand owners for estate visits, custom lot cupping, and long-term annual supply contracts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="space-y-1.5 p-4 rounded-2xl bg-ivory border border-stone-300">
                <div className="font-bold text-charcoal flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-stone-800" />
                  <span>Estate &amp; Factory Address</span>
                </div>
                <p className="text-stone-600">
                  Kharsang Tea Estate, Changlang District, Arunachal Pradesh – 792122, India
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-ivory border border-stone-300">
                <div className="font-bold text-charcoal flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-stone-800" />
                  <span>Direct Export Sales Desk</span>
                </div>
                <p className="text-stone-600 font-mono font-bold text-stone-800">
                  atweeltea@gmail.com
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigateTab("rfq")}
                data-testid="about-rfq-bottom-btn"
                className="bg-charcoal hover:bg-charcoal text-amber-50 font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Custom RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLeadForm}
                data-testid="about-importer-intent-btn"
                className="border-2 border-stone-800/20 hover:bg-stone-100 text-charcoal font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Register Importer Intent</span>
                <Award className="w-4 h-4 text-stone-800" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-ivory rounded-3xl p-8 border border-white/20 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-[10px] font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Global Export Manual</span>
              </div>
              <h4 className="font-serif text-xl font-bold text-charcoal">
                AT-SOP-QA-2026 Quality Standards
              </h4>
              <p className="text-xs text-charcoal leading-relaxed">
                Download our complete 2026 Quality Assurance SOP manual containing detailed organoleptic specifications, heavy metal test reports, and moisture parameters.
              </p>
            </div>

            <div className="pt-4 border-t border-white/20">
              <a
                href="/atweel-sop.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-charcoal hover:bg-charcoal text-amber-50 font-bold py-3 px-6 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer shadow-lg"
              >
                <FileText className="w-4 h-4 text-stone-800" />
                <span>Download SOP Manual (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
