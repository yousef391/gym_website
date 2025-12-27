import HeroSection from "../components/landing/HeroSection";
import BenefitsBar from "../components/landing/BenefitsBar";
import CategoriesSection from "../components/landing/CategoriesSection";
import FeaturedProducts from "../components/landing/FeaturedProducts";
import PromoBanners from "../components/landing/PromoBanners";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import CTASection from "../components/landing/CTASection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <BenefitsBar />
      <CategoriesSection />
      <FeaturedProducts />
      <PromoBanners />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
