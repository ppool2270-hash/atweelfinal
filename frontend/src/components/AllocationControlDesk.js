import React, { useState } from "react";
import {
  Boxes,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight,
  Filter,
  Download,
  Info,
  Calendar,
  Layers,
  Send,
  Plus,
  Check
} from "lucide-react";

const ALLOCATION_GRADES = [
  {
    id: "grade-1",
    name: "Kharsang Golden Tips Orthodox",
    gradeCode: "SFTGFOP1",
    category: "Orthodox Whole Leaf",
    flush: "2nd Flush 2024 Harvest",
    totalCapacity: "25 Metric Tons",
    remainingAllocation: "14.2 Metric Tons",
    allocatedPercent: 43,
    moq: "100 KG",
    unitPriceFob: "$22.00 - $32.00 / KG",
    polyphenols: "26.4%",
    moisture: "2.95%",
    certifications: ["India Organic (NPOP)", "USDA Organic", "ISO 22000", "HACCP"],
    description: "Hand-plucked second flush golden tips from 800m altitude. Honeyed muscatel character with rich amber cup."
  },
  {
    id: "grade-2",
    name: "Atweel Estate Whole Leaf Black",
    gradeCode: "FTGFOP",
    category: "Orthodox Whole Leaf",
    flush: "Main Flush 2024",
    totalCapacity: "40 Metric Tons",
    remainingAllocation: "21.8 Metric Tons",
    allocatedPercent: 45,
    moq: "150 KG",
    unitPriceFob: "$16.50 - $22.00 / KG",
    polyphenols: "23.9%",
    moisture: "3.02%",
    certifications: ["India Organic (NPOP)", "EU Organic", "ISO 22000", "FSSAI"],
    description: "Classic whole leaf black tea from our 1,200-bigha garden. Rich malty body and coppery-red liquor."
  },
  {
    id: "grade-3",
    name: "Arunachal Silver Needle White",
    gradeCode: "Bai Hao Yin Zhen",
    category: "Specialty White",
    flush: "1st Flush Spring 2024",
    totalCapacity: "5 Metric Tons",
    remainingAllocation: "1.4 Metric Tons",
    allocatedPercent: 72,
    moq: "50 KG",
    unitPriceFob: "$68.00 - $92.00 / KG",
    polyphenols: "28.1%",
    moisture: "2.91%",
    certifications: ["India Organic (NPOP)", "USDA Organic", "EU Organic"],
    description: "Sun-withered unopened buds harvested only for two weeks in spring. Delicate melon notes and champagne cup."
  },
  {
    id: "grade-4",
    name: "Kharsang Emerald Green Tea",
    gradeCode: "Pan-Fired Leaf",
    category: "Organic Green",
    flush: "Spring Pluck 2024",
    totalCapacity: "30 Metric Tons",
    remainingAllocation: "18.5 Metric Tons",
    allocatedPercent: 38,
    moq: "100 KG",
    unitPriceFob: "$18.00 - $26.00 / KG",
    polyphenols: "24.8%",
    moisture: "2.98%",
    certifications: ["India Organic (NPOP)", "USDA Organic", "HACCP"],
    description: "Pan-fired green tea processed within four hours of harvest to lock in vegetal sweetness and high catechins."
  },
  {
    id: "grade-5",
    name: "Atweel Organic Premium CTC",
    gradeCode: "BPS / PF1 Granules",
    category: "Commercial CTC Bulk",
    flush: "Year-Round Harvest",
    totalCapacity: "150 Metric Tons",
    remainingAllocation: "68.0 Metric Tons",
    allocatedPercent: 54,
    moq: "500 KG (LCL/FCL)",
    unitPriceFob: "$6.80 - $9.50 / KG",
    polyphenols: "21.5%",
    moisture: "3.00%",
    certifications: ["India Organic (NPOP)", "FSSAI", "ISO 22000"],
    description: "High-density CTC granules engineered for milk chai brands, tea bags, and hospitality distributors."
  },
  {
    id: "grade-6",
    name: "Custom Enterprise Wholesale Blend",
    gradeCode: "Private Master Blend",
    category: "B2B Custom Formulation",
    flush: "Tailored to Order Spec",
    totalCapacity: "Custom Capacity",
    remainingAllocation: "Available on Inquiry",
    allocatedPercent: 20,
    moq: "1,000 KG",
    unitPriceFob: "Custom Contract Pricing",
    polyphenols: "Spec Targeted",
    moisture: "3.00% Guaranteed",
    certifications: ["Custom Certification Package"],
    description: "Proprietary flavor and granule size profiling mixed by our master tea blenders for global brand packaging."
  }
];

