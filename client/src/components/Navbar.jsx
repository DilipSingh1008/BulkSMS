import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import EnquiryModal from "./EnquiryModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Links with their routes
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
  ];

  const location = useLocation(); // Track current route

  // Update active link based on current pathname
  useEffect(() => {
    const pathToActive = {
      "/": "home",
      "/about": "about",
      "/services": "services",
      "/pricing": "pricing",
    };
    setActive(pathToActive[location.pathname] || "home");
  }, [location.pathname]);

  // Scroll background effect (optional)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-xl shadow-md py-3 border-b border-slate-200/50"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center cursor-pointer">
            <div className="w-32 md:w-36 flex items-center justify-center">
              <img
                src="./logorm.png"
                alt="SwiftZap Icon"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  active === link.name.toLowerCase()
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ACTION BUTTON */}
          <div className="hidden md:block">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
            >
              Get Started
              <ArrowRight size={14} />
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 active:scale-90 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[60vh] opacity-100 shadow-2xl" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-8 flex flex-col items-center space-y-5">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-bold tracking-tight transition-colors ${
                  active === link.name.toLowerCase()
                    ? "text-blue-600"
                    : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-4 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-[0.98] transition-transform"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <EnquiryModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
