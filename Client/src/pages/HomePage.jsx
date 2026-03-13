import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/products");
        // Take first 4 items for featured section
        setFeatured((res.data.items || []).slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleShopNow = async (productId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      await addToCart(productId, 1);
      navigate("/checkout");
    } catch {
      // ignore for now
    }
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      await addToCart(productId, 1);
      navigate("/cart");
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col gap-16 sm:gap-24 mb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-white/5 shadow-2xl">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-600/20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        
        <div className="relative z-10 px-6 py-24 sm:py-32 lg:px-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-semibold uppercase tracking-widest mb-8 animate-fade-in border border-primary-500/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            New Arrivals Available
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 animate-slide-up">
            Elevate Your <span className="text-gradient">Style</span>
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-slate-300 mb-10 animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Discover a curated collection of premium products. Experience seamless shopping with our fast, secure, and beautiful platform.
          </p>
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.2s" }}>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-primary-600 rounded-xl hover:bg-primary-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:-translate-y-1"
            >
              Shop Collection
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/5">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Selections</h2>
            <p className="mt-2 text-sm text-slate-400">Hand-picked items guaranteed to impress.</p>
          </div>
          <Link to="/products" className="hidden sm:inline-flex items-center text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors">
            View All Products
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>
        </div>

        {loading ? (
           <div className="flex h-40 items-center justify-center">
             <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
           </div>
        ) : featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <article
                key={p._id}
                className="group flex flex-col rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-white/5 bg-slate-900/40 relative"
              >
                {/* Image Area */}
                <div className="relative aspect-square overflow-hidden bg-slate-800">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 transition-transform duration-700 group-hover:scale-105">
                      <span className="text-4xl font-black text-slate-700/50 uppercase tracking-widest">{p.name.substring(0,2)}</span>
                    </div>
                  )}
                  {/* Subtle gradient overlay at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Quick action buttons floating on image */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 px-4">
                    <button
                      onClick={() => handleAddToCart(p._id)}
                      className="flex-1 rounded-xl bg-white/10 backdrop-blur-md px-3 py-2.5 text-xs font-semibold text-white border border-white/20 transition-all hover:bg-white hover:text-slate-900"
                    >
                      + Cart
                    </button>
                    <button
                      onClick={() => handleShopNow(p._id)}
                      className="flex-1 rounded-xl bg-primary-600 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-primary-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
                
                {/* Details Area */}
                <div className="flex flex-col p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1">{p.name}</h3>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-lg font-bold text-primary-400">
                      ₹{(p.discountPrice ?? p.price).toFixed(2)}
                    </span>
                    {p.discountPrice && (
                      <span className="mb-0.5 text-sm text-slate-500 line-through">
                        ₹{p.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center text-slate-400">
            <svg className="mx-auto mb-4 h-12 w-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            <p className="text-lg font-medium">No featured products available.</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
        {/* Feature Card 1 */}
        <div className="glass-card rounded-2xl p-8 group border border-white/5 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 mb-6 group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-3">Premium Catalog</h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            Browse through our highly curated selection of products with detailed descriptions, rich imagery, and competitive pricing.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="glass-card rounded-2xl p-8 group border border-white/5 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-3">Lightning Fast</h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            Experience a blisteringly fast, responsive shopping interface built with modern web technologies that respects your time.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="glass-card rounded-2xl p-8 group sm:col-span-2 lg:col-span-1 border border-white/5 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-3">Secure Checkout</h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            Shop with peace of mind. Our checkout flow is streamlined for extreme ease of use while prioritizing your data security.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;