import { useState, useEffect } from 'react';
import { ArrowRight, Clock, Loader2 } from 'lucide-react';
import { navigate } from '@/lib/router';
import { supabase, type BlogPost } from '@/lib/supabase';

const FALLBACK_POSTS: BlogPost[] = [
  {
    slug: 'signs-you-need-a-va',
    category: 'Productivity',
    title: "7 Signs You Need a Virtual Assistant (And You're Ignoring Them)",
    summary: "If you're spending more than 2 hours a day on email, you're leaving money on the table. Here are the seven clearest signals it's time to delegate.",
    read_time: '5 min read',
    image_url: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    body: `Most entrepreneurs wait too long before hiring a VA. They tell themselves they can handle it, that no one else will do it right, or that they can't afford it yet. By the time they finally delegate, they've lost months of growth.\n\nHere are the seven signs you've already waited too long:\n\n1. Your inbox has more than 500 unread emails.\n2. You've missed a follow-up that cost you a client.\n3. You're doing data entry at 10pm.\n4. You haven't posted on social media in three weeks.\n5. Your invoices go out late — or not at all.\n6. You're the bottleneck on tasks that don't need your expertise.\n7. You feel busy all day but can't point to what you actually accomplished.\n\nIf three or more of these sound familiar, a VA isn't a luxury — it's a business necessity.`,
    published: true,
    created_at: '2025-01-14T00:00:00Z',
  },
  {
    slug: 'how-to-delegate-inbox',
    category: 'Delegation',
    title: 'How to Delegate Your Inbox Without Losing Control',
    summary: "Handing over email access feels terrifying. Here's the exact system we use to help clients delegate their inbox in under a week.",
    read_time: '7 min read',
    image_url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    body: `The number one objection we hear from new clients is: "I can't let someone else into my email." We get it. Your inbox is personal, sensitive, and chaotic.\n\nBut here's the truth: with the right system, delegating your inbox is one of the highest-leverage moves you can make.\n\nStep 1: Create a shared label system. Work with your VA to create labels like "Needs Reply", "Waiting On", "FYI Only", and "Urgent".\n\nStep 2: Write a voice guide. Spend 30 minutes writing down how you like to communicate — formal or casual, short or detailed, how you handle complaints.\n\nStep 3: Start with a 2-week shadow period. Your VA reads and drafts responses, but you approve before sending. After two weeks, most clients flip to full delegation.\n\nStep 4: Set a daily briefing. Each morning, your VA sends a 5-bullet summary of what came in overnight and what they handled.`,
    published: true,
    created_at: '2025-01-28T00:00:00Z',
  },
  {
    slug: 'va-vs-employee',
    category: 'Business',
    title: "Virtual Assistant vs. Full-Time Employee: What's Right for Your Business?",
    summary: "Hiring a full-time employee costs 1.25–1.4x their salary when you factor in benefits, taxes, and overhead. Here's when a VA makes more financial sense.",
    read_time: '6 min read',
    image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    body: `The decision between a VA and a full-time hire comes down to three factors: volume, specialisation, and budget.\n\nA VA makes sense when:\n- You need 10–30 hours of support per week (not 40+)\n- The tasks are varied but don't require deep institutional knowledge\n- You want flexibility to scale up or down month-to-month\n- You're not ready to manage an employee (payroll, HR, benefits)\n\nA full-time hire makes sense when:\n- The role requires someone embedded in your culture and systems\n- You need 40+ hours of dedicated, specialised work\n- The tasks require real-time collaboration throughout the day\n\nFor most small businesses and solopreneurs, a VA is the smarter first hire.`,
    published: true,
    created_at: '2025-02-05T00:00:00Z',
  },
  {
    slug: 'tools-for-delegation',
    category: 'Tools',
    title: 'The 8 Tools That Make Delegation Actually Work',
    summary: 'Delegation fails when communication breaks down. These eight tools create the structure your VA needs to work independently.',
    read_time: '4 min read',
    image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    body: `The right tools turn a good VA into a great one. Here are the eight we recommend to every new client:\n\n1. Loom — for recording quick video walkthroughs instead of writing long instructions.\n2. Notion — for your SOPs, brand guidelines, and shared knowledge base.\n3. Asana or Trello — for task tracking and project visibility.\n4. LastPass or 1Password — for securely sharing login credentials.\n5. Slack — for async communication that doesn't clog your inbox.\n6. Google Workspace — for shared docs, sheets, and calendar.\n7. Calendly — so your VA can book meetings on your behalf without back-and-forth.\n8. Loom + Notion combo — record a process once, your VA documents it, and it becomes an SOP forever.`,
    published: true,
    created_at: '2025-02-19T00:00:00Z',
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
            <h3 className="font-serif text-xl text-almond-900 mb-2">Ready to delegate?</h3>
            <p className="text-almond-600 text-sm mb-5">Book a free consultation and get matched with your assistant.</p>
            <button onClick={() => navigate('')} className="btn-primary">
              Get a Free Consultation <ArrowRight className="w-4 h-4" />
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
          <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">Blog & Resources</h1>
          <p className="text-almond-600 text-lg">
            Practical guides on delegation, productivity, and growing your business with less stress.
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
