import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { Package, FolderTree, TrendingUp, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { store } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    recommendations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (store) {
      fetchStats();
    }
  }, [store]);

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes, recommendationsRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }).eq('store_id', store.id),
        supabase.from('categories').select('id', { count: 'exact' }).eq('store_id', store.id),
        supabase.from('user_recommendations').select('id', { count: 'exact' }).eq('store_id', store.id),
      ]);

      setStats({
        products: productsRes.count || 0,
        categories: categoriesRes.count || 0,
        recommendations: recommendationsRes.count || 0,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Products',
      value: stats.products,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/products',
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: FolderTree,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/categories',
    },
    {
      title: 'Recommendations',
      value: stats.recommendations,
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      link: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back! Here's an overview of your store.
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
            className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {loading ? '...' : value}
                </p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            {link && (
              <Link
                to={link}
                className="inline-block mt-4 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Manage {title} →
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/products"
            className="p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl text-center transition-colors"
          >
            <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white font-medium">Add Product</p>
          </Link>
          <Link
            to="/admin/categories"
            className="p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl text-center transition-colors"
          >
            <FolderTree className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-medium">Add Category</p>
          </Link>
          <Link
            to="/admin/settings"
            className="p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl text-center transition-colors"
          >
            <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-white font-medium">Upload Logo</p>
          </Link>
          <a
            href={`/?store=${store?.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl text-center transition-colors"
          >
            <Eye className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-white font-medium">Preview Store</p>
          </a>
        </div>
      </div>

      {/* Store Info */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4">Store Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400 text-sm">Store Name</p>
            <p className="text-white font-medium">{store?.name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Store URL</p>
            <p className="text-emerald-400 font-medium">
              {window.location.origin}/?store={store?.slug}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Primary Color</p>
            <div className="flex items-center gap-2 mt-1">
              <div
                className="w-6 h-6 rounded-md border border-gray-600"
                style={{ backgroundColor: store?.primary_color }}
              />
              <p className="text-white font-mono">{store?.primary_color}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Created</p>
            <p className="text-white font-medium">
              {store?.created_at && new Date(store.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
