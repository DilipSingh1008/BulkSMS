import React from "react";

const Footer = () => (
  <footer className="bg-slate-950 text-slate-500 py-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <Send size={24} className="text-sky-500" />
        <span className="text-white text-xl font-black tracking-tight">
          BulkSMS
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest">
        <a href="#" className="hover:text-white transition-colors">
          Privacy
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Terms
        </a>
        <a href="#" className="hover:text-white transition-colors">
          API Docs
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Support
        </a>
      </div>
      <div className="text-sm">
        © {new Date().getFullYear()} BulkSMS Gateway. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
