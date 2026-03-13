import { Routes, Route } from "react-router-dom";
import PageShell from "./components/Layout/PageShell.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";

const App = () => {
  return (
    <Routes>
      {/* Auth Routes (Standalone) */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      {/* Main Layout Routes (With Navbar & Footer) */}
      <Route
        path="*"
        element={
          <PageShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin/*" element={<AdminDashboardPage />} />
            </Routes>
          </PageShell>
        }
      />
    </Routes>
  );
};

export default App;