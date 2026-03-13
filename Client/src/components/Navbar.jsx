import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const linkBase =
  "relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:text-white hover:bg-white/5";

const activeClasses = "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-5xl rounded-2xl glass-panel px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-lg font-bold text-white tracking-tighter">SZ</span>
          </div>
          <span className="hidden sm:block text-lg font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
            Shopez
          </span>
        </Link>
        
        <nav className="flex items-center gap-1.5 text-slate-300">
          <NavLink to="/products" className={({ isActive }) => `${linkBase} ${isActive ? activeClasses : ""}`}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `${linkBase} ${isActive ? activeClasses : ""}`}>
            Cart
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/orders" className={({ isActive }) => `${linkBase} ${isActive ? activeClasses : ""}`}>
              Orders
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/profile" className={({ isActive }) => `${linkBase} ${isActive ? activeClasses : ""}`}>
              Profile
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => `${linkBase} border border-indigo-500/30 text-indigo-300 ${isActive ? "bg-indigo-500/20" : ""}`}>
              Admin
            </NavLink>
          )}
          
          <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>

          {!isAuthenticated ? (
            <NavLink to="/login" className="ml-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5">
              Sign In
            </NavLink>
          ) : (
            <button type="button" onClick={logout} className={`${linkBase} ml-1 text-slate-400 hover:text-red-400`}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;