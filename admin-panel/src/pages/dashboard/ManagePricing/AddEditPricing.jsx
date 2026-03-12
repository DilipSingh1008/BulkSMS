import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  useCreateItemMutation,
  useUpdateItemMutation,
  useGetItemsQuery,
} from "../../../redux/api/apiSlice.js";

const AddEditPricing = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [initialValues, setInitialValues] = useState({
    name: "",
    price: "",
    period: "/month",
    desc: "",
    features: [""],
    status: true,
  });

  // RTK Query for fetching single plan (edit)
  const { data: planRes, isLoading: planLoading } = useGetItemsQuery(
    `pricing/${id}`,
    { skip: !isEdit },
  );

  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();

  // Populate form when editing
  useEffect(() => {
    if (isEdit && planRes?.data) {
      const p = planRes.data;
      setInitialValues({
        name: p.name || "",
        price: p.price || "",
        period: p.period || "/month",
        desc: p.desc || "",
        features: p.features.length ? p.features : [""],
        status: p.status,
      });
    }
  }, [isEdit, planRes]);

  const theme = {
    main: isDarkMode
      ? "bg-[#0b0e14] text-slate-300"
      : "bg-gray-50 text-gray-700",
    card: isDarkMode
      ? "bg-[#151b28] border border-gray-800 text-white"
      : "bg-white border border-gray-200 text-gray-700",
    input:
      "w-full p-2 text-sm rounded border outline-none focus:ring-1 focus:ring-(--primary)",
    label: "block text-[10px] font-bold opacity-70 mb-1 uppercase",
    error: "text-red-500 text-[10px] mt-1",
    section: "p-4 md:p-6 rounded-xl border shadow-sm",
    textarea:
      "w-full p-2 rounded border outline-none focus:ring-1 focus:ring-(--primary) text-sm",
    button:
      "w-full py-3 bg-(--primary) text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Plan Name is required"),
    price: Yup.string().required("Price is required"),
    period: Yup.string().required("Period is required"),
    desc: Yup.string().required("Description is required"),
    features: Yup.array().of(Yup.string().required("Feature cannot be empty")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await updateItem({ url: `pricing/${id}`, data: values });
        alert("Pricing plan updated successfully!");
      } else {
        await createItem({ url: "pricing", data: values });
        alert("Pricing plan added successfully!");
      }
      navigate("/dashboard/ManagePricing");
    } catch (err) {
      console.error(err);
      alert("Error saving plan. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  if (planLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className={`h-screen w-full flex flex-col ${theme.main}`}>
      <header
        className={`px-6 py-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
      >
        <h1 className="text-sm font-bold">
          {isEdit ? "Edit Pricing Plan" : "Add New Pricing Plan"}
        </h1>
        <p className="text-[10px] opacity-50">
          Fill in all required details below
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="max-w-3xl mx-auto space-y-6">
              {/* Basic Info */}
              <div className={`${theme.section} ${theme.card}`}>
                <h2 className="text-xs font-bold mb-4">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={theme.label}>
                      Plan Name <span className="text-red-500">*</span>
                    </label>
                    <Field name="name" type="text" className={theme.input} />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={theme.error}
                    />
                  </div>

                  <div>
                    <label className={theme.label}>
                      Price <span className="text-red-500">*</span>
                    </label>
                    <Field name="price" type="text" className={theme.input} />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className={theme.error}
                    />
                  </div>

                  <div>
                    <label className={theme.label}>
                      Period <span className="text-red-500">*</span>
                    </label>
                    <Field name="period" type="text" className={theme.input} />
                    <ErrorMessage
                      name="period"
                      component="div"
                      className={theme.error}
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <Field name="status" type="checkbox" className="h-4 w-4" />
                    <span>Active</span>
                  </div>
                </div>

                <div className="mt-4">
                  <label className={theme.label}>
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="desc"
                    as="textarea"
                    rows="4"
                    className={theme.textarea}
                  />
                  <ErrorMessage
                    name="desc"
                    component="div"
                    className={theme.error}
                  />
                </div>
              </div>

              {/* Features */}
              <div className={`${theme.section} ${theme.card}`}>
                <h2 className="text-xs font-bold mb-4">Features</h2>
                <FieldArray name="features">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      {values.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Field
                            name={`features.${index}`}
                            type="text"
                            placeholder="Feature description"
                            className={`${theme.input} flex-1`}
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="px-2 py-1 text-red-500 border rounded hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="mt-2 px-3 py-1 text-(--primary) border rounded hover:bg-(--primary)/10"
                      >
                        + Add Feature
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={theme.button}
              >
                {isEdit
                  ? isSubmitting
                    ? "Updating..."
                    : "Update Plan"
                  : isSubmitting
                    ? "Adding..."
                    : "Add Plan"}
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default AddEditPricing;
