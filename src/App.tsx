import { useRouter } from '@/lib/router';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { AboutPage } from '@/pages/AboutPage';
import { BlogPage } from '@/pages/BlogPage';
import { AssessmentPage } from '@/pages/AssessmentPage';
import { CalculatorPage } from '@/pages/CalculatorPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AdminPage } from '@/pages/AdminPage';
import { BrandingPage } from '@/pages/BrandingPage';
import { FAQPage } from '@/pages/FAQPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';

function Pages() {
  const route = useRouter();

  const page = (() => {
    switch (route.name) {
      case 'home': return <HomePage />;
      case 'services': return <ServicesPage />;
      case 'results': return <ResultsPage />;
      case 'portfolio': return <ResultsPage />;
      case 'about': return <AboutPage />;
      case 'blog': return <BlogPage />;
      case 'assessment': return <AssessmentPage />;
      case 'calculator': return <CalculatorPage />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage />;
      case 'onboarding': return <OnboardingPage />;
      case 'dashboard': return <DashboardPage />;
      case 'admin': return <AdminPage />;
      case 'branding': return <BrandingPage />;
      case 'faq': return <FAQPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      default: return <HomePage />;
    }
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-lift"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-grow focus:outline-none">{page}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Pages />
      </CartProvider>
    </AuthProvider>
  );
}
