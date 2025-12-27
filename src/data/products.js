// Product data for the supplement store
export const products = [
  {
    id: 1,
    name: "Whey Protein Isolate",
    category: "protein",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviews: 2847,
    image: "/images/hero-product.png",
    badge: "Best Seller",
    description:
      "Ultra-pure whey isolate with 27g protein per serving. Zero sugar, fast absorbing.",
    benefits: ["27g Protein", "Zero Sugar", "Fast Absorbing"],
    flavors: ["Chocolate", "Vanilla", "Strawberry"],
    servings: 30,
  },
  {
    id: 2,
    name: "Pre-Workout Formula",
    category: "pre-workout",
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.8,
    reviews: 1923,
    image: "/images/hero-product.png",
    badge: "New",
    description:
      "Clean energy and focus. Natural caffeine, beta-alanine, and citrulline.",
    benefits: ["Natural Caffeine", "Enhanced Focus", "Better Pumps"],
    flavors: ["Berry", "Citrus", "Watermelon"],
    servings: 30,
  },
  {
    id: 3,
    name: "Creatine Monohydrate",
    category: "creatine",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 3241,
    image: "/images/hero-product.png",
    badge: "Top Rated",
    description:
      "Pure micronized creatine for strength, power, and muscle gains.",
    benefits: ["5g Pure Creatine", "Micronized", "No Fillers"],
    flavors: ["Unflavored"],
    servings: 60,
  },
  {
    id: 4,
    name: "BCAA Recovery",
    category: "amino",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.7,
    reviews: 1567,
    image: "/images/hero-product.png",
    badge: null,
    description:
      "2:1:1 BCAA ratio for optimal muscle recovery and reduced soreness.",
    benefits: ["2:1:1 Ratio", "Fast Recovery", "Muscle Preservation"],
    flavors: ["Mango", "Lemon Lime", "Grape"],
    servings: 30,
  },
  {
    id: 5,
    name: "Mass Gainer",
    category: "protein",
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.6,
    reviews: 892,
    image: "/images/hero-product.png",
    badge: "Popular",
    description:
      "1250 calories and 50g protein per serving. Perfect for muscle building.",
    benefits: ["1250 Calories", "50g Protein", "Complex Carbs"],
    flavors: ["Chocolate", "Vanilla", "Cookies & Cream"],
    servings: 16,
  },
  {
    id: 6,
    name: "Metabolism Support",
    category: "fat-burner",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.5,
    reviews: 1234,
    image: "/images/hero-product.png",
    badge: null,
    description:
      "Natural formula to support healthy metabolism and energy levels.",
    benefits: ["Natural Ingredients", "Energy Support", "No Jitters"],
    flavors: ["Capsules"],
    servings: 60,
  },
  {
    id: 7,
    name: "Omega-3 Fish Oil",
    category: "vitamins",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 2156,
    image: "/images/hero-product.png",
    badge: null,
    description: "High-potency EPA/DHA for heart, brain, and joint health.",
    benefits: ["1000mg EPA/DHA", "Heart Health", "Joint Support"],
    flavors: ["Softgels"],
    servings: 90,
  },
  {
    id: 8,
    name: "Daily Multivitamin",
    category: "vitamins",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviews: 1789,
    image: "/images/hero-product.png",
    badge: null,
    description: "Complete vitamin & mineral complex for daily wellness.",
    benefits: ["25+ Vitamins", "Immune Support", "Energy Boost"],
    flavors: ["Tablets"],
    servings: 60,
  },
];

// Categories for filtering
export const categories = [
  { id: "all", name: "All Products" },
  { id: "protein", name: "Protein" },
  { id: "pre-workout", name: "Pre-Workout" },
  { id: "creatine", name: "Creatine" },
  { id: "amino", name: "Amino Acids" },
  { id: "fat-burner", name: "Wellness" },
  { id: "vitamins", name: "Vitamins" },
];

// Benefits for landing page
export const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    title: "Quality Guaranteed",
    description: "Lab tested & certified",
  },
  {
    title: "Fast Delivery",
    description: "2-3 business days",
  },
  {
    title: "Easy Returns",
    description: "30-day money back",
  },
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Mike Johnson",
    role: "Fitness Enthusiast",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80",
    content:
      "The quality of these supplements is outstanding. I've noticed real improvements in my energy and recovery.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Wellness Coach",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    content:
      "I recommend Vitality to all my clients. Clean ingredients and transparent labeling.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Chen",
    role: "Personal Trainer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    content:
      "Finally found a brand I can trust. Great products and excellent customer service.",
    rating: 5,
  },
];
