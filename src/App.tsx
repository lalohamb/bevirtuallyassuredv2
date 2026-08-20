import { useRouter } from '@/lib/router';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { PortfolioPage } from '@/pages/PortfolioPage';
import { PackagesPage } from '@/pages/PackagesPage';
import { LoginPage } from '@/pages/LoginPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { BlogPage } from '@/pages/BlogPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { AdminPage } from '@/pages/AdminPage';

function Pages() {
  const route = useRouter();

  const page = (() => {
    switch (route.name) {
      case 'home': return <HomePage />;
      case 'portfolio': return <PortfolioPage />;
      case 'packages': return <PackagesPage />;
      case 'login': return <LoginPage />;
      case 'onboarding': return <OnboardingPage />;
      case 'dashboard': return <DashboardPage />;
      case 'checkout': return <CheckoutPage />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'blog': return <BlogPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'admin': return <AdminPage />;
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
