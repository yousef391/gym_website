import { useState, useEffect } from "react";
import { X, Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Minus, Plus, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";

const ProductModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  // Product images (use main image + generate variations for demo)
  const images = [
    product.image_url || product.image || "/images/hero-product.png",
    "/images/protein.png",
    "/images/creatine.png",
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || product.image || "/images/hero-product.png",
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container - Pinterest style */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="grid md:grid-cols-2 h-full">
            {/* Left - Image Gallery */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col">
              {/* Main Image */}
              <div className="flex-1 flex items-center justify-center relative min-h-[300px] md:min-h-[400px]">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain transition-all duration-500 hover:scale-105"
                  style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </>
                )}

                {/* Discount badge */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute top-0 left-0 gradient-theme-accent text-white px-4 py-2 rounded-full text-sm font-bold">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex justify-center gap-3 mt-6">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-theme-primary shadow-theme"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Product Details */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[90vh] md:max-h-none">
              {/* Category badge */}
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-4">
                {product.categories?.name || product.category || "Supplement"}
              </span>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-heading text-dark mb-3">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 4.5)
                          ? "text-accent fill-accent"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviews_count || product.reviews || 128} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-heading text-theme-primary">
                  ${product.price?.toFixed(2) || "0.00"}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description ||
                  "Premium quality supplement designed to support your fitness goals. Made with the highest quality ingredients for maximum effectiveness."}
              </p>

              {/* Benefits */}
              <div className="mb-6">
                <h4 className="font-heading text-dark mb-3">Benefits</h4>
                <div className="grid grid-cols-2 gap-2">
                  {(product.benefits || ["Muscle Growth", "Fast Recovery", "Pure Ingredients", "Lab Tested"]).slice(0, 4).map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-theme-primary" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center bg-gray-100 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-heading text-white transition-all duration-300 ${
                    addedToCart
                      ? "bg-green-500"
                      : "gradient-theme-accent hover:shadow-theme-accent"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                    isWishlisted
                      ? "bg-red-50 border-red-500 text-red-500"
                      : "border-gray-200 text-gray-400 hover:border-gray-300"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`} />
                </button>
                <button className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-gray-200 text-gray-400 hover:border-gray-300 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Check className="w-4 h-4 text-theme-primary" />
                  Free shipping over $50
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Check className="w-4 h-4 text-theme-primary" />
                  30-day returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ProductModal;
