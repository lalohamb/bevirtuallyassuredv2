import { ArrowRight, Heart, Users, Globe } from 'lucide-react';
import { navigate } from '@/lib/router';

const team = [
  {
    name: 'Nandi Rivera',
    role: 'Founder & CEO',
    bio: 'Former operations director turned entrepreneur. Nandi started Petal Assist after spending years watching brilliant business owners drown in admin work that could easily be delegated.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
  },
  {
    name: 'Camille Torres',
    role: 'Head of Client Success',
    bio: 'With a background in customer experience at two SaaS startups, Camille ensures every client-assistant match is set up for long-term success.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
  {
    name: 'Marcus Webb',
    role: 'Lead VA Trainer',
    bio: 'Marcus built our onboarding curriculum from the ground up. Every Petal Assist VA goes through his 40-hour certification program before meeting a client.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
];

const milestones = [
  { year: '2019', event: 'Petal Assist founded with 3 assistants and 5 clients.' },
  { year: '2021', event: 'Reached 50 active clients and launched the Bookkeeping service.' },
  { year: '2023', event: 'Expanded to 150+ clients across 12 countries.' },
  { year: '2024', event: 'Launched the client dashboard and self-serve onboarding.' },
];

export function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page">

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-up">
            <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-6">
              We believe your time is<br />
              <span className="text-pink-600">too valuable to waste.</span>
            </h1>
            <p className="text-almond-600 text-lg leading-relaxed mb-6">
              Petal Assist was born from a simple observation: the most talented entrepreneurs
              spend half their day on tasks that don't require their unique genius. We exist
              to change that.
            </p>
            <p className="text-almond-600 leading-relaxed mb-8">
              Founded in 2019, we have grown from a small team of three assistants to a
              global network of vetted VAs serving clients in over 12 countries. Every
              assistant is hand-selected, trained in-house, and matched to clients based
              on industry, working style, and personality.
            </p>
            <button onClick={() => navigate('packages')} className="btn-primary">
              Work with us <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                alt="Petal Assist team"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values strip */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Heart, title: 'People first', desc: 'We treat every client and assistant as a long-term partner, not a transaction.' },
            { icon: Users, title: 'Vetted & trained', desc: 'Every VA completes a 40-hour certification before their first client engagement.' },
            { icon: Globe, title: 'Remote by design', desc: 'Our distributed team means you get the best talent, wherever they are in the world.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-serif text-lg text-almond-900 mb-2">{title}</h3>
              <p className="text-sm text-almond-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">Meet the team</h2>
            <p className="section-subtitle">The people behind every smooth-running business we support.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={member.name} className="card overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg text-almond-900">{member.name}</h3>
                  <p className="text-pink-600 text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-almond-500 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">Our story</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 items-start animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 flex-shrink-0 text-right">
                  <span className="font-serif text-pink-600 font-semibold">{m.year}</span>
                </div>
                <div className="w-px bg-almond-200 self-stretch relative">
                  <div className="absolute top-1.5 -left-1.5 w-3 h-3 rounded-full bg-pink-400" />
                </div>
                <p className="text-almond-600 text-sm leading-relaxed pt-0.5 pb-4">{m.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card p-10 text-center bg-gradient-to-br from-pink-50 to-tan-100 border-pink-100">
          <h2 className="font-serif text-2xl text-almond-900 mb-3">Ready to reclaim your time?</h2>
          <p className="text-almond-600 mb-6">Book a free, no-pressure consultation and meet your future assistant.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('')} className="btn-primary">Get a Free Consultation</button>
            <button onClick={() => navigate('packages')} className="btn-outline">View Packages</button>
          </div>
        </div>

      </div>
    </div>
  );
}
