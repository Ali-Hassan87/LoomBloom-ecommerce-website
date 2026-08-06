import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Star,
  Truck,
  ShieldCheck,
  ShoppingBag,
  Heart,
  Check,
  MapPin,
  CreditCard,
  Package,
  Minus,
  Plus,
  X,
} from 'lucide-react'
import Adminform from './Adminform'
import CustomerSignin from './CustomerSignin'
import CustomerSignup from './CustomerSignup'

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`

/* -------------------------------------------------------------------------- */
/*  Single Product Checkout                                                   */
/* -------------------------------------------------------------------------- */

function OrderCheckout({ product, selectedSize, selectedColor, quantity, onBack }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  })

  const productImage = product.image || img(product.img)
  const total = (product.price || 0) * (quantity || 1)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const canProceed = form.firstName && form.lastName && form.email && form.address && form.city

  return (
    <div className="min-h-screen bg-[#FAFAF7] bg-linear-to-b from-[#eaefdc] to-[#f3f2e9] py-8 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#6B7460] hover:text-[#343B2F] transition"
        >
          <ArrowLeft size={16} />
          Back to shopping
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-wider uppercase ${step >= 1 ? 'text-[#343B2F]' : 'text-[#6B7460]'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-[#343B2F] text-white' : 'bg-[#C5CEB8]/30 text-[#6B7460]'}`}>1</div>
            Details
          </div>
          <div className="w-12 h-px bg-[#C5CEB8]" />
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-wider uppercase ${step >= 2 ? 'text-[#343B2F]' : 'text-[#6B7460]'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-[#343B2F] text-white' : 'bg-[#C5CEB8]/30 text-[#6B7460]'}`}>2</div>
            Confirm
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT: Product Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] overflow-hidden">
              <div className="relative h-64 sm:h-72">
                <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 text-[0.65rem] tracking-[0.15em] uppercase rounded-sm font-semibold bg-[#343B2F] text-white">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <p className="text-[0.65rem] tracking-[0.15em] uppercase text-[#6B7460] mb-1">{product.category}</p>
                <h3 className="text-xl font-bold text-[#343B2F] leading-snug">{product.name}</h3>

                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < Math.floor(product.rating || 0) ? "text-gold fill-gold" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="text-[0.7rem] text-[#6B7460]">{product.rating}</span>
                </div>

                <p className="text-sm text-[#6B7460] mt-3 leading-relaxed line-clamp-3">{product.description || product.desc}</p>

                <div className="mt-4 pt-4 border-t border-[#E8EBE3] space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Size</span>
                    <span className="font-medium text-[#343B2F]">{selectedSize || 'M'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Color</span>
                    <span className="flex items-center gap-1.5 font-medium text-[#343B2F]">
                      <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: selectedColor || (product.colors?.[0] || '#C5CEB8') }} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Quantity</span>
                    <span className="font-medium text-[#343B2F]">{quantity || 1}</span>
                  </div>
                  {product.material && (
                    <div className="flex justify-between">
                      <span className="text-[#6B7460]">Material</span>
                      <span className="font-medium text-[#343B2F]">{product.material}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-[#E8EBE3]">
                    <span className="text-[#343B2F]">Total</span>
                    <span className="text-[#343B2F]">${total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#6B7460]">
                <Truck size={16} className="text-[#8A9873]" />
                Carbon-offset delivery, compostable packaging
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7460]">
                <ShieldCheck size={16} className="text-[#8A9873]" />
                One-year repair guarantee
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7460]">
                <Package size={16} className="text-[#8A9873]" />
                Ships within 3-5 business days
              </div>
            </div>
          </div>

          {/* RIGHT: Checkout Form */}
          <div className="lg:col-span-3">
            {step === 1 ? (
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C5CEB8] via-[#A8B89A] to-[#C5CEB8]" />

                <div className="text-center mb-8">
                  <span className="inline-block p-3 bg-[#C5CEB8]/20 rounded-full mb-3">
                    <ShoppingBag size={20} className="text-[#343B2F]" />
                  </span>
                  <h2 className="text-2xl font-bold text-[#343B2F]">Complete Your Order</h2>
                  <p className="text-sm text-[#6B7460] mt-1">Enter your details and we&apos;ll prepare your piece.</p>
                </div>

                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (canProceed) setStep(2); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">First Name *</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} required
                        className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="Ali" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Last Name *</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} required
                        className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="Khan" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="ali@example.com" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                        className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="+92 300 1234567" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Shipping Address *</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B8A4]" />
                      <input name="address" value={form.address} onChange={handleChange} required
                        className="mt-1.5 w-full pl-10 pr-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="House #, Street, Area" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">City *</label>
                    <input name="city" value={form.city} onChange={handleChange} required
                      className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                      placeholder="Lahore" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Order Notes (Optional)</label>
                    <textarea name="notes" rows={3} value={form.notes} onChange={handleChange}
                      className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4] resize-none"
                      placeholder="Any special instructions..." />
                  </div>

                  <button
                    type="submit"
                    disabled={!canProceed}
                    className={`w-full py-4 rounded-lg text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2
                      ${canProceed
                        ? 'bg-[#343B2F] text-white hover:bg-[#4A5340] shadow-lg shadow-[#343B2F]/20'
                        : 'bg-[#E8EBE3] text-[#B0B8A4] cursor-not-allowed'
                      }`}
                  >
                    <CreditCard size={16} />
                    Review Order · ${total}
                  </button>

                  {!canProceed && (
                    <p className="text-center text-[0.7rem] text-[#B0B8A4]">Fill in all required fields to continue</p>
                  )}
                </form>
              </div>
            ) : (
              /* Step 2: Confirm */
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] p-8 md:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C5CEB8] via-[#A8B89A] to-[#C5CEB8]" />

                <div className="w-16 h-16 bg-[#C5CEB8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-[#343B2F]" />
                </div>
                <h2 className="text-2xl font-bold text-[#343B2F] mb-2">Review Your Order</h2>
                <p className="text-sm text-[#6B7460] mb-8">Please confirm your details before placing the order.</p>

                <div className="bg-[#FAFAF7] rounded-xl p-5 text-left space-y-3 text-sm mb-8">
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Name</span>
                    <span className="font-medium text-[#343B2F]">{form.firstName} {form.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Email</span>
                    <span className="font-medium text-[#343B2F]">{form.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Phone</span>
                    <span className="font-medium text-[#343B2F]">{form.phone || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Address</span>
                    <span className="font-medium text-[#343B2F] text-right max-w-50">{form.address}, {form.city}</span>
                  </div>
                  {form.notes && (
                    <div className="flex justify-between">
                      <span className="text-[#6B7460]">Notes</span>
                      <span className="font-medium text-[#343B2F] text-right max-w-50">{form.notes}</span>
                    </div>
                  )}
                  <div className="border-t border-[#E8EBE3] pt-3 flex justify-between text-base font-bold">
                    <span className="text-[#343B2F]">Total</span>
                    <span className="text-[#343B2F]">${total}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 border border-[#C5CEB8] text-[#343B2F] text-xs tracking-[0.15em] uppercase font-semibold rounded-lg hover:bg-[#C5CEB8]/20 transition"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => alert('Order placed successfully!')}
                    className="flex-1 py-3.5 bg-[#343B2F] text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-lg hover:bg-[#4A5340] transition shadow-lg shadow-[#343B2F]/20"
                  >
                    Place Order · ${total}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Cart Checkout                                                             */
/* -------------------------------------------------------------------------- */

function CartCheckout({ cart, onBack }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  })

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0)
  const saved = cart.reduce((sum, item) => sum + ((item.original || item.price) - (item.price || 0)) * (item.qty || 1), 0)
  const itemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const canProceed = form.firstName && form.lastName && form.email && form.address && form.city

  return (
    <div className="min-h-screen bg-[#FAFAF7] bg-linear-to-b from-[#eaefdc] to-[#f3f2e9] py-8 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#6B7460] hover:text-[#343B2F] transition"
        >
          <ArrowLeft size={16} />
          Back to shopping
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-wider uppercase ${step >= 1 ? 'text-[#343B2F]' : 'text-[#6B7460]'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-[#343B2F] text-white' : 'bg-[#C5CEB8]/30 text-[#6B7460]'}`}>1</div>
            Details
          </div>
          <div className="w-12 h-px bg-[#C5CEB8]" />
          <div className={`flex items-center gap-2 text-xs font-semibold tracking-wider uppercase ${step >= 2 ? 'text-[#343B2F]' : 'text-[#6B7460]'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-[#343B2F] text-white' : 'bg-[#C5CEB8]/30 text-[#6B7460]'}`}>2</div>
            Confirm
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] p-6">
              <h3 className="font-serif text-xl mb-1">Your Bag</h3>
              <p className="text-xs text-[#6B7460] mb-4">{cart.length} items · {itemCount} pieces</p>

              <div className="space-y-4 max-h-105 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.cartId || item.name} className="flex gap-3 pb-4 border-b border-[#E8EBE3] last:border-0 last:pb-0">
                    <img
                      src={item.image || img(item.img) || ''}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-sm bg-[#E8E6DC]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#343B2F] truncate">{item.name}</h4>
                      <p className="text-xs text-[#6B7460]">{item.category}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-[#6B7460]">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && (
                          <span className="flex items-center gap-1">
                            Color:
                            <span className="inline-block w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />
                          </span>
                        )}
                        <span>Qty: {item.qty || 1}</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-medium">${(item.price || 0) * (item.qty || 1)}</span>
                        {item.original && item.original !== item.price && (
                          <span className="text-xs text-[#8A8B7E] line-through">${item.original * (item.qty || 1)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#E8EBE3] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7460]">Subtotal</span>
                  <span className="font-medium">${total}</span>
                </div>
                {saved > 0 && (
                  <div className="flex justify-between text-sm text-[#B85C4A]">
                    <span>You saved</span>
                    <span>${saved}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold pt-2 border-t border-[#E8EBE3]">
                  <span className="text-[#343B2F]">Total</span>
                  <span className="text-[#343B2F]">${total}</span>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#6B7460]">
                <Truck size={16} className="text-[#8A9873]" />
                Carbon-offset delivery, compostable packaging
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7460]">
                <ShieldCheck size={16} className="text-[#8A9873]" />
                One-year repair guarantee
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7460]">
                <Package size={16} className="text-[#8A9873]" />
                Ships within 3-5 business days
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-3">
            {step === 1 ? (
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C5CEB8] via-[#A8B89A] to-[#C5CEB8]" />

                <div className="text-center mb-8">
                  <span className="inline-block p-3 bg-[#C5CEB8]/20 rounded-full mb-3">
                    <CreditCard size={20} className="text-[#343B2F]" />
                  </span>
                  <h2 className="text-2xl font-bold text-[#343B2F]">Checkout</h2>
                  <p className="text-sm text-[#6B7460] mt-1">Complete your order below.</p>
                </div>

                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (canProceed) setStep(2); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">First Name *</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} required
                        className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="Ali" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Last Name *</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} required
                        className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="Khan" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="ali@example.com" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                        className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="+92 300 1234567" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Shipping Address *</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B8A4]" />
                      <input name="address" value={form.address} onChange={handleChange} required
                        className="mt-1.5 w-full pl-10 pr-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                        placeholder="House #, Street, Area" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">City *</label>
                    <input name="city" value={form.city} onChange={handleChange} required
                      className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4]"
                      placeholder="Lahore" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4A5340]">Order Notes (Optional)</label>
                    <textarea name="notes" rows={3} value={form.notes} onChange={handleChange}
                      className="mt-1.5 w-full px-4 py-3 bg-[#FAFAF7] border border-[#E8EBE3] rounded-lg text-sm outline-none focus:border-[#A8B89A] focus:ring-1 focus:ring-[#A8B89A]/30 transition placeholder:text-[#B0B8A4] resize-none"
                      placeholder="Any special instructions..." />
                  </div>

                  <button
                    type="submit"
                    disabled={!canProceed}
                    className={`w-full py-4 rounded-lg text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2
                      ${canProceed
                        ? 'bg-[#343B2F] text-white hover:bg-[#4A5340] shadow-lg shadow-[#343B2F]/20'
                        : 'bg-[#E8EBE3] text-[#B0B8A4] cursor-not-allowed'
                      }`}
                  >
                    <CreditCard size={16} />
                    Review Order · ${total}
                  </button>

                  {!canProceed && (
                    <p className="text-center text-[0.7rem] text-[#B0B8A4]">Fill in all required fields to continue</p>
                  )}
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] p-8 md:p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C5CEB8] via-[#A8B89A] to-[#C5CEB8]" />

                <div className="w-16 h-16 bg-[#C5CEB8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-[#343B2F]" />
                </div>
                <h2 className="text-2xl font-bold text-[#343B2F] mb-2">Review Your Order</h2>
                <p className="text-sm text-[#6B7460] mb-8">Please confirm your details before placing the order.</p>

                <div className="bg-[#FAFAF7] rounded-xl p-5 text-left space-y-3 text-sm mb-8">
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Name</span>
                    <span className="font-medium text-[#343B2F]">{form.firstName} {form.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Email</span>
                    <span className="font-medium text-[#343B2F]">{form.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Phone</span>
                    <span className="font-medium text-[#343B2F]">{form.phone || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7460]">Address</span>
                    <span className="font-medium text-[#343B2F] text-right max-w-50">{form.address}, {form.city}</span>
                  </div>
                  {form.notes && (
                    <div className="flex justify-between">
                      <span className="text-[#6B7460]">Notes</span>
                      <span className="font-medium text-[#343B2F] text-right max-w-50">{form.notes}</span>
                    </div>
                  )}
                  <div className="border-t border-[#E8EBE3] pt-3 flex justify-between text-base font-bold">
                    <span className="text-[#343B2F]">Total ({itemCount} items)</span>
                    <span className="text-[#343B2F]">${total}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 border border-[#C5CEB8] text-[#343B2F] text-xs tracking-[0.15em] uppercase font-semibold rounded-lg hover:bg-[#C5CEB8]/20 transition"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => alert('Order placed successfully!')}
                    className="flex-1 py-3.5 bg-[#343B2F] text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-lg hover:bg-[#4A5340] transition shadow-lg shadow-[#343B2F]/20"
                  >
                    Place Order · ${total}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Auth Page (Original)                                                      */
/* -------------------------------------------------------------------------- */

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <div className="min-h-screen bg-[#FAFAF7] bg-linear-to-b from-[#eaefdc] to-[#f3f2e9] py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#343B2F] tracking-wide">
          Account Access
        </h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-px w-10 bg-[#343B2F]/30 origin-right animate-[lineLeft_1.5s_ease-out_forwards]" />
          <span className="text-[#343B2F] text-sm leading-none opacity-0 animate-[dotReveal_1s_ease-out_1s_forwards]">
            ⸙
          </span>
          <div className="h-px w-10 bg-[#343B2F]/30 origin-left animate-[lineRight_1.5s_ease-out_forwards]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-0">

          {/* LEFT: Admin Form */}
          <div className="w-full lg:w-5/12 flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C5CEB8] via-[#A8B89A] to-[#C5CEB8]" />
                <div className="text-center mb-8">
                  <span className="inline-block p-3 bg-[#C5CEB8]/20 rounded-full mb-3">
                    <svg className="w-6 h-6 text-[#343B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <h2 className="text-2xl font-bold text-[#343B2F]">Only For Admins</h2>
                  <p className="text-sm text-[#6B7460] mt-1">Restricted access portal</p>
                </div>
                <Adminform />
              </div>
            </div>
          </div>

          {/* CENTER: Divider */}
          <div className="hidden lg:flex w-px bg-linear-to-b from-transparent via-[#C5CEB8] to-transparent mx-8 relative items-center justify-center">
            <div className="absolute w-10 h-10 bg-[#FAFAF7] border-2 border-[#C5CEB8] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-[#6B7460]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <div className="lg:hidden flex items-center gap-4 w-full max-w-md mx-auto">
            <div className="flex-1 h-px bg-[#C5CEB8]/50" />
            <span className="text-[#6B7460] text-xs uppercase tracking-widest">Or</span>
            <div className="flex-1 h-px bg-[#C5CEB8]/50" />
          </div>

          {/* RIGHT: Customer Auth */}
          <div className="w-full lg:w-5/12 flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8EBE3] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C5CEB8] via-[#A8B89A] to-[#C5CEB8]" />
                <div className="text-center mb-8">
                  <span className="inline-block p-3 bg-[#C5CEB8]/20 rounded-full mb-3">
                    <svg className="w-6 h-6 text-[#343B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <h2 className="text-2xl font-bold text-[#343B2F]">
                    {isSignIn ? 'Customer Sign In' : 'Customer Sign Up'}
                  </h2>
                  <p className="text-sm text-[#6B7460] mt-1">
                    {isSignIn ? 'Welcome back to LoomBloom' : 'Join our community today'}
                  </p>
                </div>

                <div className="transition-all duration-500 ease-in-out">
                  {isSignIn ? <CustomerSignin /> : <CustomerSignup />}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-[#6B7460]">
                    {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                      onClick={() => setIsSignIn(!isSignIn)}
                      className="font-semibold text-[#343B2F] hover:text-[#6B7460] transition-colors duration-200 underline underline-offset-4 decoration-[#C5CEB8] hover:decoration-[#343B2F]"
                    >
                      {isSignIn ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main User Page — Router Entry Point                                       */
/* -------------------------------------------------------------------------- */

const User = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state

  // ===== CASE 1: Cart Checkout =====
  if (data && data.cart && Array.isArray(data.cart) && data.cart.length > 0) {
    return <CartCheckout cart={data.cart} onBack={() => navigate(-1)} />
  }

  // ===== CASE 2: Single Product Order =====
  if (data && (data.product || data.item)) {
    const product = data.product || data.item
    return (
      <OrderCheckout
        product={product}
        selectedSize={data.selectedSize || data.size}
        selectedColor={data.selectedColor || data.color}
        quantity={data.quantity || 1}
        onBack={() => navigate(-1)}
      />
    )
  }

  // ===== CASE 3: Normal Auth Page =====
  return <AuthPage />
}

export default User