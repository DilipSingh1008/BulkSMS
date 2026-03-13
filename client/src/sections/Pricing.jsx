import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Star,
  X,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pricing");
        const data = await res.json();
        const activePlans = data.data.filter(
          (p) => p.status === true && p.isDeleted === false,
        );
        setPlans(activePlans);
      } catch (err) {
        setError("Unable to load pricing plans.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const enquirySchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid").required("Required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "10 digits")
      .required("Required"),
    message: Yup.string().min(10, "Too short").required("Required"),
  });

  if (loading)
    return (
      <div className="py-24 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <section id="pricing" className="py-10 bg-slate-50/50 px-6">
      <div className="max-w-6xl mx-auto">
        {/* --- Header: Balanced Size --- */}
        <div className="flex flex-col items-center text-center justify-center mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg mb-4">
              <ShieldCheck size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Transparent Pricing
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Ready to <span className="text-blue-600">Scale</span> Your{" "}
              Business <span className="text-emerald-500">Growth?</span>
            </h2>
          </div>
        </div>

        {/* --- Grid: Same as Services Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`group relative bg-white rounded-3xl border p-8 transition-all duration-300 flex flex-col hover:shadow-xl hover:-translate-y-1 ${
                plan.popular
                  ? "border-emerald-500 shadow-lg"
                  : "border-slate-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-8 bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md">
                  <Star size={12} fill="currentColor" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-xl font-black text-slate-900 mb-2">
                  {plan.name}
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {plan.desc}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 tracking-tight">
                  {plan.price}
                </span>
                <span className="text-slate-400 text-sm font-bold uppercase">
                  / {plan.period}
                </span>
              </div>

              <div className="w-full h-px bg-slate-100 mb-8"></div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm font-semibold text-slate-600"
                  >
                    <CheckCircle2
                      size={18}
                      className={
                        plan.popular ? "text-emerald-500" : "text-blue-600"
                      }
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-4 cursor-pointer rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100"
                }`}
              >
                Select Plan <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- Enquiry Modal: Balanced & Modern --- */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm relative shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-50 relative">
              <button
                className="absolute cursor-pointer top-4 right-4 text-slate-400 hover:text-slate-600"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
              <h3 className="text-lg font-bold text-slate-900">Enquiry Form</h3>
              <p className="text-xs text-slate-500">
                Plan: {selectedPlan.name}
              </p>
            </div>

            {/* Formik Form */}
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile: "",
                message: "",
              }}
              validationSchema={enquirySchema}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                try {
                  const res = await fetch("http://localhost:5000/api/enquiry", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...values,
                      planId: selectedPlan._id,
                    }),
                  });
                  const data = await res.json();
                  console.log(data);

                  alert("Request Submitted Successfully");
                  resetForm();
                  setIsModalOpen(false);
                } catch (err) {
                  console.error(err);
                  alert("Something went wrong");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Field
                        name="name"
                        placeholder="Full Name"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500 transition-all"
                      />
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500 transition-all"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        name="mobile"
                        placeholder="Mobile Number"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500 transition-all"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Message"
                        rows="3"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500 transition-all resize-none"
                      />
                      <ErrorMessage
                        name="message"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </section>
  );
}
