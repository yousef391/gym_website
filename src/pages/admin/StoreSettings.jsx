import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { extractColorsFromImage } from '../../utils/colorExtractor';
import {
  Upload,
  Loader2,
  Palette,
  Save,
  Image as ImageIcon,
  RefreshCw,
} from 'lucide-react';

const StoreSettings = () => {
  const { store, refreshStore } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [logoTimestamp, setLogoTimestamp] = useState(Date.now());
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: store?.name || '',
    primary_color: store?.primary_color || '#10B981',
    secondary_color: store?.secondary_color || '#34D399',
    accent_color: store?.accent_color || '#F59E0B',
    background_color: store?.background_color || '#000000',
    text_color: store?.text_color || '#FFFFFF',
    phone: store?.phone || '',
    email: store?.email || '',
    address: store?.address || '',
    instagram_url: store?.instagram_url || '',
    facebook_url: store?.facebook_url || '',
    twitter_url: store?.twitter_url || '',
    youtube_url: store?.youtube_url || '',
  });

  // Sync form with store data when store changes
  useEffect(() => {
    if (store) {
      setForm({
        name: store.name || '',
        primary_color: store.primary_color || '#10B981',
        secondary_color: store.secondary_color || '#34D399',
        accent_color: store.accent_color || '#F59E0B',
        background_color: store.background_color || '#000000',
        text_color: store.text_color || '#FFFFFF',
        phone: store.phone || '',
        email: store.email || '',
        address: store.address || '',
        instagram_url: store.instagram_url || '',
        facebook_url: store.facebook_url || '',
        twitter_url: store.twitter_url || '',
        youtube_url: store.youtube_url || '',
      });
    }
  }, [store]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${store.id}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('store-logos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('store-logos')
        .getPublicUrl(fileName);

      // Update store with logo URL
      await supabase
        .from('stores')
        .update({ logo_url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', store.id);

      setMessage({ type: 'success', text: 'Logo uploaded successfully!' });
      
      // Update timestamp to bust browser cache
      setLogoTimestamp(Date.now());
      
      // Extract colors from the uploaded logo
      await extractColors(publicUrl);
      
      refreshStore();
    } catch (err) {
      console.error('Error uploading logo:', err);
      setMessage({ type: 'error', text: 'Error uploading logo' });
    } finally {
      setUploading(false);
    }
  };

  const extractColors = async (imageUrl) => {
    setExtracting(true);
    try {
      const colors = await extractColorsFromImage(imageUrl || store?.logo_url);
      setForm(prev => ({ ...prev, ...colors }));
      
      // Auto-save extracted colors to database
      const { error } = await supabase
        .from('stores')
        .update({
          primary_color: colors.primary_color,
          secondary_color: colors.secondary_color,
          accent_color: colors.accent_color,
          background_color: colors.background_color,
          text_color: colors.text_color,
          updated_at: new Date().toISOString(),
        })
        .eq('id', store.id);
      
      if (error) throw error;
      
      setMessage({ type: 'success', text: 'Colors extracted and saved!' });
      refreshStore();
    } catch (err) {
      console.error('Error extracting colors:', err);
      setMessage({ type: 'error', text: 'Error extracting colors. Please try again.' });
    } finally {
      setExtracting(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase
        .from('stores')
        .update({
          name: form.name,
          primary_color: form.primary_color,
          secondary_color: form.secondary_color,
          accent_color: form.accent_color,
          background_color: form.background_color,
          text_color: form.text_color,
          phone: form.phone,
          email: form.email,
          address: form.address,
          instagram_url: form.instagram_url,
          facebook_url: form.facebook_url,
          twitter_url: form.twitter_url,
          youtube_url: form.youtube_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', store.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      refreshStore();
    } catch (err) {
      console.error('Error saving settings:', err);
      setMessage({ type: 'error', text: `Error: ${err.message || 'Could not save settings'}` });
    } finally {
      setLoading(false);
    }
  };

  const colorFields = [
    { key: 'primary_color', label: 'Primary Color', description: 'Main brand color for buttons and accents' },
    { key: 'secondary_color', label: 'Secondary Color', description: 'Supporting color for gradients and highlights' },
    { key: 'accent_color', label: 'Accent Color', description: 'Used for badges, alerts, and special elements' },
    { key: 'background_color', label: 'Background Color', description: 'Main page background color' },
    { key: 'text_color', label: 'Text Color', description: 'Primary text color on backgrounds' },
  ];

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Store Settings</h1>
        <p className="text-gray-400 mt-1">
          Customize your store appearance and branding
        </p>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Logo Upload */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-emerald-400" />
          Store Logo
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Upload your logo to automatically extract color palette for your store theme
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Logo Preview */}
          <div className="w-32 h-32 rounded-2xl bg-gray-700/50 border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
            {store?.logo_url ? (
              <img
                src={`${store.logo_url}?t=${logoTimestamp}`}
                alt="Store logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <ImageIcon className="w-8 h-8 text-gray-500" />
            )}
          </div>

          {/* Upload Actions */}
          <div className="flex-1 space-y-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white rounded-xl transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              Upload Logo
            </button>

            {store?.logo_url && (
              <button
                onClick={() => extractColors()}
                disabled={extracting}
                className="ml-2 inline-flex items-center gap-2 px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-xl transition-colors disabled:opacity-50"
              >
                {extracting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Re-extract Colors
              </button>
            )}

            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, WebP, SVG (max 5MB)
            </p>
          </div>
        </div>
      </div>

      {/* Store Name */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4">Store Name</h2>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Color Palette */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-emerald-400" />
          Color Palette
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          These colors will be used throughout your store website
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {colorFields.map(({ key, label, description }) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                {label}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          ))}
        </div>

        {/* Color Preview */}
        <div className="mt-6 p-4 rounded-xl border border-gray-600" style={{ backgroundColor: form.background_color }}>
          <p className="text-sm mb-3" style={{ color: form.text_color }}>Preview</p>
          <div className="flex gap-2">
            <div
              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ background: `linear-gradient(to right, ${form.primary_color}, ${form.secondary_color})` }}
            >
              Primary Button
            </div>
            <div
              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: form.accent_color }}
            >
              Accent Badge
            </div>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1234567890"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contact@store.com"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="123 Store St, City, Country"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-4">Social Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Instagram URL</label>
            <input
              type="url"
              value={form.instagram_url}
              onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Facebook URL</label>
            <input
              type="url"
              value={form.facebook_url}
              onChange={(e) => setForm({ ...form, facebook_url: e.target.value })}
              placeholder="https://facebook.com/..."
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Twitter URL</label>
            <input
              type="url"
              value={form.twitter_url}
              onChange={(e) => setForm({ ...form, twitter_url: e.target.value })}
              placeholder="https://twitter.com/..."
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">YouTube URL</label>
            <input
              type="url"
              value={form.youtube_url}
              onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
              placeholder="https://youtube.com/..."
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default StoreSettings;
