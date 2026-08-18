import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChannelsSection from "@/components/ChannelsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import PlansSection from "@/components/PlansSection";
import AppDownloadSection from "@/components/AppDownloadSection";
import DevicesSection from "@/components/DevicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ChannelsSection />
      <WhyChooseSection />
      <PlansSection />
      <AppDownloadSection />
      <DevicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
