import Navbar from '@/components/Navbar';
import HeroVideo from '@/components/HeroVideo';
import DirectionsSection from '@/components/DirectionsSection';
import PhilosophySection from '@/components/PhilosophySection';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroVideo />
      <DirectionsSection />
      <PhilosophySection />
      <LeadForm />
      <Footer />
    </main>
  );
}
