'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyPolicy = 'AUTO_GEO' | 'FORCE_USD' | 'FORCE_INR';

interface CurrencyContextType {
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  isYearly: boolean;
  setIsYearly: (y: boolean) => void;
  formatPrice: (amount: number) => string;
  isIndiaUser: boolean;
  currencyPolicy: CurrencyPolicy;
  setCurrencyPolicy: (p: CurrencyPolicy) => void;
  allowManualSwitcher: boolean;
  setAllowManualSwitcher: (allow: boolean) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<'INR' | 'USD'>('USD');
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [isIndiaUser, setIsIndiaUser] = useState<boolean>(false);
  const [currencyPolicy, setCurrencyPolicyState] = useState<CurrencyPolicy>('AUTO_GEO');
  const [allowManualSwitcher, setAllowManualSwitcherState] = useState<boolean>(false);

  useEffect(() => {
    try {
      // 1. Detect if user is from India based on Timezone / Browser Locale
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const languages = navigator.languages || [navigator.language || ''];
      const detectedIndia =
        timeZone === 'Asia/Kolkata' ||
        timeZone === 'Asia/Calcutta' ||
        languages.some((l) => l.includes('IN') || l.includes('hi') || l.toLowerCase() === 'en-in');

      setIsIndiaUser(detectedIndia);

      // 2. Load Admin Currency Policy from Storage (or default AUTO_GEO)
      const savedPolicy = localStorage.getItem('instadm_currency_policy') as CurrencyPolicy | null;
      const policy: CurrencyPolicy = savedPolicy || 'AUTO_GEO';
      setCurrencyPolicyState(policy);

      // 3. Load Allow Manual Switcher toggle (default false so foreign users don't see INR, Indian users don't see USD)
      const savedSwitcher = localStorage.getItem('instadm_allow_switcher');
      const allowSwitcher = savedSwitcher === 'true';
      setAllowManualSwitcherState(allowSwitcher);

      // 4. Calculate effective currency
      if (policy === 'FORCE_USD') {
        // Admin forced USD everywhere (even for India)
        setCurrencyState('USD');
      } else if (policy === 'FORCE_INR') {
        // Admin forced INR everywhere
        setCurrencyState('INR');
      } else {
        // AUTO_GEO (Default): India sees INR strictly, outside India sees USD strictly
        if (detectedIndia) {
          setCurrencyState('INR');
        } else {
          setCurrencyState('USD');
        }
      }
    } catch {
      setCurrencyState('USD');
    }
  }, []);

  const setCurrencyPolicy = (policy: CurrencyPolicy) => {
    setCurrencyPolicyState(policy);
    try {
      localStorage.setItem('instadm_currency_policy', policy);
      // Re-apply immediately
      if (policy === 'FORCE_USD') {
        setCurrencyState('USD');
      } else if (policy === 'FORCE_INR') {
        setCurrencyState('INR');
      } else {
        setCurrencyState(isIndiaUser ? 'INR' : 'USD');
      }
    } catch {
      // ignore
    }
  };

  const setAllowManualSwitcher = (allow: boolean) => {
    setAllowManualSwitcherState(allow);
    try {
      localStorage.setItem('instadm_allow_switcher', allow ? 'true' : 'false');
    } catch {
      // ignore
    }
  };

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
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: amount % 1 !== 0 ? 2 : 0,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        isYearly,
        setIsYearly,
        formatPrice,
        isIndiaUser,
        currencyPolicy,
        setCurrencyPolicy,
        allowManualSwitcher,
        setAllowManualSwitcher,
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
