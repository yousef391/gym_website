import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const StoreContext = createContext({});

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use refs to prevent multiple fetches
  const fetchedRef = useRef(false);
  const storeIdRef = useRef(null);

  // Fetch store by ID (for refreshing)
  const fetchStoreById = useCallback(async (storeId) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('stores')
        .select('*')
        .eq('id', storeId)
        .single();

      if (fetchError) throw fetchError;
      
      setStore(data);
      return data;
    } catch (err) {
      console.error('Store fetch error:', err);
      return null;
    }
  }, []);

  // Get store slug from URL query param - only runs once
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    
    const params = new URLSearchParams(window.location.search);
    const storeSlug = params.get('store');
    
    if (storeSlug) {
      fetchStoreBySlug(storeSlug);
    } else {
      // No store selected - general platform view
      setLoading(false);
    }
  }, []);

  const fetchStoreBySlug = async (slug) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('stores')
        .select('*')
        .eq('slug', slug)
        .single();

      if (fetchError) throw fetchError;
      
      setStore(data);
      storeIdRef.current = data.id;
      await fetchStoreData(data.id);
    } catch (err) {
      console.error('Store fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchFirstStore = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('stores')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;
      
      if (data) {
        setStore(data);
        storeIdRef.current = data.id;
        await fetchStoreData(data.id);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error('Store fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchStoreData = async (storeId) => {
    if (!storeId) {
      setLoading(false);
      return;
    }
    
    try {
      // Fetch categories
      const { data: cats, error: catError } = await supabase
        .from('categories')
        .select('*')
        .eq('store_id', storeId)
        .order('name');

      if (catError) console.error('Category fetch error:', catError);
      setCategories(cats || []);

      // Fetch products
      const { data: prods, error: prodError } = await supabase
        .from('products')
        .select('*, categories(name, slug)')
        .eq('store_id', storeId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (prodError) console.error('Product fetch error:', prodError);
      setProducts(prods || []);
    } catch (err) {
      console.error('Error fetching store data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply dynamic CSS variables based on store colors and update metadata
  useEffect(() => {
    if (store) {
      console.log('Applying theme colors:', store.primary_color, store.secondary_color, store.accent_color);
      const root = document.documentElement;
      root.style.setProperty('--primary-color', store.primary_color || '#10B981');
      root.style.setProperty('--secondary-color', store.secondary_color || '#34D399');
      root.style.setProperty('--accent-color', store.accent_color || '#F59E0B');
      root.style.setProperty('--background-color', store.background_color || '#000000');
      root.style.setProperty('--text-color', store.text_color || '#FFFFFF');

      // Update Page Title
      if (store.name) {
        document.title = `${store.name} - Official Store`;
      }

      // Update Favicon
      if (store.logo_url) {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        // Add timestamp to prevent caching if key changed, or just use url
        link.href = store.logo_url;
      }
    }
  }, [store]);

  // Refresh store and all data
  const refreshStore = useCallback(async () => {
    if (storeIdRef.current) {
      await fetchStoreById(storeIdRef.current);
      await fetchStoreData(storeIdRef.current);
    }
  }, [fetchStoreById]);

  const value = {
    store,
    products,
    categories,
    loading,
    error,
    refreshStore,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
