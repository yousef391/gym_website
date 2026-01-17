import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import { supabase } from "../lib/supabaseClient";
import { 
  ShoppingBag, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Check, 
  Loader2,
  User,
  Phone,
  MapPin
} from "lucide-react";

// List of Algerian Wilayas
const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
  "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
  "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
  "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
  "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj",
  "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
  "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal",
  "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems: cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { store } = useStore();
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    wilaya: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.wilaya) newErrors.wilaya = "Please select your wilaya";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const orderData = {
        store_id: store.id,
        customer_name: form.name.trim(),
        customer_phone: form.phone.trim(),
        customer_wilaya: form.wilaya,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total_amount: cartTotal,
        status: "pending"
      };

      const { data, error } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

      setOrderId(data.id);
      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Error creating order:", err);
      setErrors({ submit: "Failed to create order. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-card">
          <div className="w-20 h-20 gradient-theme rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading text-3xl text-dark mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll contact you at <strong>{form.phone}</strong> to confirm delivery.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Order ID: {orderId?.slice(0, 8).toUpperCase()}
          </p>
          <Link
            to="/store"
            className="inline-flex items-center justify-center px-6 py-3 gradient-theme text-white font-heading rounded-full hover:shadow-theme transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="font-heading text-2xl text-dark mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Add some products to checkout</p>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-theme text-white font-heading rounded-full hover:shadow-theme transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/store"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft hover:shadow-card transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="font-heading text-3xl text-dark">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Customer Form */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft">
            <h2 className="font-heading text-xl text-dark mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-theme-primary" />
              Your Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-2 transition-colors focus:outline-none ${
                      errors.name 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-transparent focus:border-theme-primary"
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0XX XXX XXXX"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-2 transition-colors focus:outline-none ${
                      errors.phone 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-transparent focus:border-theme-primary"
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Wilaya */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wilaya *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={form.wilaya}
                    onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-2 transition-colors focus:outline-none appearance-none cursor-pointer ${
                      errors.wilaya 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-transparent focus:border-theme-primary"
                    }`}
                  >
                    <option value="">Select your wilaya</option>
                    {WILAYAS.map((wilaya, index) => (
                      <option key={wilaya} value={wilaya}>
                        {String(index + 1).padStart(2, "0")} - {wilaya}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.wilaya && <p className="text-red-500 text-sm mt-1">{errors.wilaya}</p>}
              </div>

              {errors.submit && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                  {errors.submit}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 gradient-theme-accent text-white font-heading text-lg rounded-full hover:shadow-theme-accent transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Confirm Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right - Order Summary */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft h-fit">
            <h2 className="font-heading text-xl text-dark mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-theme-primary" />
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-2xl">
                  <img
                    src={item.image || "/images/hero-product.png"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-dark truncate">{item.name}</h3>
                    <p className="text-theme-primary font-heading">{item.price?.toFixed(2)} DZD</p>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto w-7 h-7 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{cartTotal.toFixed(2)} DZD</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-theme-primary">To be confirmed</span>
              </div>
              <div className="flex justify-between text-xl font-heading text-dark pt-3 border-t border-gray-100">
                <span>Total</span>
                <span className="gradient-theme-text">{cartTotal.toFixed(2)} DZD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
