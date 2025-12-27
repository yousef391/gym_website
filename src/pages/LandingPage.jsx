import HeroSection from "../components/landing/HeroSection";
import BenefitsBar from "../components/landing/BenefitsBar";
import CategoriesSection from "../components/landing/CategoriesSection";
import FeaturedProducts from "../components/landing/FeaturedProducts";
import PromoBanners from "../components/landing/PromoBanners";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import CTASection from "../components/landing/CTASection";
import { FeatureAdvantages } from "../components/ui/FeatureAdvantages";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeatureAdvantages />
      <CategoriesSection />
      <FeaturedProducts />

      <PromoBanners />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
