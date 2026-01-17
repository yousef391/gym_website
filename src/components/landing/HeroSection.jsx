import { Link } from "react-router-dom";
import { ShoppingCart, Sparkles, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16"
      style={{ background: 'linear-gradient(135deg, #F5F1E8 0%, color-mix(in srgb, var(--primary-color, #4CAF50) 12%, #F5F1E8) 50%, #F5F1E8 100%)' }}
    >
      {/* Animated blob shapes - hidden on mobile for performance */}
      <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-theme-primary-light blob animate-blob opacity-50" />
      <div className="hidden md:block absolute top-40 right-20 w-96 h-96 bg-accent-50 blob-2 animate-blob animation-delay-2000 opacity-40" />
      <div className="hidden md:block absolute bottom-20 left-1/4 w-64 h-64 bg-theme-primary-light blob animate-blob animation-delay-4000 opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">
          
          {/* Left content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft">
              <Sparkles className="w-4 h-4 text-theme-primary mr-2" />
              <span className="text-dark font-medium text-sm">
                Premium Quality Supplements
              </span>
            </div>

            {/* Main heading - responsive sizing */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-dark">
              Mix Protein
              <br />
              Provided Way To
              <br />
              <span className="gradient-theme-text">Growth</span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto lg:mx-0">
              Discover high-quality supplements designed to help you reach your fitness goals faster.
            </p>

            {/* CTA buttons - stack on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/store"
                className="w-full sm:w-auto group inline-flex items-center justify-center px-8 py-4 gradient-theme-accent text-white font-heading text-lg rounded-full hover:shadow-theme-accent transition-all duration-300 btn-press"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shop Now
              </Link>
              
              <Link
                to="/recommend"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-dark font-heading text-lg rounded-full border-2 border-gray-200 hover:border-theme-primary hover:text-theme-primary transition-all duration-300"
              >
                Take the Quiz
              </Link>
            </div>

            {/* Feature cards - hidden on small mobile */}
            <div className="hidden sm:grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-soft hover-lift">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-2 md:mb-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-heading text-dark text-sm md:text-base mb-1">100% Natural</h3>
                <p className="text-gray-500 text-xs md:text-sm">Pure, lab-tested ingredients</p>
              </div>

              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-soft hover-lift">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-2 md:mb-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading text-dark text-sm md:text-base mb-1">Fast Results</h3>
                <p className="text-gray-500 text-xs md:text-sm">Feel the difference in weeks</p>
              </div>
            </div>
          </div>

          {/* Right content - Product showcase */}
          <div className="relative order-1 lg:order-2">
            <div className="relative">
              {/* Organic background shape */}
              <div className="absolute inset-0 bg-theme-primary-light blob scale-110 opacity-40" />

              {/* Main product image - large with animation */}
              <div className="relative z-10 animate-float overflow-visible">
                <img
                  src="/images/hero-product.png"
                  alt="Premium Supplements"
                  className="mx-auto w-full max-w-none scale-[1.3] md:scale-[1.5] lg:scale-[1.7] drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.35))",
                  }}
                />
              </div>

              {/* Floating review card - hidden on mobile */}
              <div className="hidden md:block absolute bottom-20 -left-4 animate-float-slow">
                <div className="bg-white rounded-2xl p-4 shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">2,847 Reviews</p>
                </div>
              </div>

              {/* Protein info badge - hidden on mobile */}
              <div className="hidden md:block absolute top-1/4 -left-8 bg-white rounded-2xl p-4 shadow-card animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-theme rounded-full flex items-center justify-center">
                    <span className="text-white font-heading text-sm">27g</span>
                  </div>
                  <div>
                    <p className="text-dark font-heading text-sm">Protein</p>
                    <p className="text-gray-500 text-xs">Per Serving</p>
                  </div>
                </div>
              </div>

              {/* Discount badge */}
              <div className="absolute top-0 right-0 md:top-10 md:right-10 gradient-theme-accent text-white px-4 py-2 md:px-5 md:py-3 rounded-full shadow-theme-accent animate-pulse-slow">
                <p className="font-heading text-sm md:text-lg">30% Off</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
