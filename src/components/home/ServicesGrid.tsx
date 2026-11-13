import { ArrowRight, Layers, Target, Users, Zap } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ServiceCard, type CardTone } from '@/components/shared/ServiceCard';
import { serviceTabPath, type ServiceTabSlug } from '@/lib/navigation';

const services: { icon: typeof Target; title: string; desc: string; tab: ServiceTabSlug; tone: CardTone }[] = [
  { icon: Target, title: 'Marketing Strategy', desc: 'Branding, Web Design, Content Creation, SEO, Email Campaigns, and more.', tab: 'marketing', tone: 'cream' },
  { icon: Users, title: 'Virtual Admin Support', desc: 'Email & Calendar Support, Customer Support, Data Entry & Research, Basic Bookkeeping, Social Media management & more.', tab: 'virtual-assistant', tone: 'tint' },
  { icon: Layers, title: 'Event Coordination', desc: 'Event Planning, Decor Arrangements, Logistics, Vendor Management, Budgeting & Day Of Coordination and more.', tab: 'events', tone: 'peach' },
  { icon: Zap, title: 'Project Management', desc: 'Oversee Workflow & Task Tracking, Task Scheduling and Coordination, Meeting & Status Support, Timeline Deadline Tracking, Client & Vendor Communication and more.', tab: 'events', tone: 'tint' },
];

interface ServicesGridProps {
  onNavigate: (path: string) => void;
  onExploreAll: () => void;
}

export function ServicesGrid({ onNavigate, onExploreAll }: ServicesGridProps) {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Services"
          title={<>What We Can Do <span className="text-highlight">For You</span></>}
          description="From marketing strategy, email and calendar management, phone and administrative support, to content creation, project and event support we are trained across the tasks that keep your business running."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s) => (
            <ServiceCard
              key={s.title}
              icon={s.icon}
              title={s.title}
              description={s.desc}
              tone={s.tone}
              onClick={() => onNavigate(serviceTabPath(s.tab))}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button onClick={onExploreAll} className="btn-outline">
            Explore All Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
