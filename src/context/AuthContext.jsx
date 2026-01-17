import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const initializedRef = useRef(false);

  const fetchStore = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching store:', error);
      }
      setStore(data || null);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchStore(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchStore(session.user.id);
      } else {
        setStore(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchStore]);

  const signUp = async (email, password, storeName, storeSlug) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Create store for the new user
    if (data.user) {
      const { error: storeError } = await supabase
        .from('stores')
        .insert({
          user_id: data.user.id,
          name: storeName,
          slug: storeSlug,
        });

      if (storeError) throw storeError;
      await fetchStore(data.user.id);
    }

    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setStore(null);
  };

  const value = {
    user,
    store,
    loading,
    signUp,
    signIn,
    signOut,
    refreshStore: () => user && fetchStore(user.id),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
