import {
  Send,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

export default function Footer() {
  const links = ["Home", "Services", "Pricing", "Contact"];
  // const socials = [
  //   { icon: <Instagram size={18} />, color: "hover:text-pink-500" },
  //   { icon: <Twitter size={18} />, color: "hover:text-sky-400" },
  //   { icon: <Linkedin size={18} />, color: "hover:text-blue-600" },
  //   { icon: <Github size={18} />, color: "hover:text-white" },
  // ];

  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-16 pb-8 px-6 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto">
        {/* --- Top Section: 4 Column Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Desc */}
          <div className="space-y-4">
            {/* <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
                <Send size={18} className="text-white" />
              </div>
              <span className="text-white font-black text-xl tracking-tighter">
                Swift<span className="text-emerald-500">Zap</span>
              </span>
            </div> */}
            <div className="flex items-center gap-1 cursor-pointer group">
              {/* Image Container - Icon ko image se replace kiya */}
              <div className="relative w-25 h-16 flex items-center justify-center">
                {/* Subtle Glow Effect - optional but makes it pop */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-emerald-500/20 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>

                <img
                  src="/logo.jpg"
                  alt="SwiftZap"
                  className="relative w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed font-medium">
              Transforming business communication with high-speed SMS, WhatsApp
              APIs, and AI-driven automation tools.
            </p>
            <div className="flex gap-4 pt-2">
              {/* {socials.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className={`transition-all duration-300 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))} */}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm font-bold hover:text-emerald-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">
              Support
            </h4>
            <ul className="space-y-4">
              {/* <li className="flex items-center gap-3 text-sm font-medium hover:text-white transition-colors cursor-pointer">
                <Mail size={16} className="text-blue-500" /> support@bulkpro.com
              </li> */}
              <li className="flex items-center gap-3 text-sm font-medium hover:text-white transition-colors cursor-pointer">
                <Phone size={16} className="text-emerald-500" /> +91 9785869100
              </li>
              <li className="flex items-start gap-3 text-sm font-medium hover:text-white transition-colors cursor-pointer">
                <MapPin size={16} className="text-blue-500 mt-1" /> STPI Cyber
                Park, <br /> Jodhpur, India
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">
              Newsletter
            </h4>
            <p className="text-[11px]  font-bold text-slate-500 uppercase mb-4 leading-tight">
              Get latest updates directly
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-blue-500 transition-all placeholder:text-slate-600 text-white"
              />
              <button className="absolute right-2 cursor-pointer top-2 bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded-lg transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            © 2026 SwiftZap Technologies.{" "}
            <span className="text-slate-700 mx-1">|</span> Made with Passion
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-tighter hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-tighter hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
