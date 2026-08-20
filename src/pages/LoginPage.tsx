import { useState } from 'react';
import { Loader2, LogIn, UserPlus, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';
import { supabase } from '@/lib/supabase';

export function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError(null);
    setNotice(null);

    if (mode === 'login') {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        setError(error.includes('Invalid login') ? 'Incorrect email or password.' : error);
        setLoading(false);
      } else {
        // Check onboarding status
        const { data: profile } = await supabase
          .from('client_profiles')
          .select('onboarding_completed')
          .maybeSingle();
        navigate(profile?.onboarding_completed ? 'dashboard' : 'onboarding');
      }
    } else {
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email.trim(), password);
      if (error) {
        setError(error.includes('already') ? 'An account with this email already exists. Try logging in.' : error);
        setLoading(false);
      } else {
        setNotice('Account created! Check your email for a confirmation link, then sign in.');
        setMode('login');
        setLoading(false);
      }
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center">
      <div className="container-page max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-md">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-serif text-3xl text-almond-900 mb-2">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-almond-500 text-sm">
            {mode === 'login'
              ? 'Sign in to manage your plan and access your dashboard.'
              : 'Join Petal Assist to get matched with a dedicated assistant.'}
          </p>
        </div>

        <div className="card p-6 sm:p-8">
          {/* Toggle */}
          <div className="flex p-1 bg-tan-100 rounded-full mb-6">
            <button
              onClick={() => { setMode('login'); setError(null); setNotice(null); }}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                mode === 'login' ? 'bg-white text-pink-700 shadow-sm' : 'text-almond-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(null); setNotice(null); }}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                mode === 'signup' ? 'bg-white text-pink-700 shadow-sm' : 'text-almond-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          {notice && (
            <div className="mb-4 p-3 rounded-xl bg-success-50 border border-success-100 text-success-700 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {notice}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-error-50 border border-error-100 text-error-600 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="auth-email">Email</label>
              <input
                id="auth-email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : mode === 'login' ? (
                <>
                  <LogIn className="w-4 h-4" /> Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Create Account
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-almond-400 mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); setNotice(null); }}
            className="text-pink-600 font-medium hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
