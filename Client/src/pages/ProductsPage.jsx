import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/products");
        setProducts(res.data.items || []);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    load();
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
      // ignore for now, could show toast
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
      // ignore for now
    }
  };

  return (
    <section className="animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Our Collection</h1>
          <p className="text-sm text-slate-400">
            Browse our curated catalog and discover your next favorite item.
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
        </div>
      )}
      
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p, i) => (
          <article
            key={p._id}
            className="group flex flex-col rounded-2xl glass-card overflow-hidden animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative aspect-square overflow-hidden bg-slate-800">
              {p.images?.[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 transition-transform duration-500 group-hover:scale-105">
                  <span className="text-4xl font-black text-slate-700/50 uppercase tracking-widest">{p.name.substring(0,2)}</span>
                </div>
              )}
              {p.discountPrice && (
                <div className="absolute top-3 right-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                  Sale
                </div>
              )}
            </div>
            
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1">{p.name}</h2>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400 flex-1">
                {p.description}
              </p>
              
              <div className="mt-4 flex items-end gap-2">
                <span className="text-lg font-bold text-primary-400">
                  ₹{(p.discountPrice ?? p.price).toFixed(2)}
                </span>
                {p.discountPrice && (
                  <span className="mb-0.5 text-sm text-slate-500 line-through">
                    ₹{p.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleAddToCart(p._id)}
                  className="flex items-center justify-center rounded-xl bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white"
                >
                  <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => handleShopNow(p._id)}
                  className="flex items-center justify-center rounded-xl bg-primary-600 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-primary-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </article>
        ))}
        {!loading && !error && products.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-700 p-12 text-center text-slate-400">
            <svg className="mx-auto mb-4 h-12 w-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            <p className="text-lg font-medium">No products available yet.</p>
            <p className="mt-1 text-sm">Check back later for new arrivals.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;