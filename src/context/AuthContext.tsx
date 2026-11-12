'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  loginAsDemoUser: () => void;
  loginAsDemoAdmin: () => void;
  signup: (name: string, email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUserPlan: (plan: User['plan'], cycle: User['billingCycle']) => void;
}

const DEFAULT_DEMO_USER: User = {
  id: 'usr_demo_101',
  name: 'Alex Rivera',
  email: 'alex@creatorstudio.co',
  role: 'user',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  plan: 'pro',
  billingCycle: 'monthly',
  currency: 'USD',
  createdAt: '2026-08-20',
  connectedAccountsCount: 2,
  monthlyDmsUsed: 14250,
  monthlyDmsLimit: 25000,
};

const DEFAULT_DEMO_ADMIN: User = {
  id: 'usr_admin_001',
  name: 'InstaDM SuperAdmin',
  email: 'admin@instadm.dev',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
  plan: 'agency',
  billingCycle: 'yearly',
  currency: 'USD',
  createdAt: '2026-01-01',
  connectedAccountsCount: 5,
  monthlyDmsUsed: 48920,
  monthlyDmsLimit: 100000,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('instadm_user');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to logged-in demo user for immediate seamless review
        setUser(DEFAULT_DEMO_USER);
        localStorage.setItem('instadm_user', JSON.stringify(DEFAULT_DEMO_USER));
      }
    } catch {
      setUser(DEFAULT_DEMO_USER);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUser = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('instadm_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('instadm_user');
    }
  };

  const login = async (email: string, _pass: string) => {
    if (email.toLowerCase().includes('admin')) {
      saveUser(DEFAULT_DEMO_ADMIN);
      return { success: true };
    }
    const loggedUser: User = {
      ...DEFAULT_DEMO_USER,
      email,
      name: email.split('@')[0],
    };
    saveUser(loggedUser);
    return { success: true };
  };

  const loginAsDemoUser = () => {
    saveUser(DEFAULT_DEMO_USER);
  };

  const loginAsDemoAdmin = () => {
    saveUser(DEFAULT_DEMO_ADMIN);
  };

  const signup = async (name: string, email: string, _pass: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      plan: 'starter',
      billingCycle: 'monthly',
      currency: 'USD',
      createdAt: new Date().toISOString().split('T')[0],
      connectedAccountsCount: 1,
      monthlyDmsUsed: 120,
      monthlyDmsLimit: 5000,
    };
    saveUser(newUser);
    return { success: true };
  };

  const logout = () => {
    saveUser(null);
  };

  const updateUserPlan = (plan: User['plan'], cycle: User['billingCycle']) => {
    if (!user) return;
    const updated = {
      ...user,
      plan,
      billingCycle: cycle,
      monthlyDmsLimit: plan === 'starter' ? 5000 : plan === 'pro' ? 25000 : 100000,
    };
    saveUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginAsDemoUser,
        loginAsDemoAdmin,
        signup,
        logout,
        updateUserPlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
