import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  MoveRight,
  Dumbbell,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartSidebar from "../layout/CartSidebar";

const navigationItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Products",
    description: "Premium supplements for peak performance.",
    items: [
      { title: "All Products", href: "/store" },
      { title: "Protein", href: "/store?category=protein" },
      { title: "Pre-Workout", href: "/store?category=pre-workout" },
      { title: "Creatine", href: "/store?category=creatine" },
      { title: "Vitamins", href: "/store?category=vitamins" },
    ],
  },
  {
    title: "Company",
    description: "Learn more about MuscleUp and our mission.",
    items: [
      { title: "About Us", href: "#" },
      { title: "Our Story", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Recommendations",
    href: "/recommend",
  },
];

function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { cartCount, toggleCart } = useCart();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const handleDropdownToggle = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-card py-2"
            : "bg-white/80 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[3.5rem]">
            {/* Logo - Center on mobile, left on desktop */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-green rounded-xl flex items-center justify-center shadow-green group-hover:shadow-lg transition-shadow">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl text-dark">MuscleUp</span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-1"
              ref={dropdownRef}
            >
              {navigationItems.map((item) => (
                <div key={item.title} className="relative">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-primary-50 ${
                        isActive(item.href)
                          ? "text-primary bg-primary-50"
                          : "text-dark hover:text-primary"
                      }`}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(item.title)}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-primary-50 ${
                          openDropdown === item.title
                            ? "text-primary bg-primary-50"
                            : "text-dark hover:text-primary"
                        }`}
                      >
                        {item.title}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            openDropdown === item.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Content */}
                      {openDropdown === item.title && (
                        <div className="absolute top-full left-0 mt-2 w-[400px] bg-white rounded-2xl shadow-card-hover border border-gray-100 p-4 animate-fade-in">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Left side - Description Card */}
                            <div className="flex flex-col justify-between p-3 bg-gradient-to-br from-primary-50 to-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
                              <div>
                                <p className="font-heading text-lg text-dark mb-2 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
                                  {item.title}
                                </p>
                                <p className="text-gray-500 text-sm transition-all duration-300 group-hover:text-gray-700">
                                  {item.description}
                                </p>
                              </div>
                              <Link
                                to="/store"
                                className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-gradient-green text-white text-sm font-heading rounded-full shadow-green hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                              >
                                Shop Now
                              </Link>
                            </div>

                            {/* Right side - Links */}
                            <div className="flex flex-col">
                              {item.items?.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  to={subItem.href}
                                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-primary-50 hover:text-primary transition-all duration-300 group/item hover:scale-105 hover:translate-x-1 hover:shadow-sm"
                                >
                                  <span className="transition-all duration-300 group-hover/item:font-medium">
                                    {subItem.title}
                                  </span>
                                  <MoveRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Cart button */}
              <button
                onClick={toggleCart}
                className="relative p-2.5 text-dark hover:text-primary transition-all duration-300 hover:bg-primary-50 rounded-lg"
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
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
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
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-card-hover">
            <nav className="flex flex-col py-4 px-6 space-y-2 max-h-[70vh] overflow-y-auto">
              {navigationItems.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                >
                  {item.href ? (
                    <Link
                      to={item.href}
                      className={`flex items-center justify-between py-3 text-base font-medium transition-colors duration-300 hover:text-primary ${
                        isActive(item.href) ? "text-primary" : "text-dark"
                      }`}
                    >
                      <span>{item.title}</span>
                      <MoveRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(item.title)}
                        className="flex items-center justify-between w-full py-3 text-base font-medium text-dark transition-colors duration-300 hover:text-primary"
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            openDropdown === item.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === item.title && (
                        <div className="pl-4 pb-2 space-y-1">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              className="flex items-center justify-between py-2 text-sm text-gray-500 hover:text-primary transition-colors duration-300"
                            >
                              <span>{subItem.title}</span>
                              <MoveRight className="w-4 h-4" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              <Link
                to="/store"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-green text-white font-heading rounded-full shadow-green transition-colors mt-4"
              >
                Order Now
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
}

export default HeaderNav;
