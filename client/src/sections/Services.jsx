import { MessageCircle, MessageSquare, Mail } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Bulk SMS",
      icon: <MessageCircle className="text-sky-500" size={24} />,
      desc: "Send high-priority SMS campaigns to thousands of customers instantly.",
    },
    {
      title: "Bulk WhatsApp",
      icon: <MessageSquare className="text-emerald-500" size={24} />,
      desc: "Reach your audience on WhatsApp with automated messages and promotions.",
    },
    {
      title: "Bulk Email",
      icon: <Mail className="text-purple-500" size={24} />,
      desc: "Run email marketing campaigns with personalized messages and analytics.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h3 className="text-emerald-500 font-bold tracking-widest uppercase mb-4">
          Our Services
        </h3>

        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
          Powerful Messaging Tools
        </h2>

        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Connect with your audience via SMS, WhatsApp, and Email campaigns
          efficiently.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className="group p-8 rounded-3xl bg-slate-50 border border-slate-100
            hover:bg-white hover:shadow-xl hover:shadow-sky-100
            transition-all duration-300"
          >
            <div
              className="w-14 h-14 rounded-2xl bg-white shadow-sm
              flex items-center justify-center mb-6
              group-hover:scale-110 transition-transform"
            >
              {s.icon}
            </div>

            <h4 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h4>

            <p className="text-slate-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
