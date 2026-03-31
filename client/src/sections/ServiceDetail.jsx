import React, { useEffect, useState } from "react";
import { CheckCircle2, Star, X, ArrowRight, ShieldCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ServiceDetailPricing() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const enquirySchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid").required("Required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "10 digits")
      .required("Required"),
    message: Yup.string().min(10, "Too short").required("Required"),
  });
  const plans = service?.pricePlans || [];
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${API_URL}/services/getData/${id}`);
        console.log(res);
        const data = await res.json();
        setService(data);
      } catch (err) {
        setError("Unable to load service pricing.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading)
    return (
      <div className="py-24 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );

  if (error)
    return (
      <div className="py-24 text-center text-red-500 font-bold">{error}</div>
    );

  if (!plans) return null;

  return (
    <section id="pricing" className="py-20 bg-slate-50/50 px-6">
      <div className="max-w-6xl mx-auto mt-15">
        {/* Header */}
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
        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.pricePlans?.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-lg font-semibold text-slate-700 mb-2">
                No pricing plans available
              </p>
              <p className="text-sm text-slate-500">
                Plans are being updated. Please check back later.
              </p>
            </div>
          ) : (
            plans.map((plan) => (
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

                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">
                    ₹{plan.price}
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
                  onClick={() => {
                    setSelectedPlan(plan);
                    setIsModalOpen(true);
                  }}
                  className={`w-full py-4 cursor-pointer rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100"
                  }`}
                >
                  Select Plan <ArrowRight size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Enquiry Modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm relative shadow-2xl animate-in fade-in zoom-in duration-200">
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

            <Formik
              initialValues={{ name: "", email: "", mobile: "", message: "" }}
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
                  <Field
                    name="name"
                    placeholder="Full Name"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-xs"
                  />

                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs"
                  />

                  <Field
                    name="mobile"
                    placeholder="Mobile Number"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="p"
                    className="text-red-500 text-xs"
                  />

                  <Field
                    as="textarea"
                    name="message"
                    placeholder="Message"
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm focus:border-blue-500 resize-none"
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-500 text-xs"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700"
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
