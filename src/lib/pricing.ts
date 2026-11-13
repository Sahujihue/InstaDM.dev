import { PricingPlan } from '@/types';
import { INITIAL_PRICING_PLANS } from '@/lib/data';
import { getSupabaseClient } from '@/lib/supabase';

const PRICING_STORAGE_KEY = 'instadm_pricing_plans';
const DISCOUNT_STORAGE_KEY = 'instadm_pricing_discount';

export function getStoredPricingPlans(): PricingPlan[] {
  if (typeof window === 'undefined') return INITIAL_PRICING_PLANS;
  try {
    const stored = localStorage.getItem(PRICING_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading stored pricing plans:', err);
  }
  return INITIAL_PRICING_PLANS;
}

export function getStoredDiscountPercent(): number {
  if (typeof window === 'undefined') return 17;
  try {
    const stored = localStorage.getItem(DISCOUNT_STORAGE_KEY);
    if (stored) {
      const num = parseInt(stored, 10);
      if (!isNaN(num) && num >= 0 && num <= 100) return num;
    }
  } catch {}
  return 17;
}

export async function saveStoredPricingPlans(plans: PricingPlan[], discount = 17): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(plans));
      localStorage.setItem(DISCOUNT_STORAGE_KEY, discount.toString());
      window.dispatchEvent(new CustomEvent('instadm_pricing_updated', {
        detail: { plans, discount }
      }));
    } catch (err) {
      console.warn('Error writing pricing plans to localStorage:', err);
    }
  }

  // Background sync to Supabase
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('platform_settings').upsert({
        key: 'pricing_plans',
        value: {
          plans,
          discount,
          updatedAt: new Date().toISOString()
        }
      });
    }
  } catch (err) {
    console.warn('Error syncing pricing plans to Supabase:', err);
  }
}
