import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch {
        setError("Failed to load order.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return <p className="mt-2 text-sm text-slate-300">Loading order…</p>;
  }

  if (error) {
    return <p className="mt-2 text-sm text-red-400">{error}</p>;
  }

  if (!order) {
    return <p className="mt-2 text-sm text-slate-300">Order not found.</p>;
  }

  const address = order.shippingAddress || {};

  return (
    <section>
      <h1 className="text-xl font-semibold">
        Order #{order._id.slice(-6)}
      </h1>
      <p className="mt-1 text-xs text-slate-400">
        Status: <span className="uppercase">{order.status}</span>
      </p>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold">Items</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {order.items.map((item) => (
              <li
                key={item.product}
                className="flex justify-between rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <div>
            <h2 className="text-sm font-semibold">Shipping address</h2>
            <p className="mt-1 text-xs text-slate-300">
              {address.fullName}
              <br />
              {address.street}
              <br />
              {address.city}, {address.state} {address.postalCode}
              <br />
              {address.country}
              <br />
              Phone: {address.phone}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Payment</h2>
            <p className="mt-1 text-xs text-slate-300">
              Method: {order.paymentMethod}
              <br />
              Total paid: ₹{order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailsPage;