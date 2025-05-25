// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../service/supabase';

const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  admin: false,
  setAdmin: () => {},
  eventsReq: null,
  allUsers: null,
  refreshData: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [eventsReq, setEventsReq] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [profile, setProfile] = useState(null);

//   const fetchUserProfile = async (userId) => {
//   const { data, error } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', userId)
//     .single();
//   if (!error) setProfile(data);
// };


  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events_table')
      .select('*');

    if (!error) setEventsReq(data);
  };

  const fetchAllUsers = async () => {
    const { data, error } = await supabase
      .from('user_table')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setAllUsers(data);
  };

  const refreshData = () => {
    fetchEvents();
    if (admin) {
      // setAdmin(true);
     fetchAllUsers();
    }  
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        fetchAllUsers();
        refreshData();
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        refreshData();
      } else {
        setEventsReq(null);
        // setAllUsers(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // const isAdmin = profile?.role === 'admin' || profile?.is_admin === true;


  useEffect(() => {
    // if (user && admin) {
      fetchAllUsers();
    // }
  }, [admin]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      // admin: isAdmin,
      admin, 
      setAdmin,
      eventsReq,
      allUsers,
      refreshData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
