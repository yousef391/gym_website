import { Truck, Award, Shield, Leaf } from "lucide-react";

const benefitData = [
  { icon: Leaf, title: "100% Natural", desc: "Pure ingredients" },
  { icon: Shield, title: "Lab Tested", desc: "Certified quality" },
  { icon: Award, title: "Top Rated", desc: "5-star reviews" },
  { icon: Truck, title: "Fast Shipping", desc: "2-3 days" },
];

const BenefitsBar = () => {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {benefitData.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 gradient-theme rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="font-heading text-dark text-sm md:text-base mb-1">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsBar;

