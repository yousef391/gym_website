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
  const [timeRange, setTimeRange] = useState('week'); // 'week' | 'month'

  useEffect(() => {
    if (store) {
      fetchStats();
    }
  }, [store, timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Fetch counts
      const [productsRes, categoriesRes, recommendationsRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }).eq('store_id', store.id),
        supabase.from('categories').select('id', { count: 'exact' }).eq('store_id', store.id),
        supabase.from('user_recommendations').select('user_id', { count: 'exact' }).eq('store_id', store.id),
      ]);

      // Fetch ORDERS for chart
      const startDate = new Date();
      const daysToSubtract = timeRange === 'week' ? 7 : 30;
      startDate.setDate(startDate.getDate() - daysToSubtract);

      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('store_id', store.id)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });
        
      if (ordersError) throw ordersError;

      // Calculate Revenue & Aggregate for Chart
      
      const { count: allOrdersCount, data: allOrdersData } = await supabase
        .from('orders')
        .select('total_amount', { count: 'exact' })
        .eq('store_id', store.id);

      const allTimeRevenue = allOrdersData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

      const aggregatedData = processChartData(orders || [], daysToSubtract);

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

  const processChartData = (orders, days) => {
    const today = new Date();
    const chartDays = Array.from({ length: days }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (days - 1 - i));
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }); // Mon
      const dayNum = d.getDate(); // 17
      return {
        date: days > 7 ? `${dayNum} ${dayName}` : dayName, // "17 Mon" vs "Mon"
        fullDate: d.toISOString().split('T')[0],
        amount: 0,
        orders: 0
      };
    });

    orders.forEach(order => {
      const orderDate = new Date(order.created_at).toISOString().split('T')[0];
      const dayStat = chartDays.find(d => d.fullDate === orderDate);
      if (dayStat) {
        dayStat.amount += (order.total_amount || 0);
        dayStat.orders += 1;
      }
    });

    return chartDays;
  };
  
  // ... statCards ...

  return (
    <div className="space-y-8">
      {/* Header */}
      {/* ... header code ... */}

      {/* Stats Grid */}
      {/* ... stats grid code ... */}

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
