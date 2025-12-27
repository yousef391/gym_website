import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { products } from "../../data/products";
import ProductCard from "../common/ProductCard";

const FeaturedProducts = () => {
  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-50 text-primary font-medium rounded-full text-sm mb-4">
            Choose your Plan
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-dark mb-4">
            SUPPLEMENT <span className="gradient-text">PACKAGES</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Premium quality supplements trusted by thousands of customers
            worldwide
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View all link */}
        <div className="flex justify-center mt-12">
          <Link
            to="/store"
            className="group inline-flex items-center px-8 py-4 bg-gradient-green text-white font-heading rounded-full hover:shadow-green transition-all duration-300 btn-press"
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
