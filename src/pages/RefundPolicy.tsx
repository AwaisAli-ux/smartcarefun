import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RefundPolicySection from "@/components/RefundPolicySection";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12">
        <RefundPolicySection />
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
