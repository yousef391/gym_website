import { Link } from "react-router-dom";
import { ArrowRight, Play, Award, Shield, Leaf } from "lucide-react";

const PromoBanners = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Decorative blobs */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Experience Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Video Card */}
          <div className="relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                alt="Workout Experience"
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-dark/30 flex items-center justify-center">
                <button className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center shadow-orange hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </button>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-heading text-dark text-sm transition-colors duration-300 group-hover:text-primary">
                    Premium
                  </p>
                  <p className="text-gray-500 text-xs transition-colors duration-300 group-hover:text-gray-700">
                    Quality Assured
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-2 bg-primary-50 text-primary font-medium rounded-full text-sm">
              Experience with MuscleUp
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-dark leading-tight">
              Awesome Experience
              <br />
              with <span className="gradient-text">MuscleUp</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Fish Oil Softgels are dietary supplements designed to support
              heart health, brain function, and overall wellness.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                { icon: Leaf, text: "100% Natural Ingredients" },
                { icon: Shield, text: "Scientifically Proven Formula" },
                { icon: Award, text: "Lab Tested & Certified" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-primary-100 group-hover:scale-110">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-dark font-medium transition-colors duration-300 group-hover:text-primary">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/store"
              className="inline-flex items-center px-8 py-4 bg-gradient-orange text-white font-heading rounded-full shadow-orange hover:shadow-lg transition-all duration-300 btn-press"
            >
              Learn More
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quality Badge Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-12">
          {/* Guarantee Badge */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-orange animate-pulse-slow">
              <div className="text-center text-white">
                <p className="font-heading text-2xl">100%</p>
                <p className="text-xs">GUARANTEED</p>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="text-center md:text-left max-w-md group cursor-pointer">
            <h3 className="font-heading text-2xl text-dark mb-2 transition-colors duration-300 group-hover:text-primary">
              MuscleUp's TEST BOOST MAX is Guaranteed
            </h3>
            <p className="text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
              Help You Increase Your Testosterone Levels Because It Is Packed
              with 8-Potent Libido and Testosterone Boosting Ingredients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