export default function AllocationControlDesk({ onOpenLeadForm }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reservedGrades, setReservedGrades] = useState([]);

  const filteredGrades = ALLOCATION_GRADES.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const handleToggleReserve = (grade) => {
    if (reservedGrades.some(g => g.id === grade.id)) {
      setReservedGrades(reservedGrades.filter(g => g.id !== grade.id));
    } else {
      setReservedGrades([...reservedGrades, grade]);
    }
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-gray-50 text-black border-b border-gray-200"
      id="allocation-desk"
      data-testid="allocation-control-desk"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-black text-gray-400 border border-gray-200 text-xs font-bold uppercase tracking-[0.25em] mb-3">
              <Boxes className="w-4 h-4 text-black" />
              <span>B2B Enterprise Inventory Control</span>
            </div>
            <h2 className="font-sans tracking-tight text-3xl sm:text-5xl font-bold text-black">
              Private Allocation Control Desk
            </h2>
            <p className="text-black-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Real-time harvest allocation matrix for international tea importers, blenders, and wholesale distributors. Lock in seasonal tonnage directly from Kharsang Estate.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {reservedGrades.length > 0 && (
              <button
                type="button"
                onClick={onOpenLeadForm}
                data-testid="lock-reserved-tonnage-btn"
                className="bg-gradient-to-r from-black to-black hover:from-black hover:to-black text-white font-bold px-5 py-3 rounded-none text-xs uppercase tracking-wider transition-all shadow-none flex items-center gap-2 animate-bounce"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Submit {reservedGrades.length} Reserved Allocation(s)</span>
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-8" data-testid="allocation-category-filters">
          {["All", "Orthodox Whole Leaf", "Specialty White", "Organic Green", "Commercial CTC Bulk", "B2B Custom Formulation"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-none text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-black text-gray-400 shadow-none border border-black/20"
                  : "bg-white text-black hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TABULAR INVENTORY ALLOCATION MATRIX */}
        <div className="bg-white border-2 border-gray-200 rounded-none overflow-hidden shadow-none mb-10">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" data-testid="allocation-matrix-table">
              
              {/* TABLE HEADER */}
              <thead>
                <tr className="bg-black text-gray-400 text-[11px] font-mono uppercase tracking-widest border-b border-gray-200">
                  <th className="py-4 px-6 font-bold">Grade &amp; Category</th>
                  <th className="py-4 px-6 font-bold">Flush Harvest</th>
                  <th className="py-4 px-6 font-bold">Remaining Allocation</th>
                  <th className="py-4 px-6 font-bold">MOQ &amp; FOB Price</th>
                  <th className="py-4 px-6 font-bold">Lab Specs</th>
                  <th className="py-4 px-6 font-bold text-right">Allocation Action</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-slate-100 text-xs text-black">
                {filteredGrades.map((grade) => {
                  const isReserved = reservedGrades.some(g => g.id === grade.id);
                  return (
                    <tr 
                      key={grade.id} 
                      className="hover:bg-gray-50/80 transition-colors group"
                      data-testid={`allocation-row-${grade.id}`}
                    >
                      
                      {/* Grade Info */}
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-none bg-black text-gray-400 font-mono text-[10px] font-bold">
                              {grade.gradeCode}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {grade.category}
                            </span>
                          </div>
                          <strong className="font-sans tracking-tight text-base font-bold text-black block">
                            {grade.name}
                          </strong>
                          <p className="text-[11px] text-gray-400 max-w-xs leading-relaxed">
                            {grade.description}
                          </p>
                        </div>
                      </td>

                      {/* Flush */}
                      <td className="py-5 px-6 font-mono text-xs">
                        <span className="inline-block px-2.5 py-1 rounded-none bg-gray-50 text-black font-bold border border-gray-200">
                          {grade.flush}
                        </span>
                      </td>

                      {/* Remaining Allocation Progress */}
                      <td className="py-5 px-6">
                        <div className="space-y-1.5 w-48">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-bold text-black">{grade.remainingAllocation}</span>
                            <span className="text-gray-400 text-[10px]">{100 - grade.allocatedPercent}% Avail</span>
                          </div>
                          <div className="w-full bg-gray-50 h-2 rounded-none overflow-hidden border border-gray-200">
                            <div 
                              className="bg-gradient-to-r from-lightgrey to-black h-full rounded-none"
                              style={{ width: `${100 - grade.allocatedPercent}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-gray-400 block font-mono">
                            Total Crop: {grade.totalCapacity}
                          </span>
                        </div>
                      </td>

                      {/* MOQ & Price */}
                      <td className="py-5 px-6">
                        <div className="space-y-0.5 font-mono">
                          <strong className="text-gray-400 font-bold block text-sm">
                            {grade.unitPriceFob}
                          </strong>
                          <span className="text-gray-400 text-[11px] block">
                            MOQ: {grade.moq}
                          </span>
                        </div>
                      </td>

                      {/* Lab Specs */}
                      <td className="py-5 px-6">
                        <div className="space-y-1 text-[11px] font-mono">
                          <div className="flex items-center gap-1.5 text-black">
                            <span className="text-gray-400">Polyphenols:</span>
                            <strong className="text-gray-400">{grade.polyphenols}</strong>
                          </div>
                          <div className="flex items-center gap-1.5 text-black">
                            <span className="text-gray-400">Moisture:</span>
                            <strong className="text-gray-400">{grade.moisture}</strong>
                          </div>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleReserve(grade)}
                          data-testid={`reserve-btn-${grade.id}`}
                          className={`px-4 py-2.5 rounded-none text-xs font-bold font-mono transition-all uppercase tracking-wider inline-flex items-center gap-1.5 ${
                            isReserved
                              ? "bg-gray-50 text-black shadow-none border border-gray-200"
                              : "bg-black text-gray-400 hover:bg-black border border-gray-200"
                          }`}
                        >
                          {isReserved ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Reserved</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 text-black" />
                              <span>Reserve Tonnage</span>
                            </>
                          )}
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="bg-black text-gray-50 p-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-black shrink-0" />
              <span>
                <strong>B2B Logistics Note:</strong> Container freight bookings (20ft FCL = ~10 Metric Tons, 40ft FCL = ~22 Metric Tons) are sealed in vacuum aluminum foil barrier bags prior to departure from Kolkata Port.
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenLeadForm}
              className="bg-black hover:bg-black text-white font-bold px-5 py-2.5 rounded-none text-xs uppercase tracking-wider transition-all shrink-0"
            >
              Request Custom Bulk Blending Spec
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
