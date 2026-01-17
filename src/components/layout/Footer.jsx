import { Link } from "react-router-dom";
import {
  Dumbbell,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

const Footer = () => {
  const { store } = useStore();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "All Products", path: "/store" },
      { label: "Protein", path: "/store?category=protein" },
      { label: "Pre-Workout", path: "/store?category=pre-workout" },
      { label: "Creatine", path: "/store?category=creatine" },
      { label: "Vitamins", path: "/store?category=vitamins" },
    ],
    company: [
      { label: "About Us", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Blog", path: "#" },
      { label: "Press", path: "#" },
    ],
    support: [
      { label: "Contact Us", path: "#" },
      { label: "FAQs", path: "#" },
      { label: "Shipping Info", path: "#" },
      { label: "Returns", path: "#" },
      { label: "Track Order", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: store?.instagram_url, label: "Instagram" },
    { icon: Facebook, href: store?.facebook_url, label: "Facebook" },
    { icon: Twitter, href: store?.twitter_url, label: "Twitter" },
    { icon: Youtube, href: store?.youtube_url, label: "YouTube" },
  ].filter(link => link.href);

  return (
    <footer className="bg-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-theme-primary/5 blob opacity-50" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-theme-accent/5 blob-2 opacity-30" />

      {/* Newsletter section */}
      <div className="relative gradient-theme py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl text-white tracking-wide mb-2">
                Get 15% Off Your First Order
              </h3>
              <p className="text-white/80">
                Subscribe to our newsletter for exclusive deals and fitness
                tips.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-theme-accent text-white font-heading rounded-full hover:shadow-lg transition-all duration-300 btn-press"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              {store?.logo_url ? (
                <img 
                  src={`${store.logo_url}?t=${store.updated_at || ''}`} 
                  alt={store.name} 
                  className="w-12 h-12 rounded-2xl object-contain"
                />
              ) : (
                <div className="w-12 h-12 gradient-theme rounded-2xl flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
              )}
              <span className="font-heading text-2xl tracking-wide text-white">
                {store?.name || "MuscleUp"}
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Premium supplements crafted for those who value quality and
              fitness. Fuel your body, elevate your performance.
            </p>
            <div className="space-y-3 text-gray-400">
              {store?.email && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-theme-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-theme-primary" />
                  </div>
                  <span>{store.email}</span>
                </div>
              )}
              {store?.phone && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-theme-primary/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-theme-primary" />
                  </div>
                  <span>{store.phone}</span>
                </div>
              )}
              {store?.address && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-theme-primary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-theme-primary" />
                  </div>
                  <span>{store.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-heading text-lg tracking-wide text-white mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-theme-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-heading text-lg tracking-wide text-white mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-theme-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="font-heading text-lg tracking-wide text-white mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-theme-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} {store?.name || "MuscleUp"}. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-gray-400 hover:bg-theme-primary hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Payment info */}
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm">Secure payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
