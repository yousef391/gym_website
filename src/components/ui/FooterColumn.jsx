import { Link } from "react-router-dom";
import {
  Dumbbell,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const data = {
  facebookLink: "https://facebook.com/muscleup",
  instaLink: "https://instagram.com/muscleup",
  twitterLink: "https://twitter.com/muscleup",
  youtubeLink: "https://youtube.com/muscleup",
  shop: {
    all: "/store",
    protein: "/store?category=protein",
    preworkout: "/store?category=pre-workout",
    creatine: "/store?category=creatine",
    vitamins: "/store?category=vitamins",
  },
  company: {
    about: "#",
    careers: "#",
    blog: "#",
    press: "#",
  },
  help: {
    faqs: "#",
    support: "#",
    shipping: "#",
    returns: "#",
  },
  contact: {
    email: "support@muscleup.com",
    phone: "1-800-MUSCLEUP",
    address: "Los Angeles, CA",
  },
  brand: {
    name: "MuscleUp",
    description:
      "Premium supplements crafted for those who value quality and fitness. Fuel your body, elevate your performance, and achieve your goals.",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
  { icon: Twitter, label: "Twitter", href: data.twitterLink },
  { icon: Youtube, label: "YouTube", href: data.youtubeLink },
];

const shopLinks = [
  { text: "All Products", href: data.shop.all },
  { text: "Protein", href: data.shop.protein },
  { text: "Pre-Workout", href: data.shop.preworkout },
  { text: "Creatine", href: data.shop.creatine },
  { text: "Vitamins", href: data.shop.vitamins },
];

const companyLinks = [
  { text: "About Us", href: data.company.about },
  { text: "Careers", href: data.company.careers },
  { text: "Blog", href: data.company.blog },
  { text: "Press", href: data.company.press },
];

const helpLinks = [
  { text: "FAQs", href: data.help.faqs },
  { text: "Support", href: data.help.support },
  { text: "Shipping Info", href: data.help.shipping },
  { text: "Returns", href: data.help.returns },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function FooterColumn() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-hero mt-0 w-full rounded-t-3xl relative overflow-hidden">
      {/* Decorative elements */}

      {/* Newsletter section */}
      <div className="relative bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl text-dark tracking-wide mb-2">
                Get 15% Off Your First Order
              </h3>
              <p className="text-dark/80">
                Subscribe to our newsletter for exclusive deals and fitness
                tips.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 bg-dark/10 backdrop-blur-sm border border-white/20 rounded-full text-dark placeholder-dark/60 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-orange text-dark font-heading rounded-full shadow-orange hover:shadow-lg transition-all duration-300 btn-press"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand section */}
          <div>
            <div className="flex justify-center gap-3 sm:justify-start">
              <div className="w-12 h-12 bg-gradient-green rounded-2xl flex items-center justify-center shadow-green">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading text-3xl text-dark tracking-wide self-center">
                {data.brand.name}
              </span>
            </div>

            <p className="text-gray-600 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              {data.brand.description}
            </p>

            <ul className="mt-8 flex justify-center gap-4 sm:justify-start">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-dark/10 rounded-xl text-gray-600 hover:bg-gradient-green hover:text-white transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-2">
            {/* Shop */}
            <div className="text-center sm:text-left">
              <p className="font-heading text-lg tracking-wide text-dark mb-6">
                Shop
              </p>
              <ul className="space-y-3 text-sm">
                {shopLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      to={href}
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="text-center sm:text-left">
              <p className="font-heading text-lg tracking-wide text-dark mb-6">
                Company
              </p>
              <ul className="space-y-3 text-sm">
                {companyLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      to={href}
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div className="text-center sm:text-left">
              <p className="font-heading text-lg tracking-wide text-dark mb-6">
                Support
              </p>
              <ul className="space-y-3 text-sm">
                {helpLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      to={href}
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-left">
              <p className="font-heading text-lg tracking-wide text-dark mb-6">
                Contact Us
              </p>
              <ul className="space-y-4 text-sm">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <a
                      href="#"
                      className="flex items-center justify-center gap-3 sm:justify-start group"
                    >
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      {isAddress ? (
                        <address className="text-gray-600 not-italic group-hover:text-primary transition-colors">
                          {text}
                        </address>
                      ) : (
                        <span className="text-gray-600 group-hover:text-primary transition-colors">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-dark/10 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-gray-600 text-sm">
              <span className="block sm:inline">All rights reserved.</span>
            </p>

            <p className="text-gray-600 mt-4 text-sm sm:order-first sm:mt-0">
              &copy; {currentYear} {data.brand.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
