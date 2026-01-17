import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Store, ArrowRight, ShoppingBag, BarChart3, Globe } from "lucide-react";
import HeroSection from "../components/landing/HeroSection";
import BenefitsBar from "../components/landing/BenefitsBar";
import CategoriesSection from "../components/landing/CategoriesSection";
import FeaturedProducts from "../components/landing/FeaturedProducts";

const LandingPage = () => {
  const { store, loading } = useStore();

  if (loading) return null; // Handled by global loader

  // PLATFORM LANDING PAGE (No store selected)
  if (!store) {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-black z-0 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8 animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                The #1 E-commerce Platform for Gyms
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                Launch Your <br/>
                <span className="text-emerald-500">Fitness Brand</span> Today
              </h1>
              
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Create a stunning, high-performance online store for your gym equipment, supplements, and merchandise in minutes. No coding required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/admin/login"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <Store className="w-5 h-5" />
                  Create Your Store
                </Link>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center gap-2">
                  View Demo Store <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/50 transition-colors group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Storefront</h3>
              <p className="text-gray-400">
                Get a professional, mobile-responsive store automatically generated with your branding.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/50 transition-colors group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Domain</h3>
              <p className="text-gray-400">
                Each store gets a unique URL. Share your store link directly with your customers.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 transition-colors group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Admin Dashboard</h3>
              <p className="text-gray-400">
                Manage products, track orders, and customize your store settings from one powerful dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STORE LANDING PAGE (Store selected)
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BenefitsBar />
      <CategoriesSection />
      <FeaturedProducts />
    </div>
  );
};

export default LandingPage;
