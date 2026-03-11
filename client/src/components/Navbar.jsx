import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Send,
  BarChart3,
  ShieldCheck,
  Users,
  Globe,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Menu,
  X,
  CreditCard,
  Zap,
} from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-sky-500 p-2 rounded-lg">
            <Send size={24} className="text-white" />
          </div>
          <h1
            className={`text-2xl font-bold ${scrolled ? "text-sky-600" : "text-sky-600"}`}
          >
            BulkSMS
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Services", "Pricing", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-semibold text-slate-600 hover:text-sky-500 transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>

        <button
          className="md:hidden text-slate-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t p-6 flex flex-col space-y-4 shadow-xl">
          {["Home", "Services", "Pricing", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-700"
            >
              {item}
            </a>
          ))}
          <button className="bg-emerald-500 text-white py-3 rounded-xl font-bold">
            Login / Signup
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
