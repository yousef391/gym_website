import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

// Use local images for categories (match file names in images folder)
const categoryImages = {
  all: "/images/hero-product.png",
  protein: "/images/protein.png",
  "pre-workout": "/images/pre-workout.png",
  creatine: "/images/creatine.png",
  amino: "/images/amino.png",
  "fat-burner": "/images/kk.png",
  vitamins: "/images/vitamins.png",
};

const CategoriesSection = () => {
  const { categories } = useStore();

  if (!categories || categories.length === 0) return null;

  const getImage = (name) => {
    const key = name.toLowerCase().replace(/\s+/g, '-');
    return categoryImages[key] || categoryImages["all"];
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 leaf-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-dark mb-4">
            Shop by <span className="gradient-theme-text">Category</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find exactly what you need to support your fitness journey
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/store?category=${category.id}`}
              className="group flex flex-col items-center transition-all duration-300 hover:scale-110"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* 3D floating image, bigger, no card */}
              <div
                className="relative z-10 mb-6 w-36 h-36 flex items-center justify-center"
                style={{ perspective: "1000px" }}
              >
                <img
                  src={getImage(category.name)}
                  alt={category.name}
                  className="w-32 h-32 object-contain category-3d-img"
                  style={{
                    boxShadow:
                      "0 24px 60px 0 rgba(0,0,0,0.22), 0 4px 16px 0 rgba(0,0,0,0.12)",
                    borderRadius: "1.5rem",
                    background: "transparent",
                    transform: "none", // Ensures no rotation or perspective
                  }}
                />
                {/* 3D shadow under image */}
                <div
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black/20 rounded-full blur-md opacity-70 z-0"
                  style={{ left: "50%", transform: "translate(-50%, 0)" }}
                />
              </div>
              {/* Label only */}
              <span className="font-semibold text-dark text-lg group-hover:text-theme-primary transition-colors drop-shadow-sm mt-2">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
