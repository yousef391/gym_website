import { useState, useMemo } from "react";
import { Search, Grid, List, Loader2 } from "lucide-react";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/common/ProductCard";
import ProductModal from "../components/common/ProductModal";

const StorePage = () => {
  const { products, categories, loading, store } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Build category list with "All Products" option
  const categoryList = useMemo(() => {
    return [{ id: "all", name: "All Products", slug: "all" }, ...categories];
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category_id === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-theme-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Hero Banner */}
      <div className="relative gradient-theme py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blob" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blob-2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
            {store?.name ? `${store.name} Store` : "Shop All Products"}
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
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-theme-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categoryList.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "gradient-theme text-white shadow-theme"
                    : "bg-white text-gray-600 hover:bg-primary-50"
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
              className={`p-3 rounded-xl transition-colors ${
                viewMode === "grid"
                  ? "bg-theme-primary text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition-colors ${
                viewMode === "list"
                  ? "bg-theme-primary text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-500 mb-6">
          Showing{" "}
          <span className="text-theme-primary font-bold">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>

        {/* Products Grid */}
        <div
          className={`grid gap-4 md:gap-6 ${
            viewMode === "grid"
              ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={{
                ...product,
                // Map Supabase fields to expected format
                category: product.categories?.slug || product.category_id,
                rating: product.rating || 4.5,
                reviews: product.reviews_count || 0,
                image: product.image_url || "/images/hero-product.png",
              }} 
              index={index}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-theme-primary" />
            </div>
            <h3 className="font-heading text-xl text-dark mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              {products.length === 0 
                ? "This store hasn't added any products yet"
                : "Try adjusting your search or filters"
              }
            </p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default StorePage;
