import { useState, useEffect } from 'react';
import { ArrowRight, BarChart2, DollarSign } from 'lucide-react';
import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export function CalculatorPage() {
  const [started, setStarted] = useState(false);
  const [inputs, setInputs] = useState({
    avgCustomerValue: 5000,
    monthlyLeads: 20,
    conversionRate: 10,
    marketingSpend: 3000,
    targetConversionRate: 20,
  });

  const set = (key: string, value: number) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const current = {
    customers: Math.round((inputs.monthlyLeads * inputs.conversionRate) / 100),
    revenue: Math.round((inputs.monthlyLeads * inputs.conversionRate * inputs.avgCustomerValue) / 100),
    cac: inputs.conversionRate > 0
      ? Math.round(inputs.marketingSpend / ((inputs.monthlyLeads * inputs.conversionRate) / 100))
      : 0,
  };

  const improved = {
    customers: Math.round((inputs.monthlyLeads * inputs.targetConversionRate) / 100),
    revenue: Math.round((inputs.monthlyLeads * inputs.targetConversionRate * inputs.avgCustomerValue) / 100),
    cac: inputs.targetConversionRate > 0
      ? Math.round(inputs.marketingSpend / ((inputs.monthlyLeads * inputs.targetConversionRate) / 100))
      : 0,
  };

  const uplift = improved.revenue - current.revenue;
  const annualUplift = uplift * 12;

  useEffect(() => {
    if (started) {
      track(Events.CALCULATOR_STARTED, { source: 'calculator_page' });
    }
  }, [started]);

  const handleComplete = () => {
    track(Events.CALCULATOR_COMPLETED, {
      current_revenue: current.revenue,
      improved_revenue: improved.revenue,
      annual_uplift: annualUplift,
    });
    navigate('contact');
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-4xl">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
            <BarChart2 className="w-4 h-4" />
            Marketing ROI Calculator
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">
            What Would Better Marketing Be Worth?
          </h1>
          <p className="text-almond-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Enter your current numbers and see the revenue opportunity in your existing
            marketing. This calculator helps move the conversation from "marketing costs"
            to "business outcomes."
          </p>
          <p className="text-xs text-almond-400 mt-3">
            Results are estimates for illustrative purposes only. Actual results depend on many factors.
          </p>
        </div>

        {!started ? (
          <div className="text-center">
            <button
              onClick={() => setStarted(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              <DollarSign className="w-5 h-5" />
              Calculate My Revenue Opportunity
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-6">
              <h2 className="font-serif text-xl text-almond-900">Your Current Numbers</h2>

              {[
                { key: 'avgCustomerValue', label: 'Average Customer Value ($)', min: 100, max: 100000, step: 100, prefix: '$' },
                { key: 'monthlyLeads', label: 'Monthly Leads', min: 1, max: 1000, step: 1, prefix: '' },
                { key: 'conversionRate', label: 'Lead-to-Customer Conversion Rate (%)', min: 1, max: 100, step: 1, prefix: '' },
                { key: 'marketingSpend', label: 'Monthly Marketing Spend ($)', min: 100, max: 100000, step: 100, prefix: '$' },
              ].map(({ key, label, min, max, step, prefix }) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <label className="label mb-0">{label}</label>
                    <span className="text-sm font-semibold text-pink-600">
                      {prefix}{inputs[key as keyof typeof inputs].toLocaleString()}{key === 'conversionRate' ? '%' : ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={inputs[key as keyof typeof inputs]}
                    onChange={(e) => set(key, Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                  <div className="flex justify-between text-xs text-almond-400 mt-1">
                    <span>{prefix}{min.toLocaleString()}{key === 'conversionRate' ? '%' : ''}</span>
                    <span>{prefix}{max.toLocaleString()}{key === 'conversionRate' ? '%' : ''}</span>
                  </div>
                </div>
              ))}

              <div className="border-t border-almond-100 pt-6">
                <h3 className="font-serif text-lg text-almond-900 mb-4">Target Conversion Rate</h3>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="label mb-0">Improved Conversion Rate (%)</label>
                    <span className="text-sm font-semibold text-pink-600">{inputs.targetConversionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={inputs.conversionRate}
                    max={100}
                    step={1}
                    value={inputs.targetConversionRate}
                    onChange={(e) => set('targetConversionRate', Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <h2 className="font-serif text-xl text-almond-900">Your Revenue Opportunity</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="card p-5 bg-almond-50 border-almond-100">
                  <p className="text-xs text-almond-500 uppercase tracking-wide mb-1">Current Monthly</p>
                  <p className="font-serif text-2xl text-almond-900">{formatCurrency(current.revenue)}</p>
                  <p className="text-xs text-almond-400 mt-1">{current.customers} customers/mo</p>
                </div>
                <div className="card p-5 bg-pink-50 border-pink-100">
                  <p className="text-xs text-pink-500 uppercase tracking-wide mb-1">Improved Monthly</p>
                  <p className="font-serif text-2xl text-pink-600">{formatCurrency(improved.revenue)}</p>
                  <p className="text-xs text-almond-400 mt-1">{improved.customers} customers/mo</p>
                </div>
              </div>

              <div className="card p-6 bg-gradient-to-br from-almond-900 to-almond-800 border-0">
                <p className="text-tan-300 text-sm mb-1">Annual Revenue Opportunity</p>
                <p className="font-serif text-4xl text-white mb-2">{formatCurrency(annualUplift)}</p>
                <p className="text-tan-300 text-xs">
                  By improving your conversion rate from {inputs.conversionRate}% to {inputs.targetConversionRate}%
                  with the same lead volume and spend.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4 text-center">
                  <p className="text-xs text-almond-500 mb-1">Current CAC</p>
                  <p className="font-serif text-xl text-almond-900">{current.cac > 0 ? formatCurrency(current.cac) : '—'}</p>
                </div>
                <div className="card p-4 text-center">
                  <p className="text-xs text-almond-500 mb-1">Improved CAC</p>
                  <p className="font-serif text-xl text-pink-600">{improved.cac > 0 ? formatCurrency(improved.cac) : '—'}</p>
                </div>
              </div>

              <div className="card p-6 bg-pink-50 border-pink-100 text-center">
                <h3 className="font-serif text-lg text-almond-900 mb-2">
                  Let's Identify Your Highest-Value Growth Opportunity
                </h3>
                <p className="text-sm text-almond-600 mb-4">
                  Book a free strategy consultation and we'll show you exactly where the
                  biggest opportunities are in your specific business.
                </p>
                <button onClick={handleComplete} className="btn-primary w-full">
                  Book a Strategy Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
