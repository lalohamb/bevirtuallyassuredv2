import { useState, useEffect } from 'react';
import { ArrowRight, Clock, Loader2 } from 'lucide-react';
import { navigate } from '@/lib/router';
import { supabase, type BlogPost } from '@/lib/supabase';

const FALLBACK_POSTS: BlogPost[] = [
  {
    slug: 'why-marketing-strategy-before-tactics',
    category: 'Marketing Strategy',
    title: 'Why Strategy Has to Come Before Tactics (And Most Businesses Get This Backwards)',
    summary: "Most businesses start with tactics — ads, social media, SEO — and wonder why they're not getting results. The problem isn't the tactics. It's the order.",
    read_time: '5 min read',
    image_url: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
    body: `The most common mistake we see in marketing isn't a bad ad or a poorly optimized landing page. It's starting with tactics before establishing strategy.\n\nHere's what that looks like in practice: A business owner decides they need more leads. They hire someone to run Google Ads. The ads run, leads come in, but they're not the right leads — or the cost per lead is too high — or the leads don't convert. So they try Facebook Ads. Same result. Then they try SEO. Then email marketing.\n\nEach tactic is executed in isolation, without a coherent strategy connecting them. The result is fragmented marketing that produces inconsistent results and makes it impossible to know what's actually working.\n\nStrategy answers the questions that tactics can't:\n\n- Who exactly are we trying to reach, and what do they care about?\n- What makes us meaningfully different from the alternatives?\n- What is the most efficient path from awareness to purchase for our specific customer?\n- Which channels are most likely to reach our ideal customer at the right moment?\n\nOnce you have clear answers to these questions, tactics become much more effective — because they're coordinated around a shared objective rather than executed independently.\n\nThe businesses that grow consistently aren't the ones running the most tactics. They're the ones running the right tactics, in the right sequence, for the right audience.`,
    published: true,
    created_at: '2025-01-14T00:00:00Z',
  },
  {
    slug: 'what-is-a-qualified-lead',
    category: 'Lead Generation',
    title: 'What Is a Qualified Lead? (And Why Most Businesses Are Measuring the Wrong Thing)',
    summary: 'Lead volume is a vanity metric. What matters is lead quality — and most businesses have no system for measuring or improving it.',
    read_time: '6 min read',
    image_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    body: `When we ask business owners how their marketing is performing, the most common answer is some version of: "We're getting leads, but they're not converting."\n\nThis is almost always a lead quality problem, not a sales problem.\n\nA qualified lead is a prospect who:\n1. Has the problem your product or service solves\n2. Has the authority to make a purchasing decision\n3. Has the budget to invest in a solution\n4. Has a timeline that makes them an active buyer\n\nMost marketing systems are optimized to generate volume — as many leads as possible at the lowest cost per lead. But a low-cost, high-volume lead generation system that produces unqualified leads is worse than a higher-cost system that produces qualified ones, because it wastes your sales team's time and distorts your conversion metrics.\n\nThe fix starts with defining what a qualified lead looks like for your specific business, then building your marketing system around attracting those prospects specifically — even if it means generating fewer total leads.\n\nThis is counterintuitive for most business owners, but it's one of the highest-leverage changes you can make to your marketing.`,
    published: true,
    created_at: '2025-01-28T00:00:00Z',
  },
  {
    slug: 'conversion-rate-optimization-basics',
    category: 'Conversion Optimization',
    title: 'The Fastest Way to Grow Revenue Without Spending More on Marketing',
    summary: 'Improving your conversion rate by 2 percentage points can double your revenue without increasing your marketing budget. Here\'s where to start.',
    read_time: '7 min read',
    image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    body: `Most businesses focus their growth efforts on generating more traffic and more leads. But there's a faster, cheaper path to revenue growth that most businesses overlook: improving conversion.\n\nConsider this: if you're generating 100 leads per month and converting 10% into customers, you have 10 customers. If you improve your conversion rate to 20% — without changing anything else — you have 20 customers. You've doubled revenue without spending an additional dollar on marketing.\n\nConversion rate optimization (CRO) is the discipline of systematically improving the percentage of visitors or leads who take a desired action. It applies at every stage of your funnel:\n\n- Website visitors → leads (landing page optimization)\n- Leads → qualified leads (lead qualification and nurture)\n- Qualified leads → customers (sales process optimization)\n\nThe most common conversion problems we see:\n\n1. Unclear value proposition — visitors don't immediately understand what you do and why it matters to them\n2. Weak or absent calls to action — there's no clear next step\n3. No lead nurture — leads are captured but never followed up with systematically\n4. Misaligned messaging — the ad promises one thing, the landing page delivers another\n\nStart by identifying where in your funnel you're losing the most prospects, then focus your optimization efforts there first.`,
    published: true,
    created_at: '2025-02-05T00:00:00Z',
  },
];

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<BlogPost | null>(null);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        setPosts(error || !data || data.length === 0 ? FALLBACK_POSTS : data);
        setLoading(false);
      });
  }, []);

  if (active) {
    return (
      <div className="pt-28 pb-20">
        <div className="container-page max-w-3xl">
          <button onClick={() => setActive(null)} className="btn-ghost text-sm mb-8">
            ← Back to Blog
          </button>
          <span className="badge bg-pink-50 text-pink-600 mb-4">{active.category}</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-almond-900 mb-4">{active.title}</h1>
          <div className="flex items-center gap-4 text-sm text-almond-400 mb-8">
            {active.created_at && <span>{new Date(active.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
            {active.read_time && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{active.read_time}</span>}
          </div>
          {active.image_url && (
            <div className="rounded-2xl overflow-hidden mb-10">
              <img src={active.image_url} alt={active.title} className="w-full h-64 object-cover" />
            </div>
          )}
          <div className="space-y-4">
            {(active.body ?? '').split('\n\n').map((para, i) => (
              <p key={i} className="text-almond-600 leading-relaxed">{para}</p>
            ))}
          </div>
          <div className="mt-12 card p-8 text-center bg-gradient-to-br from-pink-50 to-tan-100 border-pink-100">
            <h3 className="font-serif text-xl text-almond-900 mb-2">Need help identifying your biggest marketing opportunity?</h3>
            <p className="text-almond-600 text-sm mb-5">Take our free marketing assessment and get a personalized growth score.</p>
            <button onClick={() => navigate('assessment')} className="btn-primary">
              Get Your Free Marketing Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">Marketing Insights</h1>
          <p className="text-almond-600 text-lg">
            Practical strategy, lead generation, and growth marketing insights for business owners and marketing leaders.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          </div>
        ) : (
          <>
            {/* Featured post */}
            <button
              onClick={() => setActive(posts[0])}
              className="card-hover w-full text-left overflow-hidden mb-10 grid lg:grid-cols-2 animate-fade-up"
            >
              <div className="h-64 lg:h-auto overflow-hidden">
                <img
                  src={posts[0].image_url ?? ''}
                  alt={posts[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  fetchPriority="high"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="badge bg-pink-50 text-pink-600 mb-3">{posts[0].category}</span>
                <h2 className="font-serif text-2xl text-almond-900 mb-3">{posts[0].title}</h2>
                <p className="text-almond-500 text-sm leading-relaxed mb-4">{posts[0].summary}</p>
                <div className="flex items-center gap-4 text-xs text-almond-400">
                  {posts[0].created_at && <span>{new Date(posts[0].created_at).toLocaleDateString()}</span>}
                  {posts[0].read_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{posts[0].read_time}</span>}
                </div>
              </div>
            </button>

            {/* Grid */}
            {posts.length > 1 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(1).map((post, i) => (
                  <button
                    key={post.slug}
                    onClick={() => setActive(post)}
                    className="card-hover overflow-hidden text-left animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {post.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="badge bg-pink-50 text-pink-600 mb-2">{post.category}</span>
                      <h3 className="font-serif text-lg text-almond-900 mb-2">{post.title}</h3>
                      <p className="text-sm text-almond-500 line-clamp-2 mb-3">{post.summary}</p>
                      <div className="flex items-center gap-3 text-xs text-almond-400">
                        {post.created_at && <span>{new Date(post.created_at).toLocaleDateString()}</span>}
                        {post.read_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read_time}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
