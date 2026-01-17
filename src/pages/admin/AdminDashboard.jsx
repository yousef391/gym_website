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
    revenueToday: 0,
    revenueWeek: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week'); // 'week' | 'month'
  // Keep track of the raw orders data for toggling chart without refetching
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (store) {
      fetchStats();
    }
  }, [store]);

  // Update chart when timeRange changes (using existing data if available)
  useEffect(() => {
    if (recentOrders.length > 0) {
      const days = timeRange === 'week' ? 7 : 30;
      setChartData(processChartData(recentOrders, days));
    }
  }, [timeRange, recentOrders]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Fetch counts & All-time Revenue
      const [productsRes, categoriesRes, recommendationsRes, allOrdersRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }).eq('store_id', store.id),
        supabase.from('categories').select('id', { count: 'exact' }).eq('store_id', store.id),
        supabase.from('user_recommendations').select('user_id', { count: 'exact' }).eq('store_id', store.id),
        supabase.from('orders').select('total_amount').eq('store_id', store.id) // Fetch amounts for total calculation
      ]);

      // Calculate All-Time Revenue
      const allTimeRevenue = allOrdersRes.data?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
      const totalOrdersCount = allOrdersRes.data?.length || 0;

      // Fetch Recent Orders (Last 30 Days) for Cards & Chart
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('store_id', store.id)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });
        
      if (ordersError) throw ordersError;
      
      setRecentOrders(orders || []); // Save for chart toggling

      // Calculate Day/Week Stats
      const todayStr = new Date().toISOString().split('T')[0];
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      let revToday = 0;
      let revWeek = 0;

      orders?.forEach(order => {
         const orderDate = new Date(order.created_at);
         const orderDateStr = orderDate.toISOString().split('T')[0];
         
         if (orderDateStr === todayStr) {
            revToday += (order.total_amount || 0);
         }
         
         if (orderDate >= sevenDaysAgo) {
            revWeek += (order.total_amount || 0);
         }
      });

      setStats({
        products: productsRes.count || 0,
        categories: categoriesRes.count || 0,
        recommendations: recommendationsRes.count || 0,
        orders: totalOrdersCount,
        revenue: allTimeRevenue,
        revenueToday: revToday,
        revenueWeek: revWeek,
      });

    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (orders, days) => {
    const today = new Date();
    // Filter orders for the selected range ONLY for the chart
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const filteredOrders = orders.filter(o => new Date(o.created_at) >= cutoffDate);

    const chartDays = Array.from({ length: days }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (days - 1 - i));
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }); 
      const dayNum = d.getDate();
      return {
        date: days > 7 ? `${dayNum} ${dayName}` : dayName,
        fullDate: d.toISOString().split('T')[0],
        amount: 0,
        orders: 0
      };
    });

    filteredOrders.forEach(order => {
      const orderDate = new Date(order.created_at).toISOString().split('T')[0];
      const dayStat = chartDays.find(d => d.fullDate === orderDate);
      if (dayStat) {
        dayStat.amount += (order.total_amount || 0);
        dayStat.orders += 1;
      }
    });

    return chartDays;
  };
  
  const statCards = [
    {
      title: "Today's Revenue",
      value: `${stats.revenueToday.toLocaleString()} DZD`,
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      link: '/admin/orders',
    },
     {
      title: "This Week's Revenue",
      value: `${stats.revenueWeek.toLocaleString()} DZD`,
      icon: TrendingUp,
      color: 'from-teal-500 to-teal-600',
      link: '/admin/orders',
    },
    {
      title: 'Total Revenue',
      value: `${stats.revenue.toLocaleString()} DZD`,
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/orders',
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: ShoppingBag,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/orders',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className={`relative p-6 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br ${card.color} transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="absolute top-4 right-4 text-white opacity-30">
              <card.icon size={48} />
            </div>
            <p className="text-sm font-medium text-white text-opacity-80 mb-1">
              {card.title}
            </p>
            <h3 className="text-3xl font-extrabold text-white">
              {loading ? (
                <div className="h-8 bg-white/20 rounded w-3/4 animate-pulse"></div>
              ) : (
                card.value
              )}
            </h3>
          </Link>
        ))}
      </div>

      {/* Analytics Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart */}
         <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Revenue
              </h2>
              <div className="flex bg-gray-700/50 rounded-lg p-1">
                <button
                  onClick={() => setTimeRange('week')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    timeRange === 'week' 
                      ? 'bg-emerald-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    timeRange === 'month' 
                      ? 'bg-emerald-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Month
                </button>
              </div>
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
