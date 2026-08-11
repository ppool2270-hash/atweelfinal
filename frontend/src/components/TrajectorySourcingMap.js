import React, { useState } from "react";
import {
  MapPin,
  Compass,
  Building,
  Navigation,
  Globe,
  CheckCircle2,
  Ship,
  Truck,
  ArrowRight,
  Sparkles,
  Info
} from "lucide-react";

export default function TrajectorySourcingMap({ onNavigateTab }) {
  const [selectedNode, setSelectedNode] = useState("kharsang");

  const NODES = {
    kharsang: {
      name: "Kharsang Tea Estate & Processing Plant",
      type: "Origin & Organic Harvest",
      location: "Changlang District, Arunachal Pradesh, India",
      coords: "27.1614° N, 95.9186° E",
      altitude: "800 Meters ASL (Patkai Range)",
      highlights: [
        "1,200 Bigha Organically Certified Tea Gardens",
        "72,000 Sq Ft Processing Factory with Dual Magnetic Separators",
        "Naturally Pesticide-Free Virgin Soil & Misty Microclimate",
        "Moisture Dryer Standard Fixed at 3.00% ±0.05%"
      ]
    },
    thane: {
      name: "Atweel Corporate Headquarters & Trade Desk",
      type: "Executive Board & Export Logistics",
      location: "G.B. Road, Thane, Maharashtra, India",
      coords: "19.2183° N, 72.9781° E",
      highlights: [
        "CIN Registration: U15100MH2019PTC331942",
        "Active Directors: Kulshreshth Harishankar Dubey & Rinku Govindanath Shukla",
        "International B2B Importer Allocation & Sample Desk",
        "Cross-Border Customs Clearance & Phytosanitary Management"
      ]
    },
    kolkata: {
      name: "Kolkata Maritime Export Gateway",
      type: "Container Port & Customs Freight",
      location: "Kolkata Port Trust, West Bengal, India",
      coords: "22.5726° N, 88.3639° E",
      highlights: [
        "20ft / 40ft FCL Vacuum-Foil Sealed Container Loading",
        "Incoterms FOB Kolkata / CFR / CIF International Shipping",
        "SGS & Eurofins Pre-Shipment Quality Testing Inspections",
        "Direct Maritime Shipping Routes to Europe, Middle East, USA & Asia"
      ]
    }
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-charcoal text-ivory border-b border-white/20 relative overflow-hidden"
      id="sourcing-map"
      data-testid="trajectory-sourcing-map"
    >
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal border border-white/20 text-amber-50 text-xs font-bold uppercase tracking-[0.25em]">
            <Compass className="w-4 h-4 text-stone-800" />
            <span>Integrated Supply Line Network</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory">
            Trajectory Sourcing &amp; Supply Chain Mapping
          </h2>
          <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
            Trace the seamless B2B movement from our high-altitude organic gardens in Kharsang, Arunachal Pradesh, through our corporate desk in Thane, Maharashtra, directly to international container shipping ports.
          </p>
        </div>

        {/* INTERACTIVE SVG MAP & DISPLAY MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* SVG MAP CANVAS (7 cols) */}
          <div className="lg:col-span-7 bg-charcoal border-2 border-white/20 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-stone-800 border-b border-white/20 pb-3">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-stone-800" />
                INLINE VECTOR ROUTE: THANE ↔ KHARSANG ↔ KOLKATA
              </span>
              <span className="bg-charcoal px-2.5 py-1 rounded border border-white/20 text-stone-600">
                LIVE LOGISTICS RADAR
              </span>
            </div>

            {/* SVG Map Graphic */}
            <div className="w-full h-[360px] sm:h-[420px] relative flex items-center justify-center bg-charcoal rounded-2xl border border-white/5 p-4">
              <svg 
                viewBox="0 0 800 500" 
                className="w-full h-full text-charcoal"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stylized India Subcontinent Outline paths */}
                <path
                  d="M180,120 L280,100 L350,110 L420,130 L520,120 L680,140 L740,160 L750,220 L710,250 L630,230 L580,270 L500,320 L420,380 L350,420 L280,450 L240,400 L210,320 L160,250 L140,180 Z"
                  fill="#0F2B1D"
                  stroke="#1A4D33"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Connecting Curved Gold Supply Flight Lines */}
                {/* Line 1: Kharsang (Arunachal Pradesh) [X:680, Y:150] to Thane (Maharashtra) [X:220, Y:310] */}
                <path
                  d="M 680 150 Q 420 180 220 310"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6 6"
                  className="animate-pulse"
                />
                
                {/* Line 2: Kharsang [X:680, Y:150] to Kolkata [X:540, Y:260] */}
                <path
                  d="M 680 150 Q 610 200 540 260"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="4 4"
                />

                {/* Line 3: Thane [X:220, Y:310] to Kolkata [X:540, Y:260] */}
                <path
                  d="M 220 310 Q 380 320 540 260"
                  stroke="#C5A880"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="3 3"
                />

                {/* Export Arrow Vectors Outward to International Seas */}
                <path
                  d="M 540 260 L 480 220 M 540 260 L 590 320 M 540 260 L 650 310"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  opacity="0.6"
                />

                {/* NODE 1: KHARSANG (Arunachal Pradesh) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode("kharsang")}
                >
                  <circle cx="680" cy="150" r="18" fill="#10B981" fillOpacity="0.2" className="animate-ping" />
                  <circle cx="680" cy="150" r="10" fill="#10B981" stroke="#D4AF37" strokeWidth="2.5" />
                  <circle cx="680" cy="150" r="4" fill="#FBF9F6" />
                  <text x="695" y="145" fill="#10B981" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                    Kharsang Estate (Origin)
                  </text>
                  <text x="695" y="162" fill="#C5A880" fontSize="10" fontFamily="monospace">
                    Arunachal Pradesh · 800m ASL
                  </text>
                </g>

                {/* NODE 2: THANE (Maharashtra Corporate HQ) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode("thane")}
                >
                  <circle cx="220" cy="310" r="16" fill="#D4AF37" fillOpacity="0.2" className="animate-ping" />
                  <circle cx="220" cy="310" r="9" fill="#D4AF37" stroke="#0F2B1D" strokeWidth="2" />
                  <circle cx="220" cy="310" r="3.5" fill="#0F2B1D" />
                  <text x="110" y="305" fill="#D4AF37" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                    Thane Corporate HQ
                  </text>
                  <text x="110" y="322" fill="#C5A880" fontSize="10" fontFamily="monospace">
                    CIN: U15100MH2019PTC331942
                  </text>
                </g>

                {/* NODE 3: KOLKATA PORT (Export Gateway) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode("kolkata")}
                >
                  <circle cx="540" cy="260" r="14" fill="#0284C7" fillOpacity="0.2" className="animate-ping" />
                  <circle cx="540" cy="260" r="8" fill="#0284C7" stroke="#D4AF37" strokeWidth="2" />
                  <text x="555" y="255" fill="#38BDF8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                    Kolkata Maritime Gateway
                  </text>
                  <text x="555" y="272" fill="#C5A880" fontSize="10" fontFamily="monospace">
                    FCL Ocean Container Loading
                  </text>
                </g>

              </svg>
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-stone-600 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-stone-100 border border-white" />
                <span>Harvest &amp; Processing (Kharsang)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-champagne border border-white" />
                <span>Corporate HQ (Thane)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-stone-100 border border-white" />
                <span>Maritime Export Port (Kolkata)</span>
              </div>
            </div>

          </div>

          {/* NODE DETAILS SIDEBAR PANEL (5 cols) */}
          <div className="lg:col-span-5 bg-charcoal border-2 border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Selector Tabs for Map Nodes */}
              <div className="flex items-center gap-2 border-b border-white/20 pb-3" data-testid="sourcing-node-tabs">
                <button
                  type="button"
                  onClick={() => setSelectedNode("kharsang")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedNode === "kharsang"
                      ? "bg-champagne text-charcoal"
                      : "bg-charcoal text-stone-600 hover:text-white"
                  }`}
                >
                  Kharsang Estate
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNode("thane")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedNode === "thane"
                      ? "bg-champagne text-charcoal"
                      : "bg-charcoal text-stone-600 hover:text-white"
                  }`}
                >
                  Thane HQ
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNode("kolkata")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedNode === "kolkata"
                      ? "bg-champagne text-charcoal"
                      : "bg-charcoal text-stone-600 hover:text-white"
                  }`}
                >
                  Kolkata Port
                </button>
              </div>

              {/* Node Title & Specs */}
              <div>
                <span className="text-[10px] font-mono text-stone-800 uppercase tracking-widest font-bold block">
                  {NODES[selectedNode].type}
                </span>
                <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                  {NODES[selectedNode].name}
                </h3>
                <p className="text-xs text-stone-800 font-mono mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-800" />
                  <span>{NODES[selectedNode].location}</span>
                </p>
                {NODES[selectedNode].coords && (
                  <p className="text-[11px] text-stone-600 font-mono mt-0.5">
                    Coordinates: {NODES[selectedNode].coords}
                  </p>
                )}
              </div>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Operational Core Pillars:
                </span>
                {NODES[selectedNode].highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-600">
                    <CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Actions inside Card */}
            <div className="pt-4 border-t border-white/20 space-y-3">
              <div className="p-3 bg-charcoal rounded-xl border border-white/20 text-[11px] text-stone-600 font-mono">
                <span className="text-stone-800 font-bold block mb-0.5">Global Freight Guarantee:</span>
                All tea dispatches are protected with 3-ply vacuum aluminum foil liners to retain fresh mountain volatile aromatics during sea voyage.
              </div>

              <button
                type="button"
                onClick={() => onNavigateTab("sourcing")}
                className="w-full bg-gradient-to-r from-champagne to-champagne hover:from-champagne hover:to-champagne text-charcoal font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Read Full Terroir Chronicles</span>
                <ArrowRight className="w-4 h-4 text-charcoal" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
