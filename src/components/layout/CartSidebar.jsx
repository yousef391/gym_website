import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-dark/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300 ease-out shadow-card-hover ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-green">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 text-white" />
              <h2 className="font-heading text-xl tracking-wide text-white">
                Your Cart
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-cream-light">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-primary" />
                </div>
                <p className="text-dark text-lg mb-2 font-heading">
                  Your cart is empty
                </p>
                <p className="text-gray-500 text-sm">
                  Add some products to get started!
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-heading text-sm text-dark mb-1">
                      {item.name}
                    </h3>
                    <p className="text-primary font-bold">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-primary"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors text-primary"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-gray-500">Subtotal:</span>
                <span className="font-heading text-2xl text-dark">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button className="w-full py-4 bg-gradient-orange text-white font-heading text-lg rounded-full shadow-orange hover:shadow-lg transition-all duration-300 btn-press">
                Checkout
              </button>
              <p className="text-center text-gray-500 text-sm">
                Shipping & taxes calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
