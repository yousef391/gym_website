import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/common/ProductCard";

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Hero Banner */}
      <div className="relative bg-gradient-green py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blob" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blob-2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
            Shop All Products
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Premium supplements to fuel your fitness journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-green text-white shadow-green"
                    : "bg-white text-gray-600 hover:bg-primary-50 hover:text-primary"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:text-primary hover:bg-primary-50"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:text-primary hover:bg-primary-50"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-500 mb-6">
          Showing{" "}
          <span className="text-primary font-bold">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-heading text-xl text-dark mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
