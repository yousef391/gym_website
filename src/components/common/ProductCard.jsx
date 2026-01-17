import { Star, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product, index, onClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-500 product-card hover-lift cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-heading gradient-theme text-white rounded-full shadow-theme">
            {product.badge}
          </span>
        </div>
      )}

      {/* Discount badge */}
      {product.originalPrice && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2 py-1 md:px-3 md:py-1.5 bg-theme-accent text-white text-[10px] md:text-xs font-bold rounded-full">
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
              className="w-12 h-12 gradient-theme text-white rounded-full flex items-center justify-center shadow-theme transform translate-y-4 group-hover:translate-y-0 duration-300 hover:scale-110 transition-transform"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
              }}
              className="w-12 h-12 bg-white text-dark rounded-full flex items-center justify-center shadow-card transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 hover:scale-110 transition-transform"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-5 space-y-2 md:space-y-3">
        {/* Name */}
        <h3 className="font-heading text-sm md:text-base text-dark group-hover:text-theme-primary transition-colors line-clamp-2 min-h-[2.5em] md:min-h-0">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg md:text-2xl gradient-theme-text">
              ${product.price?.toFixed(2) || '0.00'}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 md:w-4 md:h-4 ${
                  i < Math.floor(product.rating || 0)
                    ? "text-theme-accent fill-current"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2 md:py-3 gradient-theme text-white font-heading text-xs md:text-sm rounded-xl shadow-theme hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 btn-press"
        >
          <span className="hidden md:inline">BUY NOW</span>
          <span className="md:hidden">ADD</span>
          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
