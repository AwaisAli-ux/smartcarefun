import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
