import { Truck, Award, Shield, Leaf } from "lucide-react";
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-cream-light rounded-2xl p-6 hover-lift group cursor-pointer"
              >
                <div className="w-14 h-14 bg-gradient-green rounded-xl flex items-center justify-center mb-4 group-hover:shadow-green transition-shadow">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-dark text-lg mb-2 transition-colors duration-300 group-hover:text-primary">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm transition-colors duration-300 group-hover:text-gray-700">
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsBar;
