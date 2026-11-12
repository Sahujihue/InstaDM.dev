'use client';

import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { PaymentGatewayId } from '@/types';
import {
  X,
  CheckCircle2,
  Lock,
  ShieldCheck,
  CreditCard,
  QrCode,
  Copy,
  ExternalLink,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: 'starter' | 'pro' | 'agency';
  planName: string;
  priceAmount: number;
  billingCycle: 'monthly' | 'yearly';
  onSuccess: (planId: 'starter' | 'pro' | 'agency') => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  planId,
  planName,
  priceAmount,
  billingCycle,
  onSuccess,
}: CheckoutModalProps) {
  const { currency, formatPrice } = useCurrency();
  const { user } = useAuth();

  // Gateway selection: default to Razorpay if INR, Stripe if USD
  const [selectedGateway, setSelectedGateway] = useState<PaymentGatewayId>(
    currency === 'INR' ? 'razorpay' : 'stripe'
  );

  // Form states
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('892');
  const [cryptoCoin, setCryptoCoin] = useState<'USDT' | 'USDC' | 'BTC' | 'ETH' | 'SOL'>('USDT');
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const cryptoWallet = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

  const gateways = [
    {
      id: 'razorpay' as const,
      name: 'Razorpay',
      tag: 'UPI & Cards (India)',
      badge: 'Recommended in India',
      color: 'from-blue-600 to-indigo-700',
      currencies: ['INR']
    },
    {
      id: 'stripe' as const,
      name: 'Stripe',
      tag: 'Credit / Debit Cards & Apple Pay',
      badge: 'Global Standard',
      color: 'from-purple-600 to-indigo-600',
      currencies: ['USD', 'INR']
    },
    {
      id: 'paypal' as const,
      name: 'PayPal',
      tag: 'PayPal Wallet & Pay in 4',
      badge: '400M+ Users',
      color: 'from-sky-600 to-blue-800',
      currencies: ['USD']
    },
    {
      id: 'cashfree' as const,
      name: 'Cashfree',
      tag: 'UPI Autopay & Netbanking',
      badge: 'Instant QR',
      color: 'from-emerald-600 to-teal-700',
      currencies: ['INR']
    },
    {
      id: 'payu' as const,
      name: 'PayU India',
      tag: 'Cards, UPI & Wallets',
      badge: 'Fast Checkout',
      color: 'from-green-600 to-emerald-800',
      currencies: ['INR']
    },
    {
      id: 'crypto' as const,
      name: 'Crypto & Web3',
      tag: 'USDT, USDC, BTC, ETH, SOL',
      badge: 'Zero Fees',
      color: 'from-amber-600 to-orange-600',
      currencies: ['USD', 'CRYPTO']
    }
  ];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setTimeout(() => {
        onSuccess(planId);
        onClose();
      }, 1800);
    }, 1200);
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(cryptoWallet);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-purple-200/80 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50/60 to-indigo-50/40 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Secure Checkout
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase">
                  {planName} Plan
                </span>
              </div>
              <p className="text-xs text-slate-500">
                14-Day Money-Back Guarantee • Instant Plan Activation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Order Summary Pill */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">{planName} Subscription</span>
              <span className="text-[11px] text-slate-500 capitalize">{billingCycle} Billing • Billed to {user?.email || 'you'}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900">{formatPrice(priceAmount)}</span>
              <span className="text-xs text-slate-400 block font-medium">/ month</span>
            </div>
          </div>

          {/* Payment Gateway Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Choose Payment Method
              </label>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-500" /> 256-Bit SSL Encrypted
              </span>
            </div>

            {/* Gateway Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {gateways.map((gw) => {
                const isSelected = selectedGateway === gw.id;
                return (
                  <button
                    key={gw.id}
                    type="button"
                    onClick={() => setSelectedGateway(gw.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-2 ring-purple-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{gw.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-purple-600" />}
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{gw.tag}</p>
                    </div>

                    <span className="text-[9px] font-bold text-purple-700 bg-purple-100/70 px-1.5 py-0.2 rounded mt-2 self-start">
                      {gw.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Gateway Form Inputs */}
          <form onSubmit={handlePay} className="space-y-4 pt-2">
            
            {/* Razorpay Form */}
            {selectedGateway === 'razorpay' && (
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-900">Razorpay India (UPI / Cards / Netbanking)</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">UPI Ready</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Enter Virtual Payment Address (UPI ID)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@okhdfcbank"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                    >
                      Verify UPI
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Supports Google Pay, PhonePe, Paytm, BHIM, and all UPI apps.</p>
                </div>
              </div>
            )}

            {/* Stripe Form */}
            {selectedGateway === 'stripe' && (
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-900">Stripe Card Payment</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Apple / Google Pay</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Expires</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">CVC / CVV</label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PayPal Form */}
            {selectedGateway === 'paypal' && (
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-900">PayPal Express Checkout</span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">International</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  You will be safely routed to PayPal to approve the recurring subscription with your PayPal Balance, Bank, or linked Credit Card.
                </p>
              </div>
            )}

            {/* Cashfree Form */}
            {selectedGateway === 'cashfree' && (
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-900">Cashfree Payments (UPI QR Autopay)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Dynamic QR</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-100">
                  <QrCode className="w-10 h-10 text-emerald-700 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Instant UPI Dynamic QR</p>
                    <p className="text-[11px] text-slate-500">Scan using any UPI app to authenticate the subscription mandate.</p>
                  </div>
                </div>
              </div>
            )}

            {/* PayU Form */}
            {selectedGateway === 'payu' && (
              <div className="p-4 rounded-2xl bg-green-50/60 border border-green-200/80 space-y-2 text-xs">
                <span className="font-bold text-green-950 block">PayU India Aggregator</span>
                <p className="text-slate-600">
                  Secured by PayU Enterprise Gateway. Includes Netbanking across 60+ Indian banks, Wallets, and RuPay cards.
                </p>
              </div>
            )}

            {/* Crypto & Web3 Form */}
            {selectedGateway === 'crypto' && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-950">Crypto &amp; Web3 Direct Deposit</span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">Zero Chargebacks</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(['USDT', 'USDC', 'BTC', 'ETH', 'SOL'] as const).map((coin) => (
                    <button
                      key={coin}
                      type="button"
                      onClick={() => setCryptoCoin(coin)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        cryptoCoin === coin
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'bg-white border border-amber-200 text-slate-700 hover:bg-amber-100'
                      }`}
                    >
                      {coin}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-600 block">
                    Send {cryptoCoin} to Deposit Address:
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={cryptoWallet}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-[11px] font-mono text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={handleCopyWallet}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedWallet ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">Automatic block confirmation detected in ~30 seconds.</p>
                </div>
              </div>
            )}

            {/* Submit / Pay Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing || paymentSuccess}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Secure Payment with {selectedGateway.toUpperCase()}...</span>
                  </>
                ) : paymentSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Payment Verified! Activating {planName}...</span>
                  </>
                ) : (
                  <>
                    <span>Pay {formatPrice(priceAmount)} via {selectedGateway.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              14-Day Money-Back Guarantee • Automated Invoices &amp; GST/VAT Receipts
            </p>
          </form>

        </div>

      </div>
    </div>
  );
}
