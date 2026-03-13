import { useState, useEffect } from "react";
import { Send, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // Scroll logic for background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy logic
  useEffect(() => {
    const sections = ["home", "about", "services", "pricing", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let id of sections) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPos) {
          setActive(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Home", "About", "Services", "Pricing", "Contact"];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-sm py-3 border-b border-slate-200/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* --- LOGO: Blue to Green Gradient --- */}
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-emerald-500 p-2 rounded-lg shadow-lg">
              <Send
                size={18}
                className="text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Bulk
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Pro
            </span>
          </h1>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center space-x-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                active === item.toLowerCase()
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* --- ACTION BUTTON --- */}
        <div className="hidden md:block">
          <button className="flex cursor-pointer items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg hover:shadow-blue-200 active:scale-95">
            Get Started
            <ArrowRight size={14} />
          </button>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="md:hidden p-2 rounded-lg bg-slate-50 text-slate-900 border border-slate-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* --- MOBILE MENU: Full Screen Overlay style --- */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white transition-all duration-500 ease-in-out border-t border-slate-100 ${
          isOpen
            ? "max-h-[500px] opacity-100 shadow-2xl"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="p-8 flex flex-col items-center space-y-6">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-black tracking-tighter transition-colors ${
                active === item.toLowerCase()
                  ? "text-blue-600"
                  : "text-slate-300 hover:text-slate-900"
              }`}
            >
              {item}
            </a>
          ))}
          <button className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-4 rounded-2xl font-bold shadow-xl">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
