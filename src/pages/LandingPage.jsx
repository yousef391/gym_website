import HeroSection from "../components/landing/HeroSection";
import BenefitsBar from "../components/landing/BenefitsBar";
import CategoriesSection from "../components/landing/CategoriesSection";
import FeaturedProducts from "../components/landing/FeaturedProducts";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BenefitsBar />
      <CategoriesSection />
      <FeaturedProducts />
    </div>
  );
};

export default LandingPage;
