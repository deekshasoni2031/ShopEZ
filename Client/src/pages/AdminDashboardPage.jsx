import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

const AdminDashboardPage = () => {
  const { isAdmin, adminLogin } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    images: ""
  });
  const [creatingProduct, setCreatingProduct] = useState(false);

  const loadAdminData = async () => {
    if (!isAdmin) return;
    setLoadingData(true);
    setDataError("");
    try {
      const [ordersRes, productsRes] = await Promise.all([
        api.get("/admin/orders"),
        api.get("/products")
      ]);
      setOrders(ordersRes.data);
      setProducts(productsRes.data.items || []);
    } catch {
      setDataError("Failed to load admin data.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    loadAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      await adminLogin(loginForm.email, loginForm.password);
    } catch (err) {
      const message =
        err.response?.data?.message || "Admin login failed. Check credentials.";
      setLoginError(message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setCreatingProduct(true);
    try {
      const payload = {
        name: newProduct.name,
        slug: newProduct.slug,
        description: newProduct.description,
        price: Number(newProduct.price),
        images: newProduct.images
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      };
      await api.post("/admin/products", payload);
      setNewProduct({
        name: "",
        slug: "",
        description: "",
        price: "",
        images: ""
      });
      await loadAdminData();
    } finally {
      setCreatingProduct(false);
    }
  };

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-md">
        <h1 className="text-xl font-semibold">Admin dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">
          Sign in with an admin account to manage products and orders.
        </p>
        <form onSubmit={handleAdminLogin} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs text-slate-300">Admin email</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-300">Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, password: e.target.value }))
              }
              required
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
          {loginError && (
            <p className="text-xs text-red-400">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 disabled:opacity-60"
          >
            {loginLoading ? "Signing in…" : "Sign in as admin"}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="animate-fade-in max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Admin Dashboard</h1>
          <p className="text-sm text-slate-400">Manage your store's inventory and oversee customer orders.</p>
        </div>
      </div>

      {dataError && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex items-start gap-3 animate-fade-in">
          <svg className="h-5 w-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-sm font-medium text-red-400">{dataError}</p>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-500/20 rounded-full blur-xl group-hover:bg-primary-500/30 transition-colors" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/20 text-primary-400 shadow-inner border border-primary-500/30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Total Orders</p>
              <div className="flex items-baseline gap-2">
                <p className="mt-1 text-3xl font-black text-white">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-colors" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 shadow-inner border border-indigo-500/30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Total Products</p>
              <div className="flex items-baseline gap-2">
                <p className="mt-1 text-3xl font-black text-white">{products.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Orders List */}
        <div className="flex flex-col h-[500px]">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            Recent Orders
          </h2>
          <div className="glass-card rounded-2xl p-2 flex-grow overflow-hidden flex flex-col border border-white/5">
            {loadingData && (
              <div className="flex justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
              </div>
            )}
            <div className="overflow-y-auto custom-scrollbar p-2 space-y-3 flex-grow pr-2">
              {orders.length === 0 && !loadingData ? (
                <div className="text-center py-12 text-slate-500 text-sm">No orders found.</div>
              ) : (
                orders.map((o) => (
                  <div
                    key={o._id}
                    className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-all hover:bg-slate-800 hover:border-slate-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-white text-sm">
                        Order #{o._id.slice(-6).toUpperCase()}
                      </p>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                        o.status === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                        o.status === 'processing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 
                        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                      }`}>
                        {o.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Customer: <span className="text-slate-300">{o.user?.name || "Unknown"}</span></p>
                        <p className="text-xs text-slate-400">Items: <span className="text-slate-300">{o.items?.length || 0}</span></p>
                      </div>
                      <p className="font-bold text-primary-400">₹{o.totalAmount?.toFixed(2) ?? "0.00"}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Products List & Creation */}
        <div className="flex flex-col h-[500px]">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
             <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            Inventory Management
          </h2>
          <div className="glass-card rounded-2xl p-2 flex-grow overflow-hidden flex flex-col border border-white/5">
             <div className="overflow-y-auto custom-scrollbar p-2 space-y-3 flex-grow pr-2">
              {products.length === 0 && !loadingData ? (
                <div className="text-center py-12 text-slate-500 text-sm">No products found.</div>
              ) : (
                products.map((p) => (
                  <div
                    key={p._id}
                    className="flex justify-between items-center rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-all hover:bg-slate-800 hover:border-slate-600"
                  >
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden shrink-0">
                         {p.images?.[0] ? 
                           <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" /> :
                           <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-bold bg-slate-800">{p.name.substring(0,2).toUpperCase()}</div>
                         }
                       </div>
                       <div>
                         <p className="text-sm font-bold text-white line-clamp-1">{p.name}</p>
                         <p className="text-xs text-slate-400">Stock: {p.stock || 'N/A'}</p>
                       </div>
                    </div>
                    <p className="font-bold text-indigo-400 shrink-0 ml-4">
                      ₹{(p.discountPrice ?? p.price).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Add New Product
        </h2>
        
        <form
          onSubmit={handleCreateProduct}
          className="glass-card rounded-2xl p-6 sm:p-8 grid gap-5 md:grid-cols-2 border border-white/5 relative overflow-hidden"
        >
          {/* Subtle background glow for form */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-indigo-900/10 pointer-events-none" />
          
          <div className="relative z-10 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Name</label>
            <input
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              placeholder="E.g., Premium Leather Jacket"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors shadow-sm"
            />
          </div>
          
          <div className="relative z-10 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Slug</label>
            <input
              value={newProduct.slug}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, slug: e.target.value }))
              }
              required
              placeholder="e.g., premium-leather-jacket"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors shadow-sm"
            />
          </div>
          
          <div className="relative z-10 md:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
              required
              rows={3}
              placeholder="Detailed description of the product..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors shadow-sm resize-none custom-scrollbar"
            />
          </div>
          
          <div className="relative z-10 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Price (₹)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, price: e.target.value }))
              }
              required
              placeholder="0.00"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors shadow-sm"
            />
          </div>
          
          <div className="relative z-10 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Image URLs (comma separated)
            </label>
            <input
              value={newProduct.images}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, images: e.target.value }))
              }
              placeholder="https://example.com/img1.jpg, ..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors shadow-sm"
            />
          </div>
          
          <div className="relative z-10 md:col-span-2 pt-2 border-t border-slate-800/50 mt-2 flex justify-end">
            <button
              type="submit"
              disabled={creatingProduct}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:bg-primary-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none min-w-[200px]"
            >
              {creatingProduct ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Creating...
                </>
              ) : (
                "Add Product to Store"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminDashboardPage;