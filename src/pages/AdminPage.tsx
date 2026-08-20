import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { navigate } from '@/lib/router';
import { isAdmin, supabase, type BlogPost, type Lead } from '@/lib/supabase';
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, X, Save, LayoutDashboard, FileText, Users, Inbox } from 'lucide-react';

type Tab = 'posts' | 'leads';

export function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>('posts');

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isAdmin(user)) navigate('');
  }, [user, authLoading]);

  if (authLoading) return <Spinner />;
  if (!user || !isAdmin(user)) return null;

  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h1 className="font-serif text-3xl text-almond-900">Admin Dashboard</h1>
            <p className="text-almond-400 text-sm">Manage your site content</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-almond-100">
          {([
            { key: 'posts', label: 'Blog Posts', icon: FileText },
            { key: 'leads', label: 'Leads', icon: Inbox },
          ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === key
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-almond-500 hover:text-almond-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === 'posts' && <BlogPostsTab />}
        {tab === 'leads' && <LeadsTab />}
      </div>
    </div>
  );
}

/* ─── Blog Posts Tab ─────────────────────────────────────────── */

function BlogPostsTab() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setIsNew(true);
    setEditing({
      slug: '',
      title: '',
      category: 'General',
      summary: '',
      body: '',
      image_url: '',
      read_time: '',
      published: false,
    });
  };

  const togglePublish = async (post: BlogPost) => {
    await supabase.from('blog_posts').update({ published: !post.published }).eq('id', post.id);
    setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, published: !p.published } : p));
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  if (editing) {
    return (
      <PostEditor
        post={editing}
        isNew={isNew}
        onSave={async (saved) => {
          await load();
          setEditing(null);
          setIsNew(false);
        }}
        onCancel={() => { setEditing(null); setIsNew(false); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-almond-500 text-sm">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
        <button onClick={openNew} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {loading ? <Spinner /> : posts.length === 0 ? (
        <div className="card p-12 text-center">
          <FileText className="w-10 h-10 text-almond-200 mx-auto mb-3" />
          <p className="text-almond-400 mb-4">No blog posts yet.</p>
          <button onClick={openNew} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Create your first post</button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="card p-4 flex items-center gap-4">
              {post.image_url && (
                <img src={post.image_url} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 hidden sm:block" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge bg-pink-50 text-pink-600 text-xs">{post.category}</span>
                  <span className={`badge text-xs ${post.published ? 'bg-success-50 text-success-600' : 'bg-tan-100 text-almond-500'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="font-serif text-almond-900 truncate">{post.title}</h3>
                <p className="text-xs text-almond-400 mt-0.5">{post.read_time} · {post.created_at ? new Date(post.created_at).toLocaleDateString() : '—'}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => togglePublish(post)}
                  className="p-2 rounded-lg hover:bg-tan-100 text-almond-400 hover:text-almond-700 transition"
                  title={post.published ? 'Unpublish' : 'Publish'}
                >
                  {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => { setIsNew(false); setEditing(post); }}
                  className="p-2 rounded-lg hover:bg-pink-50 text-almond-400 hover:text-pink-600 transition"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deletePost(post.id!)}
                  className="p-2 rounded-lg hover:bg-error-50 text-almond-400 hover:text-error-500 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Post Editor ────────────────────────────────────────────── */

function PostEditor({ post, isNew, onSave, onCancel }: {
  post: BlogPost;
  isNew: boolean;
  onSave: (saved: BlogPost) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<BlogPost>(post);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof BlogPost, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSave = async (publish?: boolean) => {
    if (!form.title.trim()) { setError('Title is required.'); return; }
    if (!form.slug.trim()) { setError('Slug is required.'); return; }
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      published: publish !== undefined ? publish : form.published,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (isNew) {
      result = await supabase.from('blog_posts').insert(payload).select().single();
    } else {
      result = await supabase.from('blog_posts').update(payload).eq('id', form.id).select().single();
    }

    setSaving(false);
    if (result.error) { setError(result.error.message); return; }
    onSave(result.data);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl text-almond-900">{isNew ? 'New Post' : 'Edit Post'}</h2>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-tan-100 text-almond-400 transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="label">Title *</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) => {
                set('title', e.target.value);
                if (isNew) set('slug', autoSlug(e.target.value));
              }}
              placeholder="How to delegate your inbox in 5 steps"
            />
          </div>

          <div>
            <label className="label">Body *</label>
            <textarea
              className="input min-h-[400px] resize-y font-mono text-sm"
              value={form.body ?? ''}
              onChange={(e) => set('body', e.target.value)}
              placeholder="Write your post content here. Use blank lines to separate paragraphs."
            />
            <p className="text-xs text-almond-400 mt-1">Separate paragraphs with a blank line.</p>
          </div>

          <div>
            <label className="label">Summary</label>
            <textarea
              className="input min-h-[80px] resize-y"
              value={form.summary ?? ''}
              onChange={(e) => set('summary', e.target.value)}
              placeholder="A short description shown on the blog listing page."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <h3 className="font-serif text-base text-almond-900">Post settings</h3>

            <div>
              <label className="label">Slug *</label>
              <input
                className="input font-mono text-sm"
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="how-to-delegate-inbox"
              />
            </div>

            <div>
              <label className="label">Category</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {['General', 'Productivity', 'Delegation', 'Business', 'Tools', 'Case Study'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Read time</label>
              <input
                className="input"
                value={form.read_time ?? ''}
                onChange={(e) => set('read_time', e.target.value)}
                placeholder="5 min read"
              />
            </div>

            <div>
              <label className="label">Cover image URL</label>
              <input
                className="input"
                value={form.image_url ?? ''}
                onChange={(e) => set('image_url', e.target.value)}
                placeholder="https://images.pexels.com/..."
              />
              {form.image_url && (
                <img src={form.image_url} alt="" className="mt-2 rounded-lg w-full h-32 object-cover" />
              )}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => set('published', !form.published)}
                className={`relative w-10 h-6 rounded-full transition-colors ${form.published ? 'bg-pink-500' : 'bg-almond-200'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm text-almond-700">{form.published ? 'Published' : 'Draft'}</span>
            </div>
          </div>

          {error && <p className="text-error-600 text-sm">{error}</p>}

          <div className="space-y-2">
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-outline w-full"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="btn-primary w-full"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
              Save & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Leads Tab ──────────────────────────────────────────────── */

function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setLeads(data ?? []);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
  };

  const statusColor: Record<string, string> = {
    new: 'bg-pink-50 text-pink-600',
    contacted: 'bg-warning-50 text-warning-600',
    converted: 'bg-success-50 text-success-600',
    closed: 'bg-tan-100 text-almond-500',
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <p className="text-almond-500 text-sm mb-6">{leads.length} lead{leads.length !== 1 ? 's' : ''}</p>

      {leads.length === 0 ? (
        <div className="card p-12 text-center">
          <Users className="w-10 h-10 text-almond-200 mx-auto mb-3" />
          <p className="text-almond-400">No leads yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="card p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-serif text-almond-900">{lead.name}</span>
                    {lead.company && <span className="text-almond-400 text-sm">· {lead.company}</span>}
                    <span className={`badge text-xs ${statusColor[lead.status ?? 'new'] ?? statusColor.new}`}>
                      {lead.status ?? 'new'}
                    </span>
                  </div>
                  <a href={`mailto:${lead.email}`} className="text-pink-600 text-sm hover:underline">{lead.email}</a>
                  {lead.phone && <span className="text-almond-400 text-sm ml-3">{lead.phone}</span>}
                  {lead.service_interest && (
                    <p className="text-xs text-almond-500 mt-1">Interested in: {lead.service_interest}</p>
                  )}
                  {lead.message && (
                    <p className="text-sm text-almond-600 mt-2 leading-relaxed line-clamp-2">{lead.message}</p>
                  )}
                  {lead.created_at && (
                    <p className="text-xs text-almond-300 mt-2">{new Date(lead.created_at).toLocaleString()}</p>
                  )}
                </div>
                <select
                  value={lead.status ?? 'new'}
                  onChange={(e) => updateStatus(lead.id!, e.target.value)}
                  className="input text-sm w-auto flex-shrink-0"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
    </div>
  );
}
