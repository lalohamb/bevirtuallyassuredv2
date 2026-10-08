import { useRouter } from '@/lib/router';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      default: return <HomePage />;
    }
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{page}</main>
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
