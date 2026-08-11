import React from "react";
import {
  Compass,
  MapPin,
  Thermometer,
  CloudRain,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight
} from "lucide-react";

export default function KharsangTerroir({ onNavigateTab, onOpenLeadForm }) {
  return (
    <div className="bg-ivory text-charcoal py-16 sm:py-24" id="sourcing-origin" data-testid="kharsang-terroir-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HERO TERROIR TITLE BANNER */}
        <div className="bg-charcoal text-ivory rounded-3xl p-8 sm:p-14 border-2 border-white/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-stone-100 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-white/20 text-amber-50 text-xs font-bold uppercase tracking-[0.25em]">
              <Compass className="w-4 h-4 text-stone-800" />
              <span>Sourcing Origin Chronicles</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              The Kharsang Estate &amp; Terroir
            </h1>

            <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-sans pt-2">
              Nestled in the remote, mist-shrouded Patkai foothills of the Eastern Himalayas, Kharsang in the Changlang district of Arunachal Pradesh represents one of the world's last pristine, naturally pesticide-free organic tea sanctuaries.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-stone-800 border-t border-white/20">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-stone-600" />
                Changlang District, Arunachal Pradesh, India
              </span>
              <span>•</span>
              <span>Altitude: 800m ASL</span>
              <span>•</span>
              <span>Coordinates: 27.1614° N, 95.9186° E</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: GEOGRAPHY & CLIMATE ADVANTAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6 bg-white p-8 sm:p-10 rounded-3xl border-2 border-white/20 shadow-xl">
            <div className="inline-block px-3 py-1 rounded bg-charcoal text-amber-50 font-mono text-xs font-bold uppercase tracking-wider">
              Himalayan Microclimate &amp; Virgin Soil
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Naturally Pesticide-Free High-Altitude Microclimate
            </h2>

            <p className="text-charcoal text-sm sm:text-base leading-relaxed">
              Kharsang’s geography is singular. Encircled by dense primary rainforests and fed by glacial meltwaters from the Himalayan range, the small gardens benefit from extreme diurnal temperature variations. Dense morning mists blanket the slopes, slowing leaf growth and forcing the tea bushes to synthesize extraordinarily high concentrations of natural polyphenols, catechins, and aromatic volatile oils.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-300">
              <div className="p-4 bg-ivory rounded-2xl border border-stone-300">
                <div className="flex items-center gap-2 font-bold text-charcoal text-xs font-mono uppercase mb-1">
                  <CloudRain className="w-4 h-4 text-stone-600" />
                  <span>Eastern Himalayan Mist</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Persistent morning fog buffers leaves from intense UV rays, resulting in tender, succulent buds packed with L-theanine and amino acids.
                </p>
              </div>

              <div className="p-4 bg-ivory rounded-2xl border border-stone-300">
                <div className="flex items-center gap-2 font-bold text-charcoal text-xs font-mono uppercase mb-1">
                  <Thermometer className="w-4 h-4 text-stone-600" />
                  <span>Virgin Rainforest Soil</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Rich, humus-heavy loamy soil untouched by chemical fertilizers for generations, giving Kharsang tea its signature malty depth and golden liquor.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE / SPECS FRAME */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-charcoal p-6 rounded-3xl border-2 border-stone-800/20 text-ivory shadow-2xl space-y-6">
              
              <div className="relative rounded-2xl overflow-hidden h-64 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1639573535302-3cbc366dd393?auto=format&fit=crop&w=800&q=80"
                  alt="Kharsang Estate Tea Gardens"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-amber-50 border border-white/20">
                  Kharsang 1,200-Bigha Organic Estate
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-stone-600">Total Organic Acreage:</span>
                  <strong className="text-stone-600 font-bold">1,200 Bigha (~400 Acres)</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-stone-600">Factory Footprint:</span>
                  <strong className="text-stone-800 font-bold">72,000 Sq Ft Plant</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-stone-600">Dryer Target Moisture:</span>
                  <strong className="text-stone-600 font-bold">3.00% ±0.05% Fixed</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-stone-600">Pesticide Screening:</span>
                  <strong className="text-stone-600 font-bold">Eurofins 500+ Screen Pass</strong>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* SECTION 3: FLAVOR PROFILE & ROBUST ORTHODOX CUP */}
        <div className="bg-charcoal text-ivory rounded-3xl p-8 sm:p-12 border-2 border-white/20 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-[0.25em] block font-mono">
              Sensory Profile &amp; Liquor Characteristics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The Robust Cup of Kharsang High-Altitude Tea
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed font-sans">
              Unlike lowland teas, Kharsang orthodox and CTC teas exhibit a remarkable harmony of briskness, floral top notes, and deep malt. The high polyphenol content (averaging 24.8% dry weight) delivers a clean, astringent structure with a silky honey finish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-charcoal rounded-2xl border border-white/20 space-y-2">
              <span className="text-stone-800 font-serif text-2xl font-bold block">Aroma</span>
              <h4 className="font-serif text-lg font-bold text-white">Honeyed Muscatel &amp; Wild Orchid</h4>
              <p className="text-xs text-stone-600">Lifted floral top notes from morning mist evaporation during withering.</p>
            </div>

            <div className="p-6 bg-charcoal rounded-2xl border border-white/20 space-y-2">
              <span className="text-stone-800 font-serif text-2xl font-bold block">Liquor</span>
              <h4 className="font-serif text-lg font-bold text-white">Luminous Copper &amp; Golden Amber</h4>
              <p className="text-xs text-stone-600">Bright, crystal-clear infusion with abundant golden tip leaf float.</p>
            </div>

            <div className="p-6 bg-charcoal rounded-2xl border border-white/20 space-y-2">
              <span className="text-stone-800 font-serif text-2xl font-bold block">Body</span>
              <h4 className="font-serif text-lg font-bold text-white">Rich Malt &amp; Velvety Mouthfeel</h4>
              <p className="text-xs text-stone-600">Robust structure ideal for standalone tasting or specialty milk blends.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-600 font-mono">
              Ready to sample Kharsang estate harvests for your enterprise brand?
            </span>
            <button
              type="button"
              onClick={onOpenLeadForm}
              className="bg-champagne hover:bg-champagne text-charcoal font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
            >
              Request Kharsang Sample Kit
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
