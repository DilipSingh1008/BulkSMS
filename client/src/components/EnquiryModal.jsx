import React from "react";
import { X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const enquirySchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile number required"),
  message: Yup.string().required("Message is required"),
});

const EnquiryModal = ({ isModalOpen, setIsModalOpen }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-50">
          <button
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={18} />
          </button>
          <h3 className="text-lg font-bold text-slate-900">Get Started</h3>
          <p className="text-xs text-slate-500">
            Fill details and our expert will call you.
          </p>
        </div>

        <Formik
          initialValues={{ name: "", email: "", mobile: "", message: "" }}
          validationSchema={enquirySchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/enquiry`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                },
              );

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
                {["name", "email", "mobile"].map((field) => (
                  <div key={field}>
                    <Field
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500 transition-all"
                    />
                    <ErrorMessage
                      name={field}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                ))}

                <div>
                  <Field
                    as="textarea"
                    name="message"
                    placeholder="Message"
                    rows={3}
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
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EnquiryModal;
