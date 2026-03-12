import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Contact <span className="text-sky-500">Us</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-lg grid gap-4"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              required
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/5 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 outline-none transition"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/5 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 outline-none transition"
            />
          </div>

          <textarea
            rows="4"
            required
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/5 text-white placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 outline-none resize-none transition"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-2 sm:py-3 bg-sky-600 text-white rounded-lg font-bold text-sm hover:bg-sky-700 hover:scale-105 transform transition-all disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-center text-sm mt-2 animate-pulse">
              Message sent successfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
