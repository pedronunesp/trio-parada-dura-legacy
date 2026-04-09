import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import StatsSection from "@/components/landing/StatsSection";
import GallerySection from "@/components/landing/GallerySection";
import TimelineSection from "@/components/landing/TimelineSection";
import VideoSection from "@/components/landing/VideoSection";
import MediaKitCTA from "@/components/landing/MediaKitCTA";
import ContactSection from "@/components/landing/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <GallerySection />
        <MediaKitCTA />
        <VideoSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
