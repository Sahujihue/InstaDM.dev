'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextType {
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  isYearly: boolean;
  setIsYearly: (y: boolean) => void;
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<'INR' | 'USD'>('USD');
  const [isYearly, setIsYearly] = useState<boolean>(false);

  useEffect(() => {
    // Auto-detect country based on timezone and language
    try {
      const savedCurrency = localStorage.getItem('instadm_currency') as 'INR' | 'USD' | null;
      if (savedCurrency === 'INR' || savedCurrency === 'USD') {
        setCurrencyState(savedCurrency);
        return;
      }

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const languages = navigator.languages || [navigator.language];
      const isIndia = timeZone === 'Asia/Kolkata' || 
                      timeZone === 'Asia/Calcutta' || 
                      languages.some(l => l.includes('IN') || l.includes('hi'));

      if (isIndia) {
        setCurrencyState('INR');
      } else {
        setCurrencyState('USD');
      }
    } catch {
      setCurrencyState('USD');
    }
  }, []);

  const setCurrency = (c: 'INR' | 'USD') => {
    setCurrencyState(c);
    try {
      localStorage.setItem('instadm_currency', c);
    } catch {
      // ignore
    }
  };

  const formatPrice = (amount: number) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    // USD
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: amount % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        isYearly,
        setIsYearly,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
