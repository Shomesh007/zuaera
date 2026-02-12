import React, { useState } from 'react';
import { CartItem } from '../App';

export interface OrderDetails {
  id: string;
  timestamp: number;
  contact: {
    email: string;
    subscribeNews: boolean;
  };
  delivery: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pinCode: string;
    country?: string;
  };
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

interface CheckoutFormProps {
  items: CartItem[];
  onCheckoutComplete: (order: OrderDetails) => void;
  onBack: () => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ items, onCheckoutComplete, onBack }) => {
  const [step, setStep] = useState<'contact' | 'delivery' | 'review'>('contact');
  const [formData, setFormData] = useState({
    email: '',
    subscribeNews: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Tamil Nadu',
    pinCode: '',
    country: 'India'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep = (currentStep: string) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 'contact') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (currentStep === 'delivery') {
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      if (!formData.pinCode.trim()) {
        newErrors.pinCode = 'PIN code is required';
      } else if (!/^\d{6}$/.test(formData.pinCode)) {
        newErrors.pinCode = 'PIN code must be 6 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 'contact') {
        setStep('delivery');
      } else if (step === 'delivery') {
        setStep('review');
      }
    }
  };

  const handlePrev = () => {
    if (step === 'delivery') {
      setStep('contact');
    } else if (step === 'review') {
      setStep('delivery');
    }
  };

  const handleSubmit = () => {
    if (validateStep('delivery')) {
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const order: OrderDetails = {
        id: `ORD-${Date.now()}`,
        timestamp: Date.now(),
        contact: {
          email: formData.email,
          subscribeNews: formData.subscribeNews
        },
        delivery: {
          firstName: formData.firstName || 'Guest',
          lastName: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          country: formData.country
        },
        items: items,
        total: total,
        status: 'pending'
      };

      onCheckoutComplete(order);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#0a0905] to-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0a0905]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <h1 className="text-xl font-semibold text-white">Checkout</h1>
          <div className="w-10" />
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2">
          {['contact', 'delivery', 'review'].map((s, idx) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-all ${ step === s ? 'bg-primary' : step > s ? 'bg-primary/50' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Contact Step */}
        {step === 'contact' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Email or Mobile Number
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.email ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400/80 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.subscribeNews}
                    onChange={(e) => setFormData({ ...formData, subscribeNews: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                    Email me with news and offers
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Step */}
        {step === 'delivery' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white">Delivery Address</h2>
            <div className="space-y-4">
              {/* Country/Region */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Country/Region
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="India">India</option>
                </select>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Optional"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Required"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) setErrors({ ...errors, lastName: '' });
                    }}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.lastName ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-400/80 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Street address"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    if (errors.address) setErrors({ ...errors, address: '' });
                  }}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.address ? 'border-red-500/50' : 'border-white/10'
                  }`}
                />
                {errors.address && (
                  <p className="text-red-400/80 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              {/* Apartment */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Apartment, Suite, etc (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Apt, suite, building, etc."
                  value={formData.apartment}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value });
                    if (errors.city) setErrors({ ...errors, city: '' });
                  }}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.city ? 'border-red-500/50' : 'border-white/10'
                  }`}
                />
                {errors.city && (
                  <p className="text-red-400/80 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  State <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* PIN Code */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  PIN Code <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="6-digit PIN code"
                  maxLength={6}
                  value={formData.pinCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, pinCode: val });
                    if (errors.pinCode) setErrors({ ...errors, pinCode: '' });
                  }}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.pinCode ? 'border-red-500/50' : 'border-white/10'
                  }`}
                />
                {errors.pinCode && (
                  <p className="text-red-400/80 text-xs mt-1">{errors.pinCode}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white">Order Review</h2>

            {/* Contact Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white/60 uppercase mb-3">Contact</h3>
              <p className="text-white">{formData.email}</p>
              {formData.subscribeNews && (
                <p className="text-xs text-white/40 mt-1">✓ Subscribed to news & offers</p>
              )}
            </div>

            {/* Delivery Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white/60 uppercase mb-3">Delivery Address</h3>
              <div className="space-y-1 text-white/80">
                <p>{formData.firstName && formData.firstName + ' '}{formData.lastName}</p>
                <p>{formData.address}</p>
                {formData.apartment && <p>{formData.apartment}</p>}
                <p>{formData.city}, {formData.state} {formData.pinCode}</p>
                <p>{formData.country}</p>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white/60 uppercase mb-3">Order Items</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between text-white/80">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-lg">Total</span>
                <span className="text-2xl font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-4 py-6 flex gap-3">
        <button
          onClick={step === 'contact' ? onBack : handlePrev}
          className="flex-1 px-4 py-3 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all font-medium"
        >
          {step === 'contact' ? 'Back to Cart' : 'Back'}
        </button>
        <button
          onClick={step === 'review' ? handleSubmit : handleNext}
          className="flex-1 px-4 py-3 bg-primary text-black rounded-xl hover:bg-primary/90 transition-all font-bold"
        >
          {step === 'review' ? 'Complete Order' : 'Next'}
        </button>
      </div>
    </div>
  );
};
