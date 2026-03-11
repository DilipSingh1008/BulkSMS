import { Users, Globe, Award, BarChart3 } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: <Users className="text-sky-500" size={28} />,
      label: "Businesses Served",
      value: "10,000+",
    },
    {
      icon: <Globe className="text-emerald-500" size={28} />,
      label: "Countries",
      value: "50+",
    },
    {
      icon: <Award className="text-amber-500" size={28} />,
      label: "Awards Won",
      value: "12",
    },
    {
      icon: <BarChart3 className="text-purple-500" size={28} />,
      label: "Messages Sent",
      value: "1.5B+",
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
              About <span className="text-sky-500">Us</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We provide reliable bulk messaging solutions for SMS, WhatsApp,
              and Email campaigns. Our mission is to help businesses reach their
              audience quickly, efficiently, and with measurable results.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Trusted by thousands of businesses worldwide, we combine
              cutting-edge technology with excellent support. Whether you are
              sending transactional alerts or promotional campaigns, we make it
              simple and secure.
            </p>
          </div>
          <div className="relative animate-in fade-in zoom-in duration-1000">
            <img
              src="https://images.unsplash.com/photo-1581092334364-3f5e7c68ec3f?auto=format&fit=crop&w=800&q=80"
              alt="Team Collaboration"
              className="rounded-3xl shadow-2xl border border-slate-100"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4"
            >
              <div className="p-4 bg-slate-50 rounded-full">{s.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900">{s.value}</h3>
              <p className="text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h4 className="text-xl font-bold text-sky-500 mb-4">Our Mission</h4>
            <p className="text-slate-600">
              To empower businesses with tools to communicate efficiently and
              effectively with their audience.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h4 className="text-xl font-bold text-emerald-500 mb-4">
              Our Vision
            </h4>
            <p className="text-slate-600">
              To become the most trusted global platform for bulk messaging
              across all channels.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h4 className="text-xl font-bold text-purple-500 mb-4">
              Our Values
            </h4>
            <p className="text-slate-600">
              Reliability, Innovation, Transparency, and Customer Success are at
              the core of everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
