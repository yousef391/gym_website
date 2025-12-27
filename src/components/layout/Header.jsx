import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Leaf } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartSidebar from "./CartSidebar";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/store", label: "Store" },
    { path: "/recommend", label: "News" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-card py-2"
            : "bg-cream-light/80 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-green rounded-xl flex items-center justify-center shadow-green">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl text-dark">MuscleUp</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-300 relative group hover:-translate-y-0.5 ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-dark hover:text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-green rounded-full transition-all duration-300 ${
                      isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              {/* Cart button */}
              <button
                onClick={toggleCart}
                className="relative p-2.5 text-dark hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-orange text-white text-xs font-bold rounded-full flex items-center justify-center shadow-orange animate-bounce-slow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* CTA Button */}
              <Link
                to="/store"
                className="hidden sm:flex items-center px-6 py-2.5 bg-gradient-green text-white text-sm font-heading rounded-full hover:shadow-green transition-all duration-300 btn-press hover:-translate-y-0.5"
              >
                Order Now
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 text-dark hover:text-primary transition-colors rounded-lg hover:bg-primary-50"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col py-4 px-6 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 ${
                  isActive(link.path) ? "text-primary" : "text-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/store"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-green text-white font-heading rounded-full shadow-green transition-colors mt-2"
            >
              Order Now
            </Link>
          </nav>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
};

export default Header;
