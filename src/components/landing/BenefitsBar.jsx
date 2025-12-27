import { Truck, Award, Clock, RefreshCw, Shield, Leaf } from "lucide-react";
import { benefits } from "../../data/products";

const benefitData = [
  { icon: Leaf, title: "Dietary Supplement", desc: "100% natural ingredients" },
  { icon: Shield, title: "Formula Innovative", desc: "Scientifically proven" },
  { icon: Award, title: "Quality Guaranteed", desc: "Lab tested & certified" },
  { icon: Truck, title: "Fast Delivery", desc: "2-3 business days" },
];

const BenefitsBar = () => {
  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-50 blob opacity-50" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent-50 blob-2 opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-cream-light rounded-2xl p-6 hover-lift group"
              >
                <div className="w-14 h-14 bg-gradient-green rounded-xl flex items-center justify-center mb-4 group-hover:shadow-green transition-shadow">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-dark text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsBar;
