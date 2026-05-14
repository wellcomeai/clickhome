import Navbar from '@/components/Navbar';
import HeroVideo from '@/components/HeroVideo';
import ServicesSection from '@/components/ServicesSection';
import StatsBar from '@/components/StatsBar';
import MopsSection from '@/components/MopsSection';
import SpaSection from '@/components/SpaSection';
import ResidentialSection from '@/components/ResidentialSection';
import PhilosophySection from '@/components/PhilosophySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroVideo />
      <ServicesSection />
      <StatsBar />
      <MopsSection />
      <SpaSection />
      <ResidentialSection />
      <PhilosophySection />
      <Footer />
    </main>
  );
}
