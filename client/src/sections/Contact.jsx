import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => (
  <section id="contact" className="py-24 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-4xl font-black mb-8">
            Let's grow your business together.
          </h2>
          <p className="text-slate-400 text-lg mb-12">
            Have questions about our API or custom enterprise plans? Our experts
            are here to help.
          </p>

          <div className="space-y-8">
            {/* Email */}
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Mail className="text-sky-400" size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Email Us</p>
                <p className="text-xl font-bold">support@bulksms.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Phone className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Call Sales</p>
                <p className="text-xl font-bold">+91 1800 123 4567</p>
              </div>
            </div>

            {/* Office */}
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <MapPin className="text-amber-400" size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Office</p>
                <p className="text-xl font-bold">Bangalore, Karnataka, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-slate-900 text-2xl font-black mb-6">
            Quick Enquiry
          </h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-slate-50 border-none p-4 rounded-xl text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-slate-50 border-none p-4 rounded-xl text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-slate-50 border-none p-4 rounded-xl text-slate-900 focus:ring-2 focus:ring-sky-500"
            />
            <textarea
              rows="4"
              placeholder="How can we help?"
              className="w-full bg-slate-50 border-none p-4 rounded-xl text-slate-900 focus:ring-2 focus:ring-sky-500"
            ></textarea>
            <button className="w-full bg-sky-500 py-4 rounded-xl font-bold text-white shadow-lg shadow-sky-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
