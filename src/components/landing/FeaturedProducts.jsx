import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../common/ProductCard";

const FeaturedProducts = () => {
  const { products } = useStore();
  
  if (!products || products.length === 0) return null;

  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-theme-primary-light blob opacity-40 animate-blob" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-theme-accent blob-2 opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-theme-primary-light text-theme-primary font-medium rounded-full text-sm mb-4">
            Choose your Plan
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-dark mb-4">
            SUPPLEMENT <span className="gradient-theme-text">PACKAGES</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Premium quality supplements trusted by thousands of customers
            worldwide
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View all link */}
        <div className="flex justify-center mt-12">
          <Link
            to="/store"
            className="group inline-flex items-center px-8 py-4 gradient-theme text-white font-heading rounded-full hover:shadow-theme transition-all duration-300 btn-press"
          >
            View All Products
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
