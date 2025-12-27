import { Check, Dumbbell, Zap, Shield, Award, Leaf, Truck } from "lucide-react";
import { Badge } from "./Badge";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure ingredients with no artificial additives or fillers.",
  },
  {
    icon: Zap,
    title: "Fast Results",
    description: "See noticeable improvements in just 2-4 weeks.",
  },
  {
    icon: Shield,
    title: "Lab Tested",
    description: "Every batch is third-party tested for purity and potency.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the finest ingredients sourced worldwide.",
  },
  {
    icon: Dumbbell,
    title: "Athlete Approved",
    description: "Trusted by professional athletes and trainers.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Free delivery on orders over $50 within 2-3 days.",
  },
];

function FeatureAdvantages() {
  return (
    <section className="w-full py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 blob opacity-30" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-50 blob-2 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 flex-col items-start">
          {/* Badge */}
          <Badge variant="success">Why Choose MuscleUp</Badge>

          {/* Header */}
          <div className="flex gap-3 flex-col">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-dark">
              The <span className="gradient-text">MuscleUp</span> Advantage
            </h2>
            <p className="text-lg max-w-xl lg:max-w-2xl leading-relaxed text-gray-500">
              We're committed to providing the highest quality supplements to
              fuel your fitness journey. Here's what sets us apart.
            </p>
          </div>

          {/* Features Grid */}
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-row gap-4 w-full items-start p-4 rounded-2xl transition-all duration-300 hover:bg-primary-50 hover:shadow-soft group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-gradient-green rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-green transition-all duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-heading text-dark text-lg transition-colors duration-300 group-hover:text-primary">
                        {feature.title}
                      </p>
                      <p className="text-gray-500 text-sm transition-colors duration-300 group-hover:text-gray-700">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FeatureAdvantages };
