import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import {
  Package,
  X,
  Send,
  CheckCircle2,
  Building,
  Mail,
  Globe,
  FileCheck,
  ShieldCheck,
  Sparkles,
  Loader2,
  Check,
  Phone,
  HelpCircle,
  Truck
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

export default function SampleRequestModal({ initialGrade = "", isOpenOverride = null, onCloseOverride = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    teaGrades: initialGrade ? [initialGrade] : ["Kharsang Golden Tips Orthodox (SFTGFOP1)"],
    quantityKg: "250",
    sampleKitType: "Comprehensive Single-Estate Export Sample Box (All 6 Grades)",
    targetPort: "FOB Kolkata Port / CIF Air Freight",
    customNotes: ""
  });

  const modalOpen = isOpenOverride !== null ? isOpenOverride : isOpen;

  const handleClose = () => {
    if (onCloseOverride) {
      onCloseOverride();
    } else {
      setIsOpen(false);
    }
    // reset form submission state after closing animation
    setTimeout(() => {
      setSubmittedData(null);
    }, 300);
  };

  const handleGradeToggle = (grade) => {
    setFormData(prev => {
      const exists = prev.teaGrades.includes(grade);
      if (exists) {
        if (prev.teaGrades.length === 1) return prev; // Keep at least one
        return { ...prev, teaGrades: prev.teaGrades.filter(g => g !== grade) };
      } else {
        return { ...prev, teaGrades: [...prev.teaGrades, grade] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.companyName || !formData.email) {
      toast.error("Please fill in all required fields (Name, Company, Email)");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        country: formData.country || "International",
        teaGrade: formData.teaGrades.join(", "),
        quantityKg: parseInt(formData.quantityKg, 10) || 100,
        customBlendingNotes: `[SAMPLE KIT INQUIRY] Kit Type: ${formData.sampleKitType}. Phone/WhatsApp: ${formData.phone || "N/A"}. Notes: ${formData.customNotes || "None"}`,
        targetPort: formData.targetPort
      };

      const res = await axios.post(`${BACKEND_URL}/api/rfq`, payload);

      if (res.data && res.data.success) {
        setSubmittedData(res.data);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success("Sample Request Dispatched!", {
          description: `Reference ID: ${res.data.referenceId}. Inquiry notification sent directly to sales desk at atweeltea@gmail.com.`
        });
      } else {
        throw new Error("Submission returned unverified response");
      }
    } catch (err) {
      console.error("Error submitting sample request:", err);
      toast.error("Failed to submit request", {
        description: err.response?.data?.error || "Please try again or email atweeltea@gmail.com directly."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING ACTION BUTTON — Always visible at bottom right */}
      {isOpenOverride === null && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3" data-testid="floating-sample-container">
          <button
            onClick={() => setIsOpen(true)}
            data-testid="floating-request-sample-btn"
            className="group relative flex items-center gap-3 bg-gradient-to-r from-black via-black to-black text-white border-2 border-gray-200 hover:border-white/40 px-5 py-3.5 rounded-none shadow-none hover:shadow-gray-400/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Shimmer animation effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out" />

            <div className="relative flex items-center justify-center w-8 h-8 rounded-none bg-black text-white shadow-none group-hover:rotate-12 transition-transform duration-300">
              <Package className="w-4 h-4 font-bold" />
            </div>

            <div className="relative text-left">
              <span className="block text-[10px] uppercase font-mono text-gray-200 tracking-widest font-semibold leading-none">
                100% Organic Garden
              </span>
              <span className="block font-sans tracking-tight text-sm font-bold text-white tracking-wide mt-0.5 whitespace-nowrap">
                Request Sample Kit
              </span>
            </div>

            <div className="relative w-2 h-2 rounded-none bg-black animate-pulse ml-1" />
          </button>
        </div>
      )}

      {/* SAMPLE REQUEST MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          data-testid="sample-request-modal"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl bg-gray-50 rounded-none border-2 border-black/20 shadow-none overflow-hidden my-6 text-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="bg-black text-white p-6 sm:p-8 border-b border-gray-200 flex items-start justify-between relative">
              <div className="space-y-1.5 pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-black border border-gray-200 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Direct Export Sales Desk</span>
                </div>
                <h3 className="font-sans tracking-tight text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Request Organic Tea Samples
                </h3>
                <p className="text-xs text-black/80 font-sans leading-relaxed">
                  Direct from Atweel Estate (Kharsang, Arunachal Pradesh). Free sample kits available for registered importers &amp; tea brands.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-none bg-black text-gray-400 hover:text-white hover:bg-gray-50 transition-colors border border-gray-200 cursor-pointer shrink-0"
                data-testid="close-sample-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {submittedData ? (
                /* SUCCESS STATE */
                <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300" data-testid="sample-request-success">
                  <div className="w-20 h-20 rounded-none bg-gray-50 text-black border-2 border-gray-200 flex items-center justify-center mx-auto shadow-none">
                    <CheckCircle2 className="w-12 h-12 text-gray-400" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-black">Sample Dispatch Pre-Authorized</span>
                    <h4 className="font-sans tracking-tight text-2xl font-bold text-black">
                      Inquiry Transmitted to Sales Team
                    </h4>
                    <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                      Thank you! Your sample request has been pre-configured and emailed directly to our export team at <strong className="text-black">atweeltea@gmail.com</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-none bg-gray-50 border border-gray-200 max-w-md mx-auto text-left space-y-2 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="font-bold text-gray-400 uppercase text-[10px]">Reference Number:</span>
                      <span className="font-mono font-bold text-black text-sm">{submittedData.referenceId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-400 uppercase text-[10px]">Recipient Email:</span>
                      <span className="font-semibold text-black">{submittedData.notificationEmail || "atweeltea@gmail.com"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-400 uppercase text-[10px]">Confirmation Status:</span>
                      <span className="inline-flex items-center gap-1 text-gray-400 font-bold">
                        <Check className="w-3.5 h-3.5" /> Dispatched
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={handleClose}
                      data-testid="close-success-sample-modal"
                      className="bg-black hover:bg-black text-gray-400 font-bold px-8 py-3 rounded-none text-xs uppercase tracking-wider transition-all shadow-none border border-gray-200 cursor-pointer"
                    >
                      Done &amp; Return to Website
                    </button>
                  </div>
                </div>
              ) : (
                /* INPUT FORM */
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="sample-request-form">
                  {/* CONTACT & COMPANY INFO */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-black uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
                      <Building className="w-4 h-4 text-black" />
                      <span>1. Company &amp; Contact Details</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-black mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Alexander Wright"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-none px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-2 focus:ring-charcoal"
                          data-testid="sample-input-fullname"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-black mb-1">
                          Company / Brand Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Silk Road Tea Co."
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-none px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-2 focus:ring-charcoal"
                          data-testid="sample-input-company"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-black mb-1">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="import@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-none px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-2 focus:ring-charcoal"
                          data-testid="sample-input-email"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-black mb-1">
                          Phone / WhatsApp (With Country Code)
                        </label>
                        <input
                          type="text"
                          placeholder="+1 555 234 5678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-none px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-2 focus:ring-charcoal"
                          data-testid="sample-input-phone"
                        />
                      </div>
                    </div>
                  </div>

                  {/* DESTINATION & SAMPLE SELECTION */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-black uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-black" />
                      <span>2. Destination &amp; Tea Grades Requested</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-black mb-1">
                          Destination Country / Port
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., United Kingdom / Germany / USA"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-none px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-2 focus:ring-charcoal"
                          data-testid="sample-input-country"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-black mb-1">
                          Expected Order Quantity (KG)
                        </label>
                        <select
                          value={formData.quantityKg}
                          onChange={(e) => setFormData({ ...formData, quantityKg: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-none px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-2 focus:ring-charcoal"
                          data-testid="sample-select-quantity"
                        >
                          <option value="100">100 KG – 500 KG (Trial Batch)</option>
                          <option value="500">500 KG – 2,000 KG (LCL Shipment)</option>
                          <option value="10000">10,000 KG+ (20ft FCL Container)</option>
                          <option value="25000">25,000 KG+ (40ft FCL Annual Contract)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black mb-2">
                        Select Tea Grades for Sample Kit:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {[
                          "Kharsang Golden Tips Orthodox (SFTGFOP1)",
                          "Atweel Estate Whole Leaf Black (FTGFOP)",
                          "Arunachal Silver Needle White Tea",
                          "Kharsang Emerald Green Tea",
                          "Atweel Reserve Oolong",
                          "Organic Premium CTC Granules"
                        ].map((grade) => {
                          const isSelected = formData.teaGrades.includes(grade);
                          return (
                            <button
                              type="button"
                              key={grade}
                              onClick={() => handleGradeToggle(grade)}
                              className={`flex items-center justify-between p-2.5 rounded-none border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-black text-white border-black/20"
                                  : "bg-white text-black border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <span className="font-medium pr-2 text-[11px]">{grade}</span>
                              <div className={`w-4 h-4 rounded-none flex items-center justify-center shrink-0 ${
                                isSelected ? "bg-black text-white" : "border border-gray-200"
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* CUSTOM NOTES */}
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Shipping Address / Special Requirements
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Please include full delivery address for courier, or custom packaging preferences..."
                      value={formData.customNotes}
                      onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-none p-3 text-xs text-black focus:outline-none focus:ring-2 focus:ring-charcoal"
                      data-testid="sample-input-notes"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>Sent directly to sales team (atweeltea@gmail.com)</span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      data-testid="submit-sample-request-btn"
                      className="w-full sm:w-auto bg-gradient-to-r from-black via-black to-black hover:brightness-110 text-black font-bold px-8 py-3.5 rounded-none text-xs uppercase tracking-widest transition-all shadow-none border border-gray-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Dispatching Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black" />
                          <span>Submit Sample Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
