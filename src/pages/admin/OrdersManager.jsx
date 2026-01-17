import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import {
  Package,
  Loader2,
  Eye,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ChevronDown,
  Phone,
  MapPin,
  User,
  X,
} from "lucide-react";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: XCircle },
};

const OrdersManager = () => {
  const { store } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    if (store?.id) fetchOrders();
  }, [store?.id]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingStatus(orderId);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", orderId);

      if (error) throw error;
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 mt-1">Manage customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/20">
          <p className="text-yellow-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
        </div>
        <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
          <p className="text-blue-400 text-sm">Confirmed</p>
          <p className="text-2xl font-bold text-blue-400">{stats.confirmed}</p>
        </div>
        <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
          <p className="text-purple-400 text-sm">Shipped</p>
          <p className="text-2xl font-bold text-purple-400">{stats.shipped}</p>
        </div>
        <div className="bg-green-500/10 rounded-2xl p-4 border border-green-500/20">
          <p className="text-green-400 text-sm">Delivered</p>
          <p className="text-2xl font-bold text-green-400">{stats.delivered}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "confirmed", "shipped", "delivered", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              statusFilter === status
                ? "bg-emerald-500 text-white"
                : "bg-gray-800/50 text-gray-400 hover:text-white"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/30 rounded-2xl border border-gray-700/50">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg text-white mb-2">No orders yet</h3>
          <p className="text-gray-500">Orders will appear here when customers place them</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = STATUS_CONFIG[order.status]?.icon || Clock;
            return (
              <div
                key={order.id}
                className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-5 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Order info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-gray-400">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[order.status]?.color || "bg-gray-100 text-gray-700"}`}>
                        <StatusIcon className="w-3 h-3" />
                        {STATUS_CONFIG[order.status]?.label || order.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {order.customer_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {order.customer_phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {order.customer_wilaya}
                      </span>
                    </div>
                  </div>

                  {/* Order total & date */}
                  <div className="text-right">
                    <p className="text-xl font-bold text-emerald-400">
                      ${Number(order.total_amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    
                    {/* Status dropdown */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        disabled={updatingStatus === order.id}
                        className="appearance-none bg-gray-700/50 hover:bg-gray-700 text-white text-sm rounded-lg pl-3 pr-8 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-gray-900 rounded-2xl z-50 overflow-auto max-h-[90vh] w-full md:max-w-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Order Details</h2>
                  <p className="text-gray-400 font-mono">#{selectedOrder.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Customer info */}
              <div className="bg-gray-800/50 rounded-xl p-4 mb-6 space-y-2">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Customer Information</h3>
                <div className="flex items-center gap-2 text-white">
                  <User className="w-4 h-4 text-gray-500" />
                  {selectedOrder.customer_name}
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {selectedOrder.customer_phone}
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {selectedOrder.customer_wilaya}
                </div>
              </div>

              {/* Order items */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {(selectedOrder.items || []).map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-gray-800/30 rounded-xl p-3">
                      <img
                        src={item.image || "/images/hero-product.png"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-emerald-400 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <span className="text-gray-400">Total Amount</span>
                <span className="text-2xl font-bold text-emerald-400">
                  ${Number(selectedOrder.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersManager;
