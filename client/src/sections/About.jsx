import { Users, Globe, Award, BarChart3, CheckCircle2 } from "lucide-react";

export default function About() {
  const stats = [
    {
      icon: <Users size={20} />,
      value: "10K+",
      label: "Businesses",
      color: "text-blue-600",
    },
    {
      icon: <Globe size={20} />,
      value: "50+",
      label: "Countries",
      color: "text-emerald-500",
    },
    {
      icon: <Award size={20} />,
      value: "12",
      label: "Awards",
      color: "text-blue-600",
    },
    {
      icon: <BarChart3 size={20} />,
      value: "1.5B+",
      label: "Messages",
      color: "text-emerald-500",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        {/* --- Main Content Grid --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left: Content Area */}
          <div className="flex flex-col justify-center h-full">
            <div className="mb-6">
              <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-2 block">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                About <span className="text-blue-600">BulkPro</span>{" "}
                <span className="text-emerald-500">Solutions</span>
              </h2>
              <div className="h-1 w-16 bg-emerald-500 mt-4 rounded-full"></div>
            </div>

            <div className="space-y-5 text-slate-600 text-base leading-relaxed mb-8">
              <p>
                Our platform is designed for speed and scale. From startups to
                global brands, we provide the infrastructure needed to engage
                customers where they are.
              </p>
              <p>
                We combine powerful API integrations with a simple, no-code
                dashboard so your team can focus on the message, not the
                technical hurdles.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "High-speed SMS",
                "WhatsApp API",
                "Email Automation",
                "Real-time Analytics",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-emerald-50 p-1 rounded-full text-emerald-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Clean Image Area */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-50 rounded-full -z-10 opacity-70"></div>
            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
                alt="BulkPro Interface"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* --- Stats: Compact Row --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-center gap-4 transition-all hover:bg-white hover:shadow-lg group"
            >
              <div
                className={`p-3 rounded-xl bg-white shadow-sm transition-transform group-hover:scale-110 ${item.color}`}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-none mb-1">
                  {item.value}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Mission/Vision: Professional Cards --- */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Mission",
              text: "Providing tools to help businesses connect with customers instantly and effectively.",
              accent: "border-blue-600",
            },
            {
              title: "Vision",
              text: "Building the most trusted global messaging platform for high-impact communication.",
              accent: "border-emerald-500",
            },
            {
              title: "Values",
              text: "Reliability, innovation, and customer success drive every line of code we write.",
              accent: "border-blue-600",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`p-8 bg-white rounded-2xl border-l-4 ${card.accent} shadow-sm hover:shadow-md transition-all`}
            >
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">
                {card.title}
              </h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
