import { CheckCircle2 } from "lucide-react";

const Pricing = () => {
  const plans = [
    { name: "Starter", price: "₹499", sms: "5,000", color: "bg-white/60" },
    {
      name: "Growth",
      price: "₹1,999",
      sms: "25,000",
      color: "bg-white",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "₹6,499",
      sms: "100,000",
      color: "bg-white/60",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-sky-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h3 className="text-sky-500 font-bold uppercase mb-4">Pricing Plans</h3>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900">
          Simple Transparent Pricing
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`relative p-10 rounded-[2.5rem] ${p.color} border border-slate-100 transition-all hover:scale-105 hover:shadow-2xl`}
          >
            {p.popular && (
              <span className="absolute top-0 right-10 -translate-y-1/2 bg-emerald-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                Most Popular
              </span>
            )}

            <h4 className="text-2xl font-bold mb-2">{p.name}</h4>

            <div className="flex items-baseline mb-6 justify-center">
              <span className="text-4xl font-black text-slate-900">
                {p.price}
              </span>
              <span className="text-slate-400 ml-2">/ month</span>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={20} />
                <span className="font-semibold text-slate-700">
                  {p.sms} Messages
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={20} />
                <span className="text-slate-600">Transactional Route</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={20} />
                <span className="text-slate-600">API Access</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <CheckCircle2 size={20} />
                <span className="text-slate-500">24/7 Support</span>
              </div>
            </div>

            <button
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                p.popular
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-200 hover:bg-sky-600"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Choose {p.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
