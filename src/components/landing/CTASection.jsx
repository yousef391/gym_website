import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Shield,
  Truck,
  Award,
  Sparkles,
  Star,
} from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 blob-2" />

        {/* Floating leaves */}
        <svg
          className="absolute top-20 left-10 w-16 h-16 text-white/10 animate-float-slow"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
        <svg
          className="absolute bottom-32 right-20 w-12 h-12 text-accent/20 animate-float-delay"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 animate-bounce-slow">
          <Sparkles className="w-10 h-10 text-accent" />
        </div>

        {/* Heading */}
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
          Ready to Start Your{" "}
          <span className="gradient-text-orange">Fitness Journey</span>?
        </h2>

        {/* Description */}
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Join thousands who trust MuscleUp for their supplement needs.
          Experience the difference of premium quality.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/store"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-orange text-white font-heading text-lg rounded-full shadow-orange hover:shadow-lg transition-all duration-300 btn-press"
          >
            Browse Products
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/recommend"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-heading text-lg rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Get Recommendations
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-white/70">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm">Free Shipping $50+</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm">Quality Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-olive" />
            <span className="text-sm">4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
