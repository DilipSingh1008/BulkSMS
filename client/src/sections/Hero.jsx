import React, { useState } from "react";
import {
  Zap,
  CheckCircle2,
  X,
  ArrowRight,
  MousePointerClick,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BannerModal from "../components/BannerModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const enquirySchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
      .required("Mobile number required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <section id="home" className="pt-20 lg:pt-24 pb-12 px-6 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* --- Left Side --- */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            <Zap size={12} className="text-blue-600 fill-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
              India's #1 Marketing Automation
            </span>
          </div>

          <h1 className="text-2xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Grow Your Business <br />
            <span className="text-blue-600">Faster </span>
            <span className="text-emerald-500">& Smarter</span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
            Send high-converting WhatsApp, Email, and SMS campaigns from one
            powerful dashboard. Trusted by 500+ growing brands.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
            >
              Get Free Demo <ArrowRight size={16} />
            </button>

            <a
              href="#pricing"
              className="text-slate-700 hover:text-blue-600 px-6 py-3 font-bold text-sm transition-colors border border-slate-200 rounded-xl bg-white"
            >
              View Plans
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-200 mt-6">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="text-xs font-bold text-slate-500 font-sans">
                No Credit Card Required
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="text-xs font-bold text-slate-500 font-sans">
                Set up in 2 Mins
              </span>
            </div>
          </div>
        </div>
        <BannerModal />
        {/* --- Right Image --- */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden border-[6px] border-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
              alt="Platform Dashboard"
              className="w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
              <MousePointerClick size={18} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">
                Success Rate
              </p>
              <p className="text-sm font-black text-slate-900 leading-none">
                99.9% Delivered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-50">
              <button
                className="absolute cursor-pointer top-4 right-4 text-slate-400 hover:text-slate-600"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-bold text-slate-900">Request Demo</h3>
              <p className="text-xs text-slate-500">
                Fill details and our expert will call you.
              </p>
            </div>

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
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  });

                  const data = await res.json();
                  console.log(data);

                  alert("Request Submitted Successfully");

                  resetForm();
                  setIsModalOpen(false);
                } catch (err) {
                  console.error(err);
                  alert("Something went wrong");
                }

                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Field
                        name="name"
                        placeholder="Name"
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
                    className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100"
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
