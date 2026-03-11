import { Zap, ArrowRight, CheckCircle2, BarChart3 } from "lucide-react";
const Hero = () => (
  <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-[100px]"></div>
    </div>

    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
        <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-100 px-4 py-2 rounded-full text-sky-600 font-semibold text-sm">
          <Zap size={16} />
          <span>99.9% Delivery Success Rate</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
          Reach Millions in <span className="text-sky-500">Seconds.</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
          The most reliable bulk SMS gateway for your business. Fast delivery,
          high conversion, and real-time analytics.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-200 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group">
            Start Free Trial{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white border-2 border-slate-100 hover:border-sky-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-sm">
            Watch Demo
          </button>
        </div>
        <div className="flex items-center space-x-4 pt-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="user"
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Joined by 10,000+ businesses worldwide
          </p>
        </div>
      </div>
      <div className="relative animate-in fade-in zoom-in duration-1000">
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-sky-100 border border-slate-50">
          <div className="flex justify-between items-center mb-6">
            <div className="h-2 w-16 bg-slate-100 rounded"></div>
            <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-sky-50 p-4 rounded-2xl rounded-tl-none mr-12">
              <p className="text-sm text-slate-700">
                Your OTP for login is 4592. Valid for 5 minutes.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl rounded-tr-none ml-12 border border-slate-100">
              <p className="text-sm text-slate-700">
                Thank you! Logged in successfully.
              </p>
            </div>
            <div className="bg-sky-50 p-4 rounded-2xl rounded-tl-none mr-12">
              <p className="text-sm text-slate-700">
                Flash Sale! Use code SAVE20 for 20% off all orders today only!
                🚀
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
            <div className="text-center">
              <p className="text-xs text-slate-400">Sent</p>
              <p className="text-xl font-bold text-sky-500">1.2M+</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Delivered</p>
              <p className="text-xl font-bold text-emerald-500">99.8%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">CTR</p>
              <p className="text-xl font-bold text-amber-500">24.5%</p>
            </div>
          </div>
        </div>
        {/* Floating elements */}
        <div className="absolute -top-6 -right-6 bg-emerald-500 text-white p-4 rounded-2xl shadow-lg animate-bounce hidden sm:block">
          <BarChart3 size={24} />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
