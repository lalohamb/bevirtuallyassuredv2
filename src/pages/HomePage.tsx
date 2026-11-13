import { navigate } from '@/lib/router';
import { track, Events } from '@/lib/analytics';
import { Hero } from '@/components/home/Hero';
import { ValueStrip } from '@/components/home/ValueStrip';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { AboutSection } from '@/components/home/AboutSection';
import { RoiCalculatorSection } from '@/components/home/RoiCalculatorSection';
import { ConsultationSection } from '@/components/home/ConsultationSection';

export function HomePage() {
  const handleAssessment = (source: string) => {
    track(Events.ASSESSMENT_STARTED, { source });
    navigate('assessment');
  };

  const handleConsultation = (source: string) => {
    track(Events.CONSULTATION_STARTED, { source });
    navigate('contact');
  };

  const handleServices = (source: string) => {
    track(Events.SERVICES_VIEWED, { source });
    navigate('services');
  };

  return (
    <>
      <Hero
        onConsultation={() => handleConsultation('hero')}
        onServices={() => handleServices('homepage_hero')}
      />
      <ValueStrip />
      <ServicesGrid
        onNavigate={(path) => { track(Events.SERVICES_VIEWED, { source: 'homepage_card' }); navigate(path); }}
        onExploreAll={() => handleServices('homepage')}
      />
      <AboutSection onLearnMore={() => navigate('about')} />
      <RoiCalculatorSection
        onCalculate={() => { track(Events.CALCULATOR_STARTED, { source: 'homepage' }); navigate('calculator'); }}
        onConsultation={() => handleConsultation('calculator_cta')}
      />
      <ConsultationSection onAssessment={() => handleAssessment('contact_section')} />
    </>
  );
}
