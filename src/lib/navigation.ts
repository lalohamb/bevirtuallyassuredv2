// Shared navigation data for the header, footer and Services page tabs.

export const SERVICE_TABS = [
  { slug: 'marketing', label: 'Marketing Solutions' },
  { slug: 'virtual-assistant', label: 'Virtual Assistant' },
  { slug: 'events', label: 'Event & Project Management' },
  { slug: 'brand', label: 'Brand Strategy' },
] as const;

export type ServiceTabSlug = typeof SERVICE_TABS[number]['slug'];

/** Path that opens /services on a specific tab, e.g. `services?tab=events`. */
export function serviceTabPath(slug: ServiceTabSlug) {
  return `services?tab=${slug}`;
}

export interface NavItem {
  label: string;
  path: string;
  /** Route name used to highlight the active item. */
  match?: string;
}

export interface NavGroup {
  label: string;
  match: string[];
  items: NavItem[];
}

export const PRIMARY_NAV: (NavItem | NavGroup)[] = [
  { label: 'Home', path: '', match: 'home' },
  { label: 'About', path: 'about', match: 'about' },
  {
    label: 'Services',
    match: ['services', 'branding'],
    items: [
      { label: 'All Services', path: 'services' },
      ...SERVICE_TABS.map((t) => ({ label: t.label, path: serviceTabPath(t.slug) })),
    ],
  },
  {
    label: 'Resources',
    match: ['blog', 'results', 'portfolio', 'assessment', 'calculator', 'faq'],
    items: [
      { label: 'Blog', path: 'blog' },
      { label: 'Results', path: 'results' },
      { label: 'Free Assessment', path: 'assessment' },
      { label: 'ROI Calculator', path: 'calculator' },
      { label: 'FAQ', path: 'faq' },
    ],
  },
  { label: 'Contact', path: 'contact', match: 'contact' },
];

export function isGroup(item: NavItem | NavGroup): item is NavGroup {
  return 'items' in item;
}
