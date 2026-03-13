import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import api from "../services/api.js";

const CheckoutPage = () => {
  const { cart, clearCartLocally } = useCart();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("SIMULATED");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const total = useMemo(() => {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce(
      (sum, item) => sum + item.priceSnapshot * item.quantity,
      0
    );
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart || cart.items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await api.post("/orders", {
        shippingAddress,
        paymentMethod
      });
      clearCartLocally();
      navigate(`/orders/${res.data._id}`);
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to place order. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Checkout</h1>
        <p className="text-sm text-slate-400">
          Enter your shipping details and confirm your secure order.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1.2fr]">
        <div className="glass-card rounded-3xl p-6 sm:p-8 order-2 lg:order-1">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/20 text-primary-400 text-sm">1</span>
            Shipping Information
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
                <input
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Phone</label>
                <input
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Street Address</label>
              <input
                name="street"
                value={shippingAddress.street}
                onChange={handleChange}
                required
                placeholder="123 Main St, Apt 4B"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
              />
            </div>
            
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-1.5 sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">City</label>
                <input
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  required
                  placeholder="New York"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">State / Province</label>
                <input
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  required
                  placeholder="NY"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Postal Code</label>
                <input
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleChange}
                  required
                  placeholder="10001"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Country</label>
              <input
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                required
                placeholder="United States"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
              />
            </div>

            <div className="pt-6 border-t border-white/10 mt-8 mb-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-sm">2</span>
                Payment Method
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={`relative flex cursor-pointer rounded-xl border p-4 hover:bg-slate-800/50 transition-colors ${paymentMethod === 'SIMULATED' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 bg-slate-900/50'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="SIMULATED"
                    className="sr-only"
                    checked={paymentMethod === "SIMULATED"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${paymentMethod === 'SIMULATED' ? 'border-primary-500' : 'border-slate-500'}`}>
                        {paymentMethod === 'SIMULATED' && <div className="h-2.5 w-2.5 rounded-full bg-primary-500" />}
                      </div>
                      <span className="text-sm font-medium text-white">Credit Card (Simulated)</span>
                    </div>
                    <svg className={`h-5 w-5 ${paymentMethod === 'SIMULATED' ? 'text-indigo-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                </label>
                
                <label className={`relative flex cursor-pointer rounded-xl border p-4 hover:bg-slate-800/50 transition-colors ${paymentMethod === 'COD' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 bg-slate-900/50'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    className="sr-only"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${paymentMethod === 'COD' ? 'border-primary-500' : 'border-slate-500'}`}>
                        {paymentMethod === 'COD' && <div className="h-2.5 w-2.5 rounded-full bg-primary-500" />}
                      </div>
                      <span className="text-sm font-medium text-white">Cash on Delivery</span>
                    </div>
                    <svg className={`h-5 w-5 ${paymentMethod === 'COD' ? 'text-indigo-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex items-start gap-3">
                <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !cart || cart.items.length === 0}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:bg-primary-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </>
              ) : (
                <>
                  Confirm Order & Pay ₹{total.toFixed(2)}
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </>
              )}
            </button>
          </form>
        </div>

        <aside className="order-1 lg:order-2 h-fit rounded-3xl glass-card p-6 border-t-[4px] border-t-indigo-500 pb-8">
          <h2 className="text-lg font-bold text-white mb-6">Order Details</h2>
          {!cart || cart.items.length === 0 ? (
            <div className="py-8 text-center bg-slate-900/30 rounded-xl border border-dashed border-slate-700">
              <p className="text-sm text-slate-400">Your cart is completely empty.</p>
            </div>
          ) : (
            <>
              <ul className="mb-6 space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map((item) => (
                  <li key={item.product._id} className="flex gap-4">
                     <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                      {item.product.images?.[0] ? (
                        <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-800 text-xs font-bold text-slate-600">
                          {item.product.name.substring(0,2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 justify-between flex-col py-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-sm font-medium text-white line-clamp-2">
                          {item.product.name}
                        </span>
                        <span className="text-sm font-semibold text-white whitespace-nowrap">
                          ₹{(item.priceSnapshot * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        Qty: {item.quantity} × ₹{item.priceSnapshot.toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Taxes (Estimated)</span>
                  <span className="font-medium text-white">₹0.00</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping</span>
                  <span className="font-medium text-emerald-400">Free</span>
                </div>
                
                <div className="border-t border-white/10 pt-4 mt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-slate-200">Total</span>
                    <span className="text-2xl font-black text-white text-gradient">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
};

export default CheckoutPage;