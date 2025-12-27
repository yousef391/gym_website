import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Play, Leaf, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16 bg-gradient-hero">
      {/* Animated blob shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 blob animate-blob opacity-60" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-accent-50 blob-2 animate-blob animation-delay-2000 opacity-50" />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-primary-50 blob animate-blob animation-delay-4000 opacity-40" />

      {/* Floating leaves decoration */}
      <div className="absolute top-32 right-1/4 animate-float-slow">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          className="text-primary opacity-30"
        >
          <path
            fill="currentColor"
            d="M30 5C35 15 45 20 55 15C50 25 55 35 50 45C40 40 35 45 30 55C25 45 20 40 10 45C5 35 10 25 5 15C15 20 25 15 30 5Z"
          />
        </svg>
      </div>
      <div className="absolute bottom-40 right-10 animate-float-delay">
        <svg
          width="40"
          height="40"
          viewBox="0 0 60 60"
          className="text-primary-dark opacity-20"
        >
          <path
            fill="currentColor"
            d="M30 5C35 15 45 20 55 15C50 25 55 35 50 45C40 40 35 45 30 55C25 45 20 40 10 45C5 35 10 25 5 15C15 20 25 15 30 5Z"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left content */}
          <div className="space-y-8 animate-slide-up z-10">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-soft">
              <span className="flex items-center justify-center w-6 h-6 bg-gradient-green rounded-full mr-2">
                <Leaf className="w-3 h-3 text-white" />
              </span>
              <span className="text-dark font-medium text-sm">
                Increased Energy With MuscleUp
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight text-dark">
              Mix Protein
              <br />
              Provided Way To
              <br />
              <span className="gradient-text">Growth</span>
            </h1>

            {/* CTA button */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/store"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-orange text-white font-heading text-lg rounded-full hover:shadow-orange transition-all duration-300 btn-press"
              >
                SHOP NOW
                <div className="ml-3 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </Link>

              <button className="group flex items-center gap-3 text-dark hover:text-primary transition-colors">
                <div className="w-14 h-14 bg-white rounded-full shadow-card flex items-center justify-center group-hover:shadow-green transition-shadow">
                  <Play className="w-5 h-5 text-primary fill-primary ml-1" />
                </div>
                <span className="font-medium">Watch Video</span>
              </button>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="bg-white rounded-2xl p-5 shadow-soft hover-lift group cursor-pointer">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-primary-100">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-dark mb-1 transition-colors duration-300 group-hover:text-primary">
                  Dietary Supplement
                </h3>
                <p className="text-gray-500 text-sm transition-colors duration-300 group-hover:text-gray-700">
                  Fish Oil Softgels are dietary supplements designed to support
                  heart health.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-soft hover-lift group cursor-pointer">
                <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-accent-100">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-dark mb-1 transition-colors duration-300 group-hover:text-primary">
                  Nutrients Provide
                </h3>
                <p className="text-gray-500 text-sm transition-colors duration-300 group-hover:text-gray-700">
                  Essential vitamins and minerals for optimal health and
                  performance.
                </p>
              </div>
            </div>
          </div>

          {/* Right content - Product showcase */}
          <div className="relative lg:block">
            {/* Main product container with organic shape background */}
            <div className="relative">
              {/* Organic background shape */}
              <div className="absolute inset-0 bg-primary-100 blob scale-110 opacity-40" />

              {/* Main product image */}
              <div className="relative z-10 animate-float overflow-visible">
                <img
                  src="/images/hero-product.png"
                  alt="Main Supplement Product"
                  className="
      mx-auto
      w-full
      max-w-none
      scale-[1.7]
      drop-shadow-2xl
    "
                  style={{
                    filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.35))",
                  }}
                />
              </div>

              {/* Floating elements */}
              <div className="absolute top-0 right-0 animate-float-delay">
                <img
                  src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=100&q=80"
                  alt="Fruit"
                  className="w-16 h-16 rounded-full object-cover shadow-lg"
                />
              </div>

              <div className="absolute bottom-20 -left-4 animate-float-slow">
                <div className="bg-white rounded-2xl p-4 shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-accent fill-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">2,847 Reviews</p>
                </div>
              </div>

              {/* Protein info badge */}
              <div className="absolute top-1/4 -left-8 bg-white rounded-2xl p-4 shadow-card animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-green rounded-full flex items-center justify-center">
                    <span className="text-white font-heading text-sm">27g</span>
                  </div>
                  <div>
                    <p className="text-dark font-heading text-sm">Protein</p>
                    <p className="text-gray-500 text-xs">Per Serving</p>
                  </div>
                </div>
              </div>

              {/* Discount badge */}
              <div className="absolute top-10 right-10 bg-gradient-orange text-white px-5 py-3 rounded-full shadow-orange animate-pulse-slow">
                <p className="font-heading text-lg">30% Off</p>
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
