import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaHeart, FaShieldAlt, FaLeaf, FaMountain, FaBookOpen } from 'react-icons/fa';
import { PageHeader, Button, FormInput, FormSelect, SectionTitle } from '../components/common';
import { donationsAPI } from '../services/api';

const purposes = [
  { value: 'general', label: 'General Fund', icon: '🌸', desc: 'Support all our activities and programs' },
  { value: 'temple-restoration', label: 'Temple Restoration', icon: '🕌', desc: 'Help preserve ancient Himalayan temples' },
  { value: 'retreat-scholarship', label: 'Retreat Scholarship', icon: '🏔️', desc: 'Enable underprivileged seekers to attend retreats' },
  { value: 'programs', label: 'Free Programs', icon: '📿', desc: 'Fund free meditation & yoga programs' },
  { value: 'himalayan-mission', label: 'Himalayan Mission', icon: '🌿', desc: 'Environmental and community work in the Himalayas' },
];

const amounts = [500, 1000, 2500, 5000, 10000, 25000];

export default function DonatePage() {
  const [form, setForm] = useState({
    donorName: '', email: '', phone: '', amount: 1000, purpose: 'general',
    message: '', isAnonymous: false, panNumber: ''
  });
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = e => setForm(prev => ({
    ...prev,
    [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
  }));

  const selectedAmount = customAmount ? parseInt(customAmount) : form.amount;

  const handleDonate = async () => {
    if (!form.donorName || !form.email || !selectedAmount) {
      toast.error('Please fill name, email and amount');
      return;
    }
    setLoading(true);
    try {
      // Create order
      const orderRes = await donationsAPI.createOrder({ amount: selectedAmount });
      const { order, key } = orderRes.data;

      // Use Razorpay if available in window (script loaded)
      if (window.Razorpay) {
        const options = {
          key,
          amount: order.amount,
          currency: order.currency || 'INR',
          name: 'Anubhuthi Foundation',
          description: `Donation for ${form.purpose}`,
          order_id: order.id,
          handler: async (response) => {
            await donationsAPI.verify({
              ...form,
              amount: selectedAmount,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id
            });
            setSuccess({ amount: selectedAmount, name: form.donorName });
            toast.success('Thank you for your generous donation!');
          },
          prefill: { name: form.donorName, email: form.email, contact: form.phone },
          theme: { color: '#e8821a' }
        };
        new window.Razorpay(options).open();
      } else {
        // Fallback for demo
        await donationsAPI.verify({ ...form, amount: selectedAmount, paymentId: `pay_demo_${Date.now()}`, orderId: order.id });
        setSuccess({ amount: selectedAmount, name: form.donorName });
        toast.success('Donation recorded! (Demo mode — Razorpay not loaded)');
      }
    } catch (err) {
      toast.error('Donation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-parchment pt-28 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-warm-lg p-12 text-center"
        >
          <div className="text-8xl mb-6">🙏</div>
          <h2 className="font-serif text-3xl font-bold text-earth-800 mb-3">Namaste, {success.name}!</h2>
          <p className="text-earth-600 mb-4">Your donation of <strong>₹{success.amount.toLocaleString()}</strong> has been received.</p>
          <p className="text-earth-400 text-sm mb-8">Your generosity ripples outward in countless ways. May it return to you a thousandfold.</p>
          <div className="p-4 bg-saffron-50 rounded-xl text-saffron-700 text-sm font-medium mb-6">
            A tax receipt will be sent to your email.
          </div>
          <button onClick={() => setSuccess(null)} className="text-saffron-600 underline text-sm">
            Make Another Donation
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Donate & Support — Anubhuthi Foundation</title>
        <meta name="description" content="Support Anubhuthi Foundation's mission of spiritual awakening, temple restoration, and community service." />
      </Helmet>
      {/* Load Razorpay */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <PageHeader title="Donate & Support" subtitle="Give with Grace" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Donate' }]} />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <SectionTitle subtitle="Your Generosity" title="Support Our Sacred Mission" description="Your donation enables us to continue our work of spreading ancient wisdom and serving communities." />

              <div className="space-y-4 mb-8">
                {purposes.map(p => (
                  <button key={p.value} onClick={() => setForm(prev => ({ ...prev, purpose: p.value }))}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      form.purpose === p.value ? 'border-saffron-400 bg-saffron-50' : 'border-earth-100 hover:border-saffron-200'
                    }`}
                  >
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                      <div className="font-semibold text-earth-800 text-sm">{p.label}</div>
                      <div className="text-earth-400 text-xs">{p.desc}</div>
                    </div>
                    {form.purpose === p.value && <div className="ml-auto text-saffron-500">✓</div>}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl text-green-700 text-sm">
                <FaShieldAlt />
                <span>All donations are eligible for 80G tax exemption. Secure payments via Razorpay.</span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-parchment rounded-3xl p-8 space-y-5">
              <h3 className="font-serif text-2xl font-bold text-earth-800">Your Offering</h3>

              {/* Amount selection */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-3">Select Amount (₹)</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {amounts.map(amt => (
                    <button key={amt} onClick={() => { setForm(prev => ({ ...prev, amount: amt })); setCustomAmount(''); }}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        form.amount === amt && !customAmount ? 'bg-saffron-500 text-white' : 'bg-white text-earth-700 hover:bg-saffron-50'
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input type="number" placeholder="Custom amount" value={customAmount}
                  onChange={e => { setCustomAmount(e.target.value); setForm(prev => ({ ...prev, amount: 0 })); }}
                  className="w-full px-4 py-3 bg-white border border-earth-200 rounded-xl text-earth-800 outline-none focus:border-saffron-400"
                />
              </div>

              <FormInput name="donorName" label="Full Name *" placeholder="Your full name" value={form.donorName} onChange={handleChange} />
              <FormInput name="email" type="email" label="Email Address *" placeholder="you@email.com" value={form.email} onChange={handleChange} />
              <FormInput name="phone" label="Phone Number" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
              <FormInput name="panNumber" label="PAN Number (for 80G receipt)" placeholder="ABCDE1234F" value={form.panNumber} onChange={handleChange} />

              <label className="flex items-center gap-2 text-sm text-earth-600">
                <input type="checkbox" name="isAnonymous" checked={form.isAnonymous} onChange={handleChange} className="rounded" />
                Make this donation anonymous
              </label>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-earth-700">Donation Amount:</span>
                  <span className="font-bold text-2xl text-saffron-600">₹{(selectedAmount || 0).toLocaleString()}</span>
                </div>
                <Button onClick={handleDonate} loading={loading} size="lg" className="w-full">
                  <FaHeart /> Donate Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
