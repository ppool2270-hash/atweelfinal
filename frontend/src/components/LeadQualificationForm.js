import React, { useState } from "react";
import axios from "axios";
import {
  Send,
  Building,
  Globe,
  CheckCircle2,
  X,
  FileCheck,
  ShieldCheck,
  Package,
  Award,
  Sparkles,
  HelpCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

export default function LeadQualificationForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    companyName: "",
    buyerName: "",
    corporateTitle: "",
    email: "",
    phone: "",
    countryDestination: "",
    businessType: "Tea Importer & Wholesale Distributor",
    targetVolume: "20ft FCL Container (10 Metric Tons)",
    incoterms: "FOB Kolkata Port",
    teaCategories: ["Kharsang Golden Tips Orthodox", "Organic CTC Premium"],
    customBlendingReq: "",
    deliveryTimeline: "Q3 / Q4 2024 Crop",
    sampleKitRequested: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckbox = (cat) => {
    if (formData.teaCategories.includes(cat)) {
      setFormData({
        ...formData,
        teaCategories: formData.teaCategories.filter(c => c !== cat)
      });
    } else {
      setFormData({
        ...formData,
        teaCategories: [...formData.teaCategories, cat]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        fullName: formData.buyerName || "Importers Office",
        companyName: formData.companyName,
        email: formData.email,
        country: formData.countryDestination || "International",
        teaGrade: formData.teaCategories.join(", ") || "Kharsang Golden Tips Orthodox",
        quantityKg: formData.targetVolume.includes("20ft") ? 10000 : 500,
        customBlendingNotes: `[ENTERPRISE QUALIFICATION] Title: ${formData.corporateTitle}. Type: ${formData.businessType}. Notes: ${formData.customBlendingReq || "None"}`,
        targetPort: formData.incoterms
      };

      const res = await axios.post(`${BACKEND_URL}/api/rfq`, payload);

      setSubmitted(true);
      toast.success("B2B Importer Intent Registered & Email Dispatched", {
        description: `Reference ID: ${res.data?.referenceId || "Dispatched"}. Inquiry details delivered to sales team.`
      });

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error("Error submitting lead qualification form:", err);
      toast.error("Error sending inquiry", {
        description: "Please try again or contact atweeltea@gmail.com directly."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
      data-testid="lead-qualification-modal"
    >
      <div className="relative w-full max-w-3xl bg-tata-bg-light rounded-3xl border-2 border-tata-dark/20 shadow-2xl overflow-hidden my-8">
        
        {/* MODAL HEADER */}
        <div className="bg-tata-dark text-tata-bg-light p-6 sm:p-8 border-b border-white/20 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tata-dark border border-white/20 text-tata-blue-light text-[10px] font-bold uppercase tracking-widest mb-2">
              <FileCheck className="w-3.5 h-3.5 text-tata-dark" />
              <span>Direct Enterprise Import Desk</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-tata-bg-light">
              Wholesale Allocation &amp; Sample Qualification
            </h3>
            <p className="text-xs text-tata-dark mt-1 font-sans">
              Atweel Food &amp; Beverages Pvt. Ltd.  ·  CIN: U15100MH2019PTC331942  ·  Thane Corporate Office
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-tata-dark text-tata-grey hover:text-white hover:bg-tata-dark transition-all border border-white/10 cursor-pointer"
            data-testid="close-lead-form-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-tata-bg-light text-tata-dark flex items-center justify-center mx-auto border-2 border-tata-grey-light">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-tata-dark">
                Importer Intent Qualification Submitted
              </h4>
              <p className="text-sm text-tata-grey max-w-md mx-auto">
                Thank you for submitting your wholesale parameters. Our trade desk directors (Kulshreshth Harishankar Dubey &amp; Rinku Govindanath Shukla) will review your target volume and issue formal FOB/CIF pricing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="lead-qualification-form">
              
              {/* SECTION 1: CORPORATE IDENTITY */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-tata-dark uppercase tracking-widest border-b border-tata-grey-light pb-2 flex items-center gap-2">
                  <Building className="w-4 h-4 text-tata-dark" />
                  <span>1. Corporate Identity &amp; Purchasing Officer</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-tata-dark mb-1">
                      Company / Legal Entity Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Hamburg Specialty Tea GmbH"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-white border border-tata-grey-light rounded-xl px-3.5 py-2.5 text-xs text-tata-dark font-sans focus:outline-none focus:ring-2 focus:ring-charcoal"
                      data-testid="lead-input-company-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-tata-dark mb-1">
                      Buyer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Jonathan Mercer"
                      value={formData.buyerName}
                      onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                      className="w-full bg-white border border-tata-grey-light rounded-xl px-3.5 py-2.5 text-xs text-tata-dark font-sans focus:outline-none focus:ring-2 focus:ring-charcoal"
                      data-testid="lead-input-buyer-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-tata-dark mb-1">
                      Corporate Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Chief Purchasing Officer / Import Manager"
                      value={formData.corporateTitle}
                      onChange={(e) => setFormData({ ...formData, corporateTitle: e.target.value })}
                      className="w-full bg-white border border-tata-grey-light rounded-xl px-3.5 py-2.5 text-xs text-tata-dark font-sans focus:outline-none focus:ring-2 focus:ring-charcoal"
                      data-testid="lead-input-corporate-title"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-tata-dark mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="purchasing@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-tata-grey-light rounded-xl px-3.5 py-2.5 text-xs text-tata-dark font-sans focus:outline-none focus:ring-2 focus:ring-charcoal"
                      data-testid="lead-input-email"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: IMPORT LOGISTICS */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-tata-dark uppercase tracking-widest border-b border-tata-grey-light pb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-tata-dark" />
                  <span>2. Import Destination &amp; Target Volumes</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-tata-dark mb-1">
                      Country of Destination Port *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Germany (Hamburg Port) / USA (New York)"
                      value={formData.countryDestination}
                      onChange={(e) => setFormData({ ...formData, countryDestination: e.target.value })}
                      className="w-full bg-white border border-tata-grey-light rounded-xl px-3.5 py-2.5 text-xs text-tata-dark font-sans focus:outline-none focus:ring-2 focus:ring-charcoal"
                      data-testid="lead-input-country"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-tata-dark mb-1">
                      Target Order Volume *
                    </label>
                    <select
                      value={formData.targetVolume}
                      onChange={(e) => setFormData({ ...formData, targetVolume: e.target.value })}
                      className="w-full bg-white border border-tata-grey-light rounded-xl px-3.5 py-2.5 text-xs text-tata-dark font-sans focus:outline-none focus:ring-2 focus:ring-charcoal"
                      data-testid="lead-select-target-volume"
                    >
                      <option value="Multi-Container Contract (40ft FCL)">Multi-Container Annual Contract (40ft FCL)</option>
                      <option value="20ft FCL Container (10 Metric Tons)">20ft FCL Container (Approx. 10 Metric Tons)</option>
                      <option value="500kg - 2,000kg LCL Bulk Shipment">500 KG – 2,000 KG LCL Bulk Pallet Shipment</option>
                      <option value="100kg - 500kg Trial Air Freight">100 KG – 500 KG Trial Air Freight Batch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-tata-dark mb-1">
                      Incoterms Preference
                    </label>
                    <select
                      value={formData.incoterms}
                      onChange={(e) => setFormData({ ...formData, incoterms: e.target.value })}
                      className="w-full bg-white border border-tata-grey-light rounded-xl px-3.5 py-2.5 text-xs text-tata-dark font-sans focus:outline-none focus:ring-2 focus:ring-charcoal"
                    >
                      <option value="FOB Kolkata Port">FOB Kolkata Port, India</option>
                      <option value="CIF Destination Port">CIF Destination Port (Insurance & Freight)</option>
                      <option value="CFR Destination Port">CFR Destination Port</option>
                      <option value="EXW Kharsang Estate Factory">EXW Kharsang Estate Factory, Arunachal Pradesh</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-tata-dark mb-1">
                      Business Type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full bg-white border border-tata-grey-light rounded-xl px-3.5 py-2.5 text-xs text-tata-dark font-sans focus:outline-none focus:ring-2 focus:ring-charcoal"
                    >
                      <option value="Tea Importer & Wholesale Distributor">Tea Importer &amp; Wholesale Distributor</option>
                      <option value="Private Label Retail Brand">Private Label Retail Brand</option>
                      <option value="Hospitality & Hotel Chain Supplier">Hospitality &amp; Hotel Chain Supplier</option>
                      <option value="Commercial Blender & Tea Packer">Commercial Blender &amp; Tea Packer</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: TEA CATEGORIES */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-tata-dark">
                  Select Required Tea Categories (Check all that apply):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    "Kharsang Golden Tips Orthodox (SFTGFOP1)",
                    "Atweel Estate Whole Leaf Black (FTGFOP)",
                    "Arunachal Silver Needle White Tea",
                    "Kharsang Emerald Green Tea",
                    "Organic Premium CTC Granules (BPS/PF1)",
                    "Custom Enterprise Blend Formulation"
                  ].map((cat) => (
                    <label 
                      key={cat} 
                      className="flex items-center gap-2 p-2 bg-white rounded-xl border border-tata-grey-light cursor-pointer hover:bg-tata-bg-light"
                    >
                      <input
                        type="checkbox"
                        checked={formData.teaCategories.includes(cat)}
                        onChange={() => handleCheckbox(cat)}
                        className="rounded border-tata-grey-light text-tata-dark focus:ring-charcoal"
                      />
                      <span className="text-tata-dark font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SECTION 4: CUSTOM REQUIREMENTS & SUBMIT */}
              <div>
                <label className="block text-xs font-bold text-tata-dark mb-1">
                  Custom Blending, Packaging or Certification Notes
                </label>
                <textarea
                  rows="2"
                  placeholder="Specify any required mesh size, organic seal preferences, or private label vacuum pouch specifications..."
                  value={formData.customBlendingReq}
                  onChange={(e) => setFormData({ ...formData, customBlendingReq: e.target.value })}
                  className="w-full bg-white border border-tata-grey-light rounded-xl p-3 text-xs text-tata-dark focus:outline-none focus:ring-2 focus:ring-charcoal"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2 border-t border-tata-grey-light flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-tata-grey font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-tata-grey" />
                  <span>NDAs respected. CIN: U15100MH2019PTC331942 Compliance.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="submit-lead-qualification-btn"
                  className="w-full sm:w-auto bg-tata-dark hover:bg-tata-dark text-tata-blue-light font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl border border-white/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-tata-dark" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-tata-dark" />
                      <span>Register Importer Intent</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
