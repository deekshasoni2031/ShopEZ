import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const CartPage = () => {
  const { cart, loading, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = useMemo(() => {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce(
      (sum, item) => sum + item.priceSnapshot * item.quantity,
      0
    );
  }, [cart]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <section className="animate-fade-in">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Shopping Cart</h1>
      </div>

      {loading && (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
        </div>
      )}

      {!loading && (!cart || cart.items.length === 0) && (
        <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center text-slate-400">
          <svg className="mx-auto mb-4 h-16 w-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <p className="text-xl font-medium mb-2">Your cart is empty.</p>
          <p className="text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button onClick={() => navigate('/products')} className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 bg-primary-600 rounded-xl hover:bg-primary-500 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/25">
            Start Shopping
          </button>
        </div>
      )}

      {cart && cart.items.length > 0 && (
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr,380px]">
          <div className="space-y-4">
            {cart.items.map((item, i) => (
              <div
                key={item.product._id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl glass-card p-4 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-xl bg-slate-800 shrink-0 border border-white/5">
                    {item.product.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                        <span className="text-xl font-bold text-slate-700/50 uppercase tracking-widest">{item.product.name.substring(0,2)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base sm:text-lg font-bold text-white transition-colors group-hover:text-primary-400 clamp-1">{item.product.name}</p>
                    <p className="text-sm font-medium text-primary-500 mt-1">
                      ₹{item.priceSnapshot.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pt-4 border-t border-white/5 sm:pt-0 sm:border-0">
                  <div className="flex items-center bg-slate-900/50 rounded-lg border border-slate-700 p-1">
                    <span className="text-xs text-slate-400 px-2 font-medium uppercase tracking-wider">Qty</span>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
                      className="w-12 bg-transparent text-center text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-primary-500 rounded"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product._id)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                    title="Remove item"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <aside className="h-fit rounded-3xl glass-card p-6 border-t-[4px] border-t-primary-500 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-slate-300">
                <span className="text-sm">Subtotal</span>
                <span className="font-semibold text-white">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-sm">Shipping</span>
                <span className="font-semibold text-emerald-400">Free</span>
              </div>
              
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex justify-between items-end">
                  <span className="text-base font-medium text-slate-200">Total</span>
                  <span className="text-2xl font-black text-white text-gradient">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:bg-primary-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:-translate-y-1"
            >
              Proceed to Checkout
              <svg className="w-5 h-5 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </aside>
        </div>
      )}
    </section>
  );
};

export default CartPage;