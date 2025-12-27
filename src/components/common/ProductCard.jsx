import { Star, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-500 product-card hover-lift"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-4 py-1.5 text-xs font-heading bg-gradient-green text-white rounded-full shadow-green">
            {product.badge}
          </span>
        </div>
      )}

      {/* Discount badge */}
      {product.originalPrice && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 bg-gradient-orange text-white text-xs font-bold rounded-full shadow-orange">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        </div>
      )}

      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-primary-50 to-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover product-image"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 bg-gradient-orange text-white rounded-full flex items-center justify-center shadow-orange transform translate-y-4 group-hover:translate-y-0 duration-300 hover:scale-110 transition-transform"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 bg-white text-dark rounded-full flex items-center justify-center shadow-card transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 hover:scale-110 transition-transform">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Name */}
        <h3 className="font-heading text-dark group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-2xl gradient-text">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-accent fill-accent"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-gradient-orange text-white font-heading rounded-xl shadow-orange hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 btn-press"
        >
          BUY NOW
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
