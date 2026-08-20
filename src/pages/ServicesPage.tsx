import { Mail, Users, FileText, Phone, Calendar, BarChart2, ArrowRight, Check } from 'lucide-react';
import { navigate } from '@/lib/router';

const services = [
  {
    icon: Mail,
    title: 'Inbox & Calendar Management',
    summary: 'Never miss an important email or double-book a meeting again.',
    description: 'Your assistant monitors your inbox, triages emails by priority, drafts responses in your voice, and keeps your calendar organised. We handle scheduling, reminders, and follow-ups so you can focus on the conversations that matter.',
    deliverables: [
      'Daily inbox triage and prioritisation',
      'Email drafting and responses in your brand voice',
      'Calendar scheduling and conflict resolution',
      'Meeting prep and follow-up summaries',
      'Unsubscribe and spam management',
    ],
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
  },
  {
    icon: Users,
    title: 'Customer Support',
    summary: 'Keep your customers happy without being glued to your inbox.',
    description: 'Our assistants handle first-line customer enquiries, complaints, and feedback across email, chat, and social DMs. We follow your brand guidelines and escalate only what truly needs your attention.',
    deliverables: [
      'First-response handling within agreed SLA',
      'FAQ and knowledge base management',
      'Refund and complaint resolution (within your policy)',
      'Social media DM monitoring',
      'Weekly support summary reports',
    ],
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
  },
  {
    icon: FileText,
    title: 'Content & Admin',
    summary: 'From blog posts to data entry — handled, formatted, and filed.',
    description: 'Whether you need blog drafts, social media captions, slide decks, or spreadsheets cleaned up, our assistants are trained content generalists who work fast and accurately.',
    deliverables: [
      'Blog post drafting and formatting',
      'Social media caption writing and scheduling',
      'Presentation and slide deck creation',
      'Data entry and spreadsheet management',
      'Document formatting and filing',
    ],
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
  },
  {
    icon: Phone,
    title: 'Bookkeeping',
    summary: 'Stay on top of cash flow without touching a spreadsheet.',
    description: 'Our bookkeeping-trained assistants handle invoicing, expense categorisation, and reconciliation. We work inside your existing tools (QuickBooks, Xero, Wave) and keep your records clean for your accountant.',
    deliverables: [
      'Invoice creation and sending',
      'Expense tracking and categorisation',
      'Bank reconciliation (monthly)',
      'Accounts receivable follow-up',
      'Monthly financial summary report',
    ],
    image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg',
  },
  {
    icon: Calendar,
    title: 'Project Coordination',
    summary: 'Keep projects on track without micromanaging every detail.',
    description: 'Your assistant acts as a project coordinator — tracking tasks, chasing deadlines, updating project boards, and keeping stakeholders informed. We work inside Asana, Notion, Trello, or whatever tool you use.',
    deliverables: [
      'Task creation and assignment tracking',
      'Deadline monitoring and reminders',
      'Stakeholder update emails',
      'Meeting notes and action item tracking',
      'Project board maintenance',
    ],
    image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
  },
  {
    icon: BarChart2,
    title: 'Research & Reporting',
    summary: 'Get the data you need to make better decisions, faster.',
    description: 'From competitor research to market analysis, our assistants compile, summarise, and present information in a format you can act on. No more hours lost down research rabbit holes.',
    deliverables: [
      'Competitor and market research',
      'Lead list building and enrichment',
      'Industry news digests',
      'Custom report creation',
      'Data visualisation and dashboards',
    ],
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
  },
];

export function ServicesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl text-almond-900 mb-4">What we do</h1>
          <p className="text-almond-600 text-lg leading-relaxed">
            Every service is delivered by a trained, dedicated assistant who learns your
            business and works as an extension of your team.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-20">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-up ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-almond-900 mb-3">{s.title}</h2>
                <p className="text-pink-600 font-medium mb-4">{s.summary}</p>
                <p className="text-almond-600 leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-2 mb-8">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-almond-700">
                      <span className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-pink-600" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('packages')} className="btn-primary">
                  Get started <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className={`rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 card p-10 text-center bg-gradient-to-br from-pink-50 to-tan-100 border-pink-100">
          <h2 className="font-serif text-2xl text-almond-900 mb-3">Not sure which service you need?</h2>
          <p className="text-almond-600 mb-6">Book a free consultation and we will help you figure out exactly where to start.</p>
          <button onClick={() => navigate('')} className="btn-primary">
            Book a Free Consultation <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
