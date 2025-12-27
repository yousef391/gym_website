import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "../../data/products";

// Use local images for categories
const categoryImages = {
  all: "/images/hero-product.png",
  protein: "/images/protein.png",
  "pre-workout": "/images/pre-workout.png",
  creatine: "/images/creatine.png",
  amino: "/images/amino.png",
  "fat-burner": "/images/kk.png",
  vitamins: "/images/vitamins.png",
};

// Category card configurations
const categoryConfig = {
  all: { bg: "#f3f4f6", label: "Browse All" },
  protein: { bg: "#e0f2fe", label: "Muscle Building" },
  "pre-workout": { bg: "#fef3c7", label: "Energy & Focus" },
  creatine: { bg: "#ffe4e6", label: "Strength & Power" },
  amino: { bg: "#d1fae5", label: "Recovery" },
  "fat-burner": { bg: "#f3e8ff", label: "Weight Management" },
  vitamins: { bg: "#ccfbf1", label: "Health & Wellness" },
};

const CategoriesSection = () => {
  const protein = categories.find((c) => c.id === "protein");
  const preworkout = categories.find((c) => c.id === "pre-workout");
  const creatine = categories.find((c) => c.id === "creatine");
  const amino = categories.find((c) => c.id === "amino");
  const vitamins = categories.find((c) => c.id === "vitamins");
  const fatburner = categories.find((c) => c.id === "fat-burner");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-dark mb-4">
            Product <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find exactly what you need to support your fitness journey
          </p>
        </div>

        {/* Bento Grid - 2 rows layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {/* Row 1 */}
          {/* Protein - Large Left Card */}
          <Link
            to="/store?category=protein"
            className="col-span-12 sm:col-span-6 md:col-span-4 row-span-2 group relative overflow-hidden rounded-2xl p-5 md:p-6 min-h-[320px] md:min-h-[420px] flex flex-col"
            style={{ backgroundColor: categoryConfig.protein.bg }}
          >
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {categoryConfig.protein.label}
            </span>
            <h3 className="font-heading text-3xl md:text-4xl text-dark mt-1 transition-colors group-hover:text-primary">
              {protein?.name.toUpperCase()}
            </h3>
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-dark text-white text-[11px] font-semibold rounded-full transition-all duration-300 group-hover:bg-primary group-hover:gap-3">
                SHOP NOW <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <img
              src={categoryImages.protein}
              alt="Protein"
              className="absolute bottom-3 right-3 w-36 h-36 md:w-48 md:h-48 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
            />
          </Link>

          {/* Pre-Workout - Top Middle */}
          <Link
            to="/store?category=pre-workout"
            className="col-span-6 sm:col-span-6 md:col-span-4 group relative overflow-hidden rounded-2xl p-5 min-h-[180px] md:min-h-[200px] flex flex-col"
            style={{ backgroundColor: categoryConfig["pre-workout"].bg }}
          >
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {categoryConfig["pre-workout"].label}
            </span>
            <h3 className="font-heading text-xl md:text-2xl text-dark mt-1 transition-colors group-hover:text-primary">
              {preworkout?.name.toUpperCase()}
            </h3>
            <img
              src={categoryImages["pre-workout"]}
              alt="Pre-Workout"
              className="absolute bottom-2 right-2 w-24 h-24 md:w-32 md:h-32 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
            />
          </Link>

          {/* Creatine - Top Right */}
          <Link
            to="/store?category=creatine"
            className="col-span-6 sm:col-span-6 md:col-span-4 group relative overflow-hidden rounded-2xl p-5 min-h-[180px] md:min-h-[200px] flex flex-col"
            style={{ backgroundColor: categoryConfig.creatine.bg }}
          >
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {categoryConfig.creatine.label}
            </span>
            <h3 className="font-heading text-xl md:text-2xl text-dark mt-1 transition-colors group-hover:text-primary">
              {creatine?.name.toUpperCase()}
            </h3>
            <img
              src={categoryImages.creatine}
              alt="Creatine"
              className="absolute bottom-2 right-2 w-24 h-24 md:w-32 md:h-32 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
            />
          </Link>

          {/* Row 2 */}
          {/* Amino - Bottom Middle Left */}
          <Link
            to="/store?category=amino"
            className="col-span-6 sm:col-span-4 md:col-span-3 group relative overflow-hidden rounded-2xl p-5 min-h-[180px] md:min-h-[200px] flex flex-col"
            style={{ backgroundColor: categoryConfig.amino.bg }}
          >
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {categoryConfig.amino.label}
            </span>
            <h3 className="font-heading text-xl md:text-2xl text-dark mt-1 transition-colors group-hover:text-primary">
              {amino?.name.toUpperCase()}
            </h3>
            <img
              src={categoryImages.amino}
              alt="Amino"
              className="absolute bottom-2 right-2 w-20 h-20 md:w-28 md:h-28 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
            />
          </Link>

          {/* Vitamins - Bottom Middle */}
          <Link
            to="/store?category=vitamins"
            className="col-span-6 sm:col-span-4 md:col-span-3 group relative overflow-hidden rounded-2xl p-5 min-h-[180px] md:min-h-[200px] flex flex-col"
            style={{ backgroundColor: categoryConfig.vitamins.bg }}
          >
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {categoryConfig.vitamins.label}
            </span>
            <h3 className="font-heading text-xl md:text-2xl text-dark mt-1 transition-colors group-hover:text-primary">
              {vitamins?.name.toUpperCase()}
            </h3>
            <img
              src={categoryImages.vitamins}
              alt="Vitamins"
              className="absolute bottom-2 right-2 w-20 h-20 md:w-28 md:h-28 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
            />
          </Link>

          {/* Fat Burner - Bottom Right Wide */}
          <Link
            to="/store?category=fat-burner"
            className="col-span-12 sm:col-span-4 md:col-span-2 group relative overflow-hidden rounded-2xl p-5 min-h-[180px] md:min-h-[200px] flex flex-col"
            style={{ backgroundColor: categoryConfig["fat-burner"].bg }}
          >
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {categoryConfig["fat-burner"].label}
            </span>
            <h3 className="font-heading text-xl md:text-2xl text-dark mt-1 transition-colors group-hover:text-primary">
              FAT BURNER
            </h3>
            <div className="mt-auto">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary transition-all duration-300 group-hover:gap-2">
                SHOP NOW <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <img
              src={categoryImages["fat-burner"]}
              alt="Fat Burner"
              className="absolute bottom-2 right-1 w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
