import Navbar from "./Navbar.jsx";

const PageShell = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-primary-500/30 font-sans">
      {/* Subtle animated background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-80" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-16 animate-fade-in">
          {children}
        </main>
        <footer className="mt-auto border-t border-white/5 bg-slate-950/50 backdrop-blur-sm py-6 text-center text-sm font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Shopez. Crafted with precision.</p>
        </footer>
      </div>
    </div>
  );
};

export default PageShell;