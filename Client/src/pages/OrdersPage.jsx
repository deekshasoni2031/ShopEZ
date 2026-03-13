import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/orders/my");
        setOrders(res.data);
      } catch {
        setError("Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section>
      <h1 className="text-xl font-semibold">Your Orders</h1>
      {loading && <p className="mt-2 text-sm text-slate-300">Loading…</p>}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      {!loading && orders.length === 0 && !error && (
        <p className="mt-2 text-sm text-slate-300">
          You have not placed any orders yet.
        </p>
      )}
      <div className="mt-4 space-y-3">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block rounded-lg border border-slate-800 bg-slate-900/60 p-3 hover:border-primary-500"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                Order #{order._id.slice(-6)}
              </span>
              <span className="text-xs uppercase text-slate-400">
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {order.items?.length || 0} items • ₹
              {order.totalAmount?.toFixed(2) ?? "0.00"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;