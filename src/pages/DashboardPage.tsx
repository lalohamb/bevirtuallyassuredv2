import { useEffect, useState } from 'react';
import { Loader2, Package, User, Clock, CheckCircle2, Edit3, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase, type ClientProfile, type Order, type OrderItem } from '@/lib/supabase';
import { navigate } from '@/lib/router';
import { formatPrice, formatDate } from '@/lib/format';

type OrderWithItems = Order & { items?: OrderItem[] };

export function DashboardPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ business_name: '', contact_name: '', phone: '', preferred_tools: '' });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('login');
      return;
    }
    Promise.all([
      supabase.from('client_profiles').select('*').maybeSingle(),
      supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false }),
    ]).then(([profileRes, ordersRes]) => {
      if (profileRes.data) {
        setProfile(profileRes.data);
        setEditForm({
          business_name: profileRes.data.business_name ?? '',
          contact_name: profileRes.data.contact_name ?? '',
          phone: profileRes.data.phone ?? '',
          preferred_tools: profileRes.data.preferred_tools ?? '',
        });
      }
      if (ordersRes.data) setOrders(ordersRes.data as OrderWithItems[]);
      setLoading(false);
    });
  }, [user, authLoading]);

  const handleSaveEdit = async () => {
    if (!profile) return;
    await supabase.from('client_profiles').update({
      business_name: editForm.business_name.trim(),
      contact_name: editForm.contact_name.trim(),
      phone: editForm.phone.trim(),
      preferred_tools: editForm.preferred_tools.trim(),
      updated_at: new Date().toISOString(),
    }).eq('id', profile.id);
    setProfile({ ...profile, ...editForm });
    setEditing(false);
  };

  if (loading || authLoading) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-almond-900">
              Welcome, {profile?.contact_name?.split(' ')[0] || user.email}
            </h1>
            <p className="text-almond-500 mt-1">Manage your plan, profile, and orders.</p>
          </div>
          <button onClick={signOut} className="btn-outline text-sm self-start">
            Sign Out
          </button>
        </div>

        {/* Onboarding nudge */}
        {profile && !profile.onboarding_completed && (
          <div className="card p-5 mb-8 bg-gradient-to-r from-pink-50 to-tan-100 border-pink-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-serif text-base text-almond-900">Complete your onboarding</h3>
                <p className="text-sm text-almond-500">Tell us about your business to get matched with an assistant.</p>
              </div>
            </div>
            <button onClick={() => navigate('onboarding')} className="btn-primary text-sm whitespace-nowrap">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="font-serif text-lg text-almond-900">My Profile</h3>
              </div>
              {!editing && (
                <button onClick={() => setEditing(true)} className="p-2 rounded-full hover:bg-pink-50 text-almond-400 hover:text-pink-600 transition">
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="label">Business name</label>
                  <input className="input" value={editForm.business_name} onChange={(e) => setEditForm({ ...editForm, business_name: e.target.value })} />
                </div>
                <div>
                  <label className="label">Contact name</label>
                  <input className="input" value={editForm.contact_name} onChange={(e) => setEditForm({ ...editForm, contact_name: e.target.value })} />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input className="input" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                </div>
                <div>
                  <label className="label">Preferred tools</label>
                  <input className="input" value={editForm.preferred_tools} onChange={(e) => setEditForm({ ...editForm, preferred_tools: e.target.value })} />
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={handleSaveEdit} className="btn-primary text-sm flex-1">Save</button>
                  <button onClick={() => setEditing(false)} className="btn-ghost text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <dl className="space-y-3 text-sm">
                <Row label="Business" value={profile?.business_name || '—'} />
                <Row label="Contact" value={profile?.contact_name || '—'} />
                <Row label="Email" value={user.email ?? '—'} />
                <Row label="Phone" value={profile?.phone || '—'} />
                <Row label="Type" value={profile?.business_type || '—'} />
                <Row label="Hours/mo" value={profile?.monthly_hours ? `${profile.monthly_hours} hrs` : '—'} />
                <Row label="Tools" value={profile?.preferred_tools || '—'} />
              </dl>
            )}
          </div>

          {/* Plan + orders */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current plan */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-almond-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-almond-700" />
                </div>
                <h3 className="font-serif text-lg text-almond-900">Your Plan</h3>
              </div>
              {orders.length > 0 ? (
                <div>
                  {orders[0].items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-almond-50 last:border-0">
                      <div>
                        <div className="text-sm font-medium text-almond-900">{item.name}</div>
                        <div className="text-xs text-almond-400">Qty {item.quantity}</div>
                      </div>
                      <span className="text-sm text-almond-700">{formatPrice(item.price_cents * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-4 text-success-600 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Active · Next renewal in 30 days
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-almond-500 text-sm mb-4">You don't have an active plan yet.</p>
                  <button onClick={() => navigate('packages')} className="btn-primary text-sm">
                    Browse Packages <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Order history */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-tan-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-tan-700" />
                </div>
                <h3 className="font-serif text-lg text-almond-900">Order History</h3>
              </div>
              {orders.length === 0 ? (
                <p className="text-almond-400 text-sm py-4">No orders yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between py-2 border-b border-almond-50 last:border-0">
                      <div>
                        <div className="text-sm font-medium text-almond-900">{formatDate(o.created_at)}</div>
                        <div className="text-xs text-almond-400">{o.items?.length || 0} item(s)</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-almond-700">{formatPrice(o.total_cents)}</span>
                        <span className="badge bg-success-50 text-success-600 capitalize">{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-almond-400">{label}</dt>
      <dd className="text-almond-900 font-medium text-right">{value}</dd>
    </div>
  );
}
