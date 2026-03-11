import { useState } from "react";
import { ShieldCheck, Send } from "lucide-react";

const BulkSmsForm = () => {
  const [text, setText] = useState("");
  const charsPerSms = 160;
  const smsCount = Math.ceil(text.length / charsPerSms) || 1;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Circle */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">
            Try Our Sender
          </h2>

          <div className="grid gap-6">
            {/* Recipient Numbers */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Recipient Numbers (comma separated)
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210, +91 88888 77777"
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              />
            </div>

            {/* Message Body */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-bold text-slate-700">
                  Message Body
                </label>
                <span
                  className={`text-xs font-bold ${
                    text.length > 150 ? "text-amber-500" : "text-slate-400"
                  }`}
                >
                  {text.length} / {charsPerSms * 5} ({smsCount} SMS)
                </span>
              </div>
              <textarea
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your campaign message here..."
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all resize-none"
              ></textarea>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold">
                <ShieldCheck size={16} /> Verified Route
              </div>
              <button className="flex-1 bg-sky-500 text-white font-black px-8 py-4 rounded-xl hover:bg-sky-600 transition-all flex items-center justify-center gap-2">
                Send Campaign <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkSmsForm;
