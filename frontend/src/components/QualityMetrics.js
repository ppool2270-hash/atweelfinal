import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ReferenceLine,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell
} from "recharts";
import {
  Award,
  ShieldCheck,
  Activity,
  Droplets,
  Zap,
  CheckCircle2,
  Download,
  Info,
  Calendar,
  Sparkles,
  BarChart3,
  Sliders,
  FlaskConical,
  Check
} from "lucide-react";

// Batch data comparing Atweel Kharsang Single Estate against Industry Baselines
const POLYPHENOL_DATA = [
  { grade: "FTGFOP1 Golden", kharsang: 26.4, industry: 15.2, catechins: 18.8, flush: "1st Flush 2024" },
  { grade: "Silver Needle White", kharsang: 28.1, industry: 16.5, catechins: 20.2, flush: "1st Flush 2024" },
  { grade: "Specialty Green", kharsang: 24.8, industry: 14.8, catechins: 17.5, flush: "2nd Flush 2024" },
  { grade: "Premium Orthodox", kharsang: 23.9, industry: 14.2, catechins: 16.9, flush: "2nd Flush 2024" },
  { grade: "Kharsang BOP CTC", kharsang: 21.5, industry: 13.5, catechins: 15.1, flush: "Autumnal 2024" },
  { grade: "Organic Oolong", kharsang: 25.2, industry: 15.0, catechins: 17.8, flush: "Autumnal 2024" },
];

// Monthly Moisture Consistency Data (Target: 3.0%, Safe Band: 2.8% - 3.2%)
const MOISTURE_BATCH_DATA = [
  { batch: "Batch #101 (Jan)", moisture: 2.95, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 110 },
  { batch: "Batch #102 (Feb)", moisture: 3.02, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 112 },
  { batch: "Batch #103 (Mar)", moisture: 2.91, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 109 },
  { batch: "Batch #104 (Apr)", moisture: 3.08, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 111 },
  { batch: "Batch #105 (May)", moisture: 2.98, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 110 },
  { batch: "Batch #106 (Jun)", moisture: 3.04, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 113 },
  { batch: "Batch #107 (Jul)", moisture: 2.93, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 110 },
  { batch: "Batch #108 (Aug)", moisture: 3.01, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 112 },
  { batch: "Batch #109 (Sep)", moisture: 2.99, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 111 },
  { batch: "Batch #110 (Oct)", moisture: 3.05, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 112 },
  { batch: "Batch #111 (Nov)", moisture: 2.92, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 110 },
  { batch: "Batch #112 (Dec)", moisture: 3.00, target: 3.0, upperLimit: 3.2, lowerLimit: 2.8, temp: 111 },
];

// Spider Radar Data for Overall Quality Index
const RADAR_QUALITY_DATA = [
  { parameter: "Polyphenols", Kharsang: 98, IndustryAverage: 62, fullMark: 100 },
  { parameter: "Moisture Stability", Kharsang: 96, IndustryAverage: 70, fullMark: 100 },
  { parameter: "EGCG Catechins", Kharsang: 95, IndustryAverage: 58, fullMark: 100 },
  { parameter: "Theaflavins Ratio", Kharsang: 92, IndustryAverage: 65, fullMark: 100 },
  { parameter: "Pesticide MRL Safety", Kharsang: 100, IndustryAverage: 78, fullMark: 100 },
  { parameter: "Aroma Volatiles", Kharsang: 94, IndustryAverage: 64, fullMark: 100 },
];

