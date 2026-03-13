import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const isRegisterRoute = location.pathname === "/register";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (isRegisterRoute) {
        await register(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Authentication failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full bg-slate-950 font-sans text-slate-50 selection:bg-primary-500/30">
      
      {/* LEFT PANEL: Branding & Visuals (Hidden on small screens) */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block bg-slate-900 border-r border-white/5">
        
        {/* Abstract Background Grid/Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary-900/40 via-slate-900 to-slate-950 z-0" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
        
        {/* Floating Accents */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-primary-600/30 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 flex h-full flex-col p-12 xl:p-20">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-indigo-600 shadow-lg shadow-primary-500/30">
              <span className="text-xl font-black text-white tracking-tighter">SZ</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-white">ShopEZ</span>
          </div>

          <div className="mt-auto mb-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl font-extrabold tracking-tight text-white leading-tight">
              Premium Shopping.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
                Elevated Experience.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-lg leading-relaxed">
              Join thousands of others who have upgraded their lifestyle with our curated catalog of high-end essentials and modern apparel.
            </p>
            
            <div className="mt-12 flex items-center gap-4 text-sm font-medium text-slate-400">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span>Trusted by 50,000+ customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Authentication Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20 xl:px-32 animate-fade-in relative">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent -z-10" />

        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-indigo-600 shadow-lg shadow-primary-500/30">
              <span className="text-xl font-black text-white tracking-tighter">SZ</span>
            </div>
            <span className="text-3xl font-black tracking-tight text-white">ShopEZ</span>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              {isRegisterRoute ? "Create an account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {isRegisterRoute
                ? "Sign up today to start adding items to your cart."
                : "Please enter your details to sign in."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {isRegisterRoute && (
              <div className="space-y-1.5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-900/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all shadow-sm"
                />
              </div>
            )}
            
            <div className="space-y-1.5 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700/50 bg-slate-900/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all shadow-sm"
              />
            </div>
            
            <div className="space-y-1.5 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700/50 bg-slate-900/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all shadow-sm"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex items-start gap-3 animate-fade-in shadow-inner">
                <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm font-medium text-red-400">{error}</p>
              </div>
            )}

            <div className="pt-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition-all duration-300 hover:bg-primary-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {submitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                    Authenticating...
                  </>
                ) : isRegisterRoute ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-slate-400">
              {isRegisterRoute ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => navigate(isRegisterRoute ? "/login" : "/register")}
                className="font-bold text-primary-400 hover:text-primary-300 transition-colors hover:underline underline-offset-4"
              >
                {isRegisterRoute ? "Sign in instead" : "Create one now"}
              </button>
            </p>
            
            <button
               onClick={() => navigate("/")}
               className="mt-8 text-xs font-semibold text-slate-500 flex items-center justify-center mx-auto hover:text-slate-300 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Return to store
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;