import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { Package, FolderTree, TrendingUp, Users, Eye, DollarSign, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevenueChart from '../../components/admin/RevenueChart';

const AdminDashboard = () => {
  const { store } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    recommendations: 0,
    orders: 0,
    revenue: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (store) {
      fetchStats();
    }
  }, [store]);

  const fetchStats = async () => {
    try {
      // Fetch counts
      const [productsRes, categoriesRes, recommendationsRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }).eq('store_id', store.id),
        supabase.from('categories').select('id', { count: 'exact' }).eq('store_id', store.id),
        supabase.from('user_recommendations').select('user_id', { count: 'exact' }).eq('store_id', store.id),
      ]);

      // Fetch ORDERS for chart (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('store_id', store.id)
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: true });
        
      if (ordersError) throw ordersError;

      // Calculate Revenue & Aggregate for Chart
      let totalRevenue = 0;
      let totalOrders = orders.length; // Count of orders in last 7 days for "active" metric
      
      // We also want TOTAL ALL TIME orders/revenue maybe? For now just showing fetched.
      // Better: Fetch ALL orders count separately if needed.
      // Let's assume stats cards show All Time, and chart shows 7 days.
      
      const { count: allOrdersCount, data: allOrdersData } = await supabase
        .from('orders')
        .select('total_amount', { count: 'exact' })
        .eq('store_id', store.id);

      const allTimeRevenue = allOrdersData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

      const aggregatedData = processChartData(orders || []);

      setStats({
        products: productsRes.count || 0,
        categories: categoriesRes.count || 0,
        recommendations: recommendationsRes.count || 0,
        orders: allOrdersCount || 0,
        revenue: allTimeRevenue,
      });
      setChartData(aggregatedData);

    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (orders) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - i));
      return {
        date: days[d.getDay()], // e.g. "Mon"
        fullDate: d.toISOString().split('T')[0],
        amount: 0,
        orders: 0
      };
    });

    orders.forEach(order => {
      const orderDate = order.created_at.split('T')[0];
      const dayStat = last7Days.find(d => d.fullDate === orderDate);
      if (dayStat) {
        dayStat.amount += (order.total_amount || 0);
        dayStat.orders += 1;
      }
    });

    return last7Days;
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `${stats.revenue.toLocaleString()} DZD`,
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-400',
      link: '/admin/orders',
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/orders',
    },
    {
      title: 'Products',
      value: stats.products,
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/products',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Overview for <span className="text-emerald-400 font-semibold">{store?.name}</span>
          </p>
        </div>
        <a
          href={`/?store=${store?.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Store
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map(({ title, value, icon: Icon, color, link }) => (
          <div
            key={title}
            className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${color} rounded-bl-3xl`}>
               <Icon className="w-16 h-16 text-white" />
            </div>

            <div className="relative z-10">
              <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
              <h3 className="text-3xl font-bold text-white tracking-tight">{loading ? '...' : value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart */}
         <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Revenue <span className="text-xs font-normal text-gray-500 ml-2">(Last 7 Days)</span>
              </h2>
            </div>
            
            {!loading && <RevenueChart data={chartData} />}
         </div>

         {/* Quick Actions (Sidebar) */}
         <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/admin/products" className="block w-full text-center py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-200 rounded-xl transition-colors text-sm font-medium">
                  Add New Product
                </Link>
                <Link to="/admin/orders" className="block w-full text-center py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-200 rounded-xl transition-colors text-sm font-medium">
                  View Recent Orders
                </Link>
                <Link to="/admin/settings" className="block w-full text-center py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-200 rounded-xl transition-colors text-sm font-medium">
                  Store Settings
                </Link>
              </div>
            </div>
         </div>
      </div>

      {/* Recent Activity / Recommendations (Simplified for now) */}
      
    </div>
  );
};

export default AdminDashboard;