// Custom Tooltip for Polyphenol Chart
const CustomPolyphenolTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-charcoal text-white p-3.5 rounded-xl border border-white/20 shadow-xl text-xs space-y-1.5 font-sans">
        <p className="font-bold font-serif text-stone-800 text-sm border-b border-white/10 pb-1">
          {label} ({data.flush})
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-stone-600">Kharsang Organic:</span>
          <span className="font-bold text-stone-600 font-mono">{data.kharsang}% Dry Wt</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-stone-600">Industry Standard:</span>
          <span className="font-bold text-stone-600 font-mono">{data.industry}% Dry Wt</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-stone-600">Active Catechins:</span>
          <span className="font-bold text-stone-600 font-mono">{data.catechins}%</span>
        </div>
        <div className="text-[10px] text-stone-600 pt-1 border-t border-white/10 font-mono">
          ▲ +{((data.kharsang - data.industry) / data.industry * 100).toFixed(1)}% Higher Bio-Active Potency
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Moisture Chart
const CustomMoistureTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const dev = Math.abs(data.moisture - data.target).toFixed(2);
    return (
      <div className="bg-charcoal text-white p-3.5 rounded-xl border border-stone-300/40 shadow-xl text-xs space-y-1.5 font-sans">
        <p className="font-bold font-serif text-stone-600 text-sm border-b border-white/10 pb-1">
          {label} — Factory Dryer Log
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-stone-600">Recorded Moisture:</span>
          <span className="font-bold text-stone-600 font-mono">{data.moisture}%</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-stone-600">Strict Quality Target:</span>
          <span className="font-bold text-stone-600 font-mono">3.00%</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-stone-600">Variance Deviation:</span>
          <span className="font-bold text-stone-600 font-mono">±{dev}%</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-stone-600">Dryer Temp:</span>
          <span className="font-bold text-stone-600 font-mono">{data.temp}°C</span>
        </div>
        <div className="text-[10px] text-stone-600 pt-1 border-t border-white/10 font-mono flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-stone-600" />
          <span>Optimal Sea-Container Shelf-Life Range</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function QualityMetrics() {
  const [activeMetricTab, setActiveMetricTab] = useState("polyphenols"); // polyphenols | moisture | radar
  const [selectedFlush, setSelectedFlush] = useState("All");
  const [downloadingReport, setDownloadingReport] = useState(false);

  // Filter polyphenol data based on flush filter
  const filteredPolyphenols = POLYPHENOL_DATA.filter((item) => {
    if (selectedFlush === "All") return true;
    return item.flush.includes(selectedFlush);
  });

  const handleDownloadQA = () => {
    setDownloadingReport(true);
    setTimeout(() => {
      setDownloadingReport(false);
      // Simulate downloading lab report PDF
      const link = document.createElement("a");
      link.href = "#";
      const blob = new Blob([
        `ATWEEL FOOD & BEVERAGES PVT LTD
LABORATORY QUALITY ANALYSIS REPORT — KHARSANG ESTATE
------------------------------------------------------
CIN: U15400AR2023PTC014285
Origin: Kharsang, Changlang District, Arunachal Pradesh, India

POLYPHENOL CONTENT AUDIT:
- Mean High Polyphenol Yield: 24.8% (Dry Weight)
- Total EGCG Catechins: 17.8% Average
- Benchmarked +65.2% above Indian Commercial Averages

MOISTURE STABILITY AUDIT:
- Target Standard: 3.00% ± 0.20%
- Facility Standard Deviation: ±0.05%
- Container Mold Risk Index: ZERO (0.00%)

Certified by Independent Eurofins & SGS Testing Protocols.`
      ], { type: "text/plain" });
      link.href = URL.createObjectURL(blob);
      link.download = "Atweel_Tea_Kharsang_Quality_Metrics_Report.txt";
      link.click();
    }, 1200);
  };

  return (
    <section 
      className="py-16 sm:py-20 bg-ivory text-charcoal-800 border-b border-white/20 relative overflow-hidden"
      id="quality-metrics"
      data-testid="quality-metrics-section"
    >
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-charcoal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-stone-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal text-amber-50 border border-white/20 text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-3">
              <FlaskConical className="w-4 h-4 text-stone-800" />
              <span>Kharsang Factory Laboratory Analytics</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
              Quality Metrics &amp; Lab Standards
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Empirical laboratory benchmarks from our 72,000 sq ft processing plant in Kharsang, Arunachal Pradesh — highlighting superior natural polyphenols and precise moisture stability for international B2B buyers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadQA}
              data-testid="download-qa-report-btn"
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal text-amber-50 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer border border-white/20"
            >
              {downloadingReport ? (
                <Sparkles className="w-4 h-4 animate-spin text-stone-800" />
              ) : (
                <Download className="w-4 h-4 text-stone-800" />
              )}
              <span>{downloadingReport ? "Generating Specs..." : "Download Lab Certificate PDF"}</span>
            </button>
          </div>
        </div>

        {/* TOP KPI HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10" data-testid="quality-kpi-cards">
          
          {/* Card 1: Mean Polyphenols */}
          <div className="bg-white border-2 border-charcoal/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-stone-100/10 rounded-bl-full pointer-events-none group-hover:bg-stone-100/20 transition-all" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">Bio-Active Yield</span>
              <div className="p-2 rounded-xl bg-stone-100 text-charcoal">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-charcoal">24.8%</div>
            <p className="text-xs text-stone-600 font-medium mt-1">
              Average Polyphenol Dry Wt
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono font-bold bg-stone-100 text-charcoal px-2 py-0.5 rounded border border-stone-300">
              ▲ +65.2% vs Industry Standard (15%)
            </span>
          </div>

          {/* Card 2: Moisture Standard */}
          <div className="bg-white border-2 border-white/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-stone-100 rounded-bl-full pointer-events-none group-hover:bg-stone-200 transition-all" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">Dryer Consistency</span>
              <div className="p-2 rounded-xl bg-stone-100 text-charcoal">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-charcoal">3.00%</div>
            <p className="text-xs text-stone-600 font-medium mt-1">
              Target Factory Moisture Index
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono font-bold bg-stone-100 text-charcoal px-2 py-0.5 rounded border border-stone-300">
              Tight Band: 2.80% – 3.20% (±0.05% Dev)
            </span>
          </div>

          {/* Card 3: EGCG Catechins */}
          <div className="bg-white border-2 border-charcoal/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-stone-100/10 rounded-bl-full pointer-events-none group-hover:bg-stone-100/20 transition-all" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">Antioxidant Index</span>
              <div className="p-2 rounded-xl bg-stone-100 text-charcoal">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-charcoal">17.8%</div>
            <p className="text-xs text-stone-600 font-medium mt-1">
              Active EGCG Catechin Ratio
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono font-bold bg-stone-100 text-charcoal px-2 py-0.5 rounded border border-stone-300">
              High Altitude Himalayan Growth Advantage
            </span>
          </div>

          {/* Card 4: Pesticide MRL Screening */}
          <div className="bg-white border-2 border-charcoal/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-stone-100/10 rounded-bl-full pointer-events-none group-hover:bg-stone-100/20 transition-all" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">Pesticide Residue</span>
              <div className="p-2 rounded-xl bg-stone-100 text-charcoal">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-charcoal">0.00 ppm</div>
            <p className="text-xs text-stone-600 font-medium mt-1">
              Eurofins / SGS 500+ Screen
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono font-bold bg-stone-100 text-charcoal px-2 py-0.5 rounded border border-stone-300">
              100% NPOP &amp; USDA Organic Compliant
            </span>
          </div>

        </div>

        {/* METRIC VISUALIZATION TABS */}
        <div className="bg-white border-2 border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl mb-10">
          
          {/* Tab Selection Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-300">
            <div className="flex flex-wrap items-center gap-2" data-testid="metric-tabs">
              <button
                type="button"
                onClick={() => setActiveMetricTab("polyphenols")}
                data-testid="tab-polyphenols"
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeMetricTab === "polyphenols"
                    ? "bg-charcoal text-amber-50 shadow-md border border-white/20"
                    : "bg-stone-100 text-charcoal hover:bg-champagne"
                }`}
              >
                <Zap className="w-4 h-4 text-stone-600" />
                <span>Polyphenol Content vs Industry</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMetricTab("moisture")}
                data-testid="tab-moisture"
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeMetricTab === "moisture"
                    ? "bg-charcoal text-amber-50 shadow-md border border-white/20"
                    : "bg-stone-100 text-charcoal hover:bg-champagne"
                }`}
              >
                <Droplets className="w-4 h-4 text-stone-600" />
                <span>Moisture Consistency (3.0% Standard)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMetricTab("radar")}
                data-testid="tab-radar"
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeMetricTab === "radar"
                    ? "bg-charcoal text-amber-50 shadow-md border border-white/20"
                    : "bg-stone-100 text-charcoal hover:bg-champagne"
                }`}
              >
                <BarChart3 className="w-4 h-4 text-stone-600" />
                <span>Overall QA Matrix Radar</span>
              </button>
            </div>

            {/* Sub-Filter for Polyphenols tab */}
            {activeMetricTab === "polyphenols" && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Flush Harvest:</span>
                <select
                  value={selectedFlush}
                  onChange={(e) => setSelectedFlush(e.target.value)}
                  className="bg-stone-100 border border-stone-300 rounded-xl text-xs font-bold px-3 py-1.5 text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                  data-testid="flush-filter-select"
                >
                  <option value="All">All Season Flushes</option>
                  <option value="1st Flush">1st Flush (Spring)</option>
                  <option value="2nd Flush">2nd Flush (Summer)</option>
                  <option value="Autumnal">Autumnal Harvest</option>
                </select>
              </div>
            )}
          </div>

          {/* TAB 1: POLYPHENOLS RECHARTS BAR/COMPOSED CHART */}
          {activeMetricTab === "polyphenols" && (
            <div data-testid="polyphenols-chart-container">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl font-bold text-charcoal">
                    Polyphenol &amp; Catechin Yield per Organic Grade (% Dry Weight)
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Kharsang's high-altitude microclimate yields 50–70% higher natural antioxidants than standard lowland estates.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-charcoal" />
                    <span className="text-charcoal font-bold">Kharsang Organic</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-champagne" />
                    <span className="text-charcoal font-bold">Industry Average</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-stone-100" />
                    <span className="text-charcoal font-bold">Active Catechins</span>
                  </div>
                </div>
              </div>

              <div className="h-80 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={filteredPolyphenols}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis 
                      dataKey="grade" 
                      tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
                      interval={0}
                    />
                    <YAxis 
                      unit="%" 
                      domain={[0, 32]} 
                      tick={{ fill: "#64748B", fontSize: 11 }}
                    />
                    <Tooltip content={<CustomPolyphenolTooltip />} />
                    <ReferenceLine 
                      y={15} 
                      stroke="#EF4444" 
                      strokeDasharray="4 4" 
                      label={{ value: "Global Commercial Baseline (15%)", fill: "#EF4444", fontSize: 10, position: "insideTopRight" }} 
                    />
                    <Bar 
                      dataKey="kharsang" 
                      name="Kharsang Single Estate" 
                      fill="#1A3A2B" 
                      radius={[6, 6, 0, 0]}
                      barSize={28}
                    >
                      {filteredPolyphenols.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 || index === 1 ? "#1A3A2B" : "#264D3E"} />
                      ))}
                    </Bar>
                    <Bar 
                      dataKey="industry" 
                      name="Industry Benchmark" 
                      fill="#D4AF37" 
                      radius={[6, 6, 0, 0]}
                      barSize={20}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="catechins" 
                      name="Catechin Breakdown" 
                      stroke="#0284C7" 
                      strokeWidth={3} 
                      dot={{ r: 5, fill: "#0284C7" }} 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 p-4 bg-ivory border border-white/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-charcoal">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-charcoal shrink-0" />
                  <span>
                    <strong>Lab Protocol:</strong> Total Polyphenols determined via Folin-Ciocalteu assay (ISO 14502-1). Catechins tested using High-Performance Liquid Chromatography (HPLC).
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-charcoal text-amber-50 px-2.5 py-1 rounded-full font-bold shrink-0">
                  Batch Certificate: ISO-14502 / NPOP Certified
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: MOISTURE STABILITY RECHARTS LINE CHART */}
          {activeMetricTab === "moisture" && (
            <div data-testid="moisture-chart-container">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl font-bold text-charcoal">
                    Kharsang Dryer Output Moisture Consistency Log (%)
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Strict adherence to 3.00% moisture prevents mold formation during maritime container ocean freight (60+ days shelf safety).
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-stone-100" />
                    <span className="text-charcoal font-bold">Recorded Moisture (%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-stone-100" />
                    <span className="text-charcoal font-bold">Strict Target (3.0%)</span>
                  </div>
                </div>
              </div>

              <div className="h-80 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={MOISTURE_BATCH_DATA}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis 
                      dataKey="batch" 
                      tick={{ fill: "#334155", fontSize: 10, fontWeight: 600 }}
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                      height={45}
                    />
                    <YAxis 
                      domain={[2.5, 3.5]} 
                      ticks={[2.6, 2.8, 3.0, 3.2, 3.4]}
                      unit="%" 
                      tick={{ fill: "#64748B", fontSize: 11 }}
                    />
                    <Tooltip content={<CustomMoistureTooltip />} />
                    
                    {/* Safe moisture band highlight between 2.8% and 3.2% */}
                    <ReferenceArea 
                      y1={2.8} 
                      y2={3.2} 
                      fill="#10B981" 
                      fillOpacity={0.08} 
                      strokeOpacity={0}
                    />
                    <ReferenceLine 
                      y={3.0} 
                      stroke="#0284C7" 
                      strokeWidth={2} 
                      strokeDasharray="4 4"
                      label={{ value: "Target (3.00%)", fill: "#0284C7", fontSize: 10, position: "insideTopLeft" }}
                    />
                    <ReferenceLine 
                      y={3.2} 
                      stroke="#F59E0B" 
                      strokeDasharray="2 2"
                      label={{ value: "Max Limit (3.2%)", fill: "#F59E0B", fontSize: 9, position: "insideTopRight" }}
                    />
                    <ReferenceLine 
                      y={2.8} 
                      stroke="#F59E0B" 
                      strokeDasharray="2 2"
                      label={{ value: "Min Limit (2.8%)", fill: "#F59E0B", fontSize: 9, position: "insideBottomRight" }}
                    />

                    <Line 
                      type="monotone" 
                      dataKey="moisture" 
                      stroke="#059669" 
                      strokeWidth={3} 
                      activeDot={{ r: 8, fill: "#10B981", stroke: "#1A3A2B", strokeWidth: 2 }}
                      dot={{ r: 5, fill: "#059669" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 p-4 bg-stone-100/70 border border-stone-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-charcoal">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0" />
                  <span>
                    <strong>Quality Assurance Guarantee:</strong> Maximum recorded variance across 12 monthly factory batches was <strong>±0.08%</strong>. Zero batches exceeded the 3.20% ceiling.
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-charcoal text-stone-600 px-2.5 py-1 rounded-full font-bold shrink-0">
                  Vacuum Foil Bag Protection Standard
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: OVERALL QUALITY RADAR CHART */}
          {activeMetricTab === "radar" && (
            <div data-testid="radar-chart-container">
              <div className="mb-4 text-center max-w-xl mx-auto">
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  360° Quality Radar Index Comparison
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Multi-parameter lab audit comparing Kharsang Single Estate tea against global commercial benchmarks (Scaled 0 – 100).
                </p>
              </div>

              <div className="h-80 sm:h-96 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={RADAR_QUALITY_DATA}>
                    <PolarGrid stroke="#CBD5E1" />
                    <PolarAngleAxis dataKey="parameter" tick={{ fill: "#1E293B", fontSize: 11, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Radar
                      name="Kharsang Organic Single Estate"
                      dataKey="Kharsang"
                      stroke="#1A3A2B"
                      fill="#1A3A2B"
                      fillOpacity={0.5}
                    />
                    <Radar
                      name="Global Industry Benchmark"
                      dataKey="IndustryAverage"
                      stroke="#D4AF37"
                      fill="#D4AF37"
                      fillOpacity={0.3}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 p-4 bg-ivory border border-white/20 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-center">
                <div className="p-2 bg-white rounded-xl border border-stone-300">
                  <span className="text-stone-600 block text-[10px] uppercase font-mono">Pesticide Residue</span>
                  <strong className="text-stone-600 font-bold text-sm">100 / 100 Perfect Clean</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-300">
                  <span className="text-stone-600 block text-[10px] uppercase font-mono">Polyphenol Potency</span>
                  <strong className="text-charcoal font-bold text-sm">98 / 100 Grade AAA</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-300">
                  <span className="text-stone-600 block text-[10px] uppercase font-mono">Container Shelf Life</span>
                  <strong className="text-stone-600 font-bold text-sm">96 / 100 Extended Stability</strong>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM FACTORY QA AUDIT STANDARDS FOOTER */}
        <div className="bg-gradient-to-r from-charcoal to-charcoal text-white rounded-2xl p-6 sm:p-8 border border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-50 font-bold">
              Factory Protocol Summary · Kharsang Estate
            </span>
            <h4 className="font-serif text-xl font-bold text-white">
              In-House Continuous Quality Monitoring System
            </h4>
            <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
              Every tea batch passes through dual rare-earth magnetic separation, infrared moisture sensors, and independent Eurofins / SGS pesticide multi-residue screening prior to ocean container sealing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-3 py-2 bg-white/10 rounded-xl border border-white/20 text-center font-mono">
              <span className="block text-[10px] text-stone-300 uppercase">ISO Audit</span>
              <strong className="text-xs text-amber-50">22000:2018</strong>
            </div>
            <div className="px-3 py-2 bg-white/10 rounded-xl border border-white/20 text-center font-mono">
              <span className="block text-[10px] text-stone-300 uppercase">FSSAI Lic</span>
              <strong className="text-xs text-stone-300">10023083000182</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
