import { useState } from 'react';
import { Trash2, ShoppingBag, Loader2, CheckCircle2, ArrowRight, LogIn } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';
import { formatPrice } from '@/lib/format';

export function CheckoutPage() {
  const { items, removeItem, clear, totalCents } = useCart();
  const { user } = useAuth();
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      navigate('login');
      return;
    }
    if (items.length === 0) return;
    setPlacing(true);

    const { data: order, error } = await supabase
      .from('orders')
      .insert({ status: 'paid', total_cents: totalCents })
      .select()
      .single();

    if (error || !order) {
      setPlacing(false);
      return;
    }

    const orderItems = items.map((i) => ({
      order_id: order.id,
      package_slug: i.slug,
      name: i.name,
      price_cents: i.price_cents,
      quantity: i.quantity,
    }));

    await supabase.from('order_items').insert(orderItems);
    clear();
    setPlacing(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center">
        <div className="container-page max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle2 className="w-10 h-10 text-success-600" />
          </div>
          <h1 className="font-serif text-3xl text-almond-900 mb-3">Order confirmed!</h1>
          <p className="text-almond-500 mb-6">
            Thank you for your purchase. We will be in touch shortly to kick things off.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('dashboard')} className="btn-primary">Go to Dashboard</button>
            <button onClick={() => navigate('')} className="btn-outline">Back Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl text-almond-900 mb-2">Your Cart</h1>
        <p className="text-almond-500 mb-8">Review your selection and check out to get started.</p>

        {items.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-tan-100 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-almond-400" />
            </div>
            <h2 className="font-serif text-xl text-almond-900 mb-2">Your cart is empty</h2>
            <p className="text-almond-500 text-sm mb-6">Browse our packages to find the right plan for your business.</p>
            <button onClick={() => navigate('packages')} className="btn-primary">
              View Packages <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Items */}
            <div className="lg:col-span-3 space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="card p-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg text-almond-900">{item.name}</h3>
                    <p className="text-sm text-almond-500">
                      {formatPrice(item.price_cents)}
                      {item.billing_period ? ` / ${item.billing_period}` : ''}
                    </p>
                    <p className="text-xs text-almond-400 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-lg text-almond-900">
                      {formatPrice(item.price_cents * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.slug)}
                      className="p-2 rounded-full text-almond-400 hover:bg-error-50 hover:text-error-500 transition"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => navigate('packages')} className="btn-ghost text-sm">
                Add another package
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="card p-6 sticky top-28">
                <h3 className="font-serif text-lg text-almond-900 mb-4">Order Summary</h3>
                <div className="flex justify-between text-sm text-almond-600 mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalCents)}</span>
                </div>
                <div className="flex justify-between text-sm text-almond-600 mb-4">
                  <span>Onboarding</span>
                  <span className="text-success-600 font-medium">Included</span>
                </div>
                <div className="border-t border-almond-100 pt-4 flex justify-between items-baseline mb-6">
                  <span className="font-serif text-lg text-almond-900">Total</span>
                  <span className="font-serif text-2xl text-pink-600">{formatPrice(totalCents)}</span>
                </div>

                {!user && (
                  <div className="mb-4 p-3 rounded-xl bg-pink-50 border border-pink-100 text-pink-700 text-sm flex items-start gap-2">
                    <LogIn className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    You'll need to sign in or create an account to complete your purchase.
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={placing}
                  className="btn-primary w-full"
                >
                  {placing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : user ? (
                    'Complete Purchase'
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" /> Sign In to Checkout
                    </>
                  )}
                </button>
                <p className="text-xs text-almond-400 text-center mt-3">
                  Secure checkout. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
