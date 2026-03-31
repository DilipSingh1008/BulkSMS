import { useState, useEffect } from "react";
import { Loader2, AlertTriangle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/services`);
        const data = await res.json();
        setServices(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      } catch (err) {
        setError("Unable to load services. Please try again later.");
        setLoading(false);
      }
    };
    fetchServices();
  }, []);
  const handleServiceClick = (id) => {
    navigate(`/services/${id}`);
  };
  return (
    <section id="services" className="py-20 bg-[#fcfdfe] px-6">
      <div className="max-w-6xl mx-auto mt-15">
        {/* --- YEH HEADER AB HAMESHA DIKHEGA --- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full mb-4">
            <ShieldCheck size={14} className="text-blue-600" />
            <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">
              Expert Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Our <span className="text-blue-600 font-black">Professional</span>{" "}
            <span className="text-emerald-500">Services</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* --- DYNAMIC CONTENT AREA --- */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              Fetching Solutions
            </span>
          </div>
        ) : error ? (
          <div className="py-20 text-center text-red-500 flex flex-col items-center justify-center gap-3 font-bold">
            <AlertTriangle size={32} />
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s._id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] flex flex-col"
              >
                {/* Image Logic */}
                {s.galleryImages && s.galleryImages.length > 0 ? (
                  <div
                    className="relative h-48 overflow-hidden"
                    onClick={() => handleServiceClick(s._id)}
                  >
                    <img
                      src={`http://localhost:5000/${s.galleryImages[0].replace(/\\/g, "/")}`}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight text-white shadow-lg ${s.status ? "bg-emerald-500" : "bg-red-500"}`}
                      >
                        {s.status ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-400 font-bold italic">
                    Preview Unavailable
                  </div>
                )}

                {/* Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">
                    {s.category?.name || "General Service"}
                  </p>
                  <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                    {s.name}
                  </h4>
                  {s.description && (
                    <div
                      className="text-slate-600 text-sm leading-relaxed line-clamp-3 font-medium opacity-80"
                      dangerouslySetInnerHTML={{ __html: s.description }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
