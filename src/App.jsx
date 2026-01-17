import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { StoreProvider, useStore } from "./context/StoreContext";
import { Loader2, Dumbbell } from "lucide-react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import StorePage from "./pages/StorePage";
import RecommendationPage from "./pages/RecommendationPage";
import CheckoutPage from "./pages/CheckoutPage";

// Admin imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsManager from "./pages/admin/ProductsManager";
import CategoriesManager from "./pages/admin/CategoriesManager";
import OrdersManager from "./pages/admin/OrdersManager";
import StoreSettings from "./pages/admin/StoreSettings";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Layout wrapper for public store pages
function PublicLayout() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Global loader to prevent theme flash
function StoreLoader({ children }) {
  const { loading } = useStore();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-cream z-50 flex flex-col items-center justify-center">
        <div className="relative">
          {/* Pulsing background */}
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
          
          {/* Logo container */}
          <div className="relative w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl shadow-xl flex items-center justify-center transform rotate-3 animate-pulse">
            <Dumbbell className="w-12 h-12 text-white transform -rotate-3" />
          </div>
          
          {/* Decor element */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800 font-heading tracking-wide">
            Loading Store
          </h2>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <StoreProvider>
          <StoreLoader>
            <CartProvider>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<ProductsManager />} />
                  <Route path="categories" element={<CategoriesManager />} />
                  <Route path="orders" element={<OrdersManager />} />
                  <Route path="settings" element={<StoreSettings />} />
                </Route>

                {/* Public Store Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="store" element={<StorePage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="recommend" element={<RecommendationPage />} />
                </Route>
              </Routes>
            </CartProvider>
          </StoreLoader>
        </StoreProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
