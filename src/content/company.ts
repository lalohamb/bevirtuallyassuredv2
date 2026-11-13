// Company copy that appears on more than one page. Text is verbatim from the
// pre-redesign About page (see docs/redesign/content-inventory.md, A-1…A-5).
import { Target, BarChart2, Zap, Lightbulb, Handshake } from 'lucide-react';

export const ABOUT_HEADING = 'What Sets Us Apart';

export const ABOUT_INTRO =
  'At Virtually Assured, we are committed to helping you succeed by offering a comprehensive range of consulting services tailored to your needs. From marketing strategy and executive administrative support, to event & project management. We take the time to understand your needs and challenges, and create solutions tailored to your business that make a difference.';

export const FOUNDER = { name: "Na'ndi Hambrick", title: 'Founder & CEO' };

export const PILLARS = [
  { icon: Zap, title: 'Proactive Ownership', desc: "We don't just wait for instructions; we anticipate needs, solve problems early, and own the outcomes." },
  { icon: Target, title: 'Agile Adaptability', desc: 'The digital landscape changes fast; we pivot quickly and adapt smoothly to keep our clients ahead of the curve.' },
  { icon: Lightbulb, title: 'Bold Creativity', desc: 'We push boundaries in our marketing strategies to help brands stand out in crowded markets.' },
  { icon: BarChart2, title: 'Efficient Execution', desc: 'We value smart workflows, automation, and speed, eliminating friction for our clients.' },
  { icon: Handshake, title: 'Collaborative Synergy', desc: "We operate as a seamless extension of our clients' internal teams, blending our strengths with theirs." },
];

/** Consultation promise used on Home and Contact (Contact adds one extra item). */
export const CONSULTATION_POINTS = [
  'No commitment — the consultation is completely free',
  'We review your current marketing before the call',
  'You leave with at least one actionable insight',
  'No generic pitch — specific to your business',
];
