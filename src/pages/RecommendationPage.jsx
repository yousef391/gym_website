import { useState, useMemo } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Target,
  Dumbbell,
  Moon,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/common/ProductCard";

const questions = [
  {
    id: 1,
    question: "What's your primary fitness goal?",
    icon: Target,
    options: [
      { id: "muscle", label: "Build Muscle", icon: "💪" },
      { id: "weight", label: "Lose Weight", icon: "🔥" },
      { id: "energy", label: "More Energy", icon: "⚡" },
      { id: "health", label: "Overall Health", icon: "❤️" },
    ],
  },
  {
    id: 2,
    question: "How often do you workout?",
    icon: Dumbbell,
    options: [
      { id: "daily", label: "Daily", icon: "🏆" },
      { id: "often", label: "4-5x/week", icon: "💯" },
      { id: "moderate", label: "2-3x/week", icon: "👍" },
      { id: "occasional", label: "Occasionally", icon: "🌱" },
    ],
  },
  {
    id: 3,
    question: "When do you prefer to workout?",
    icon: Moon,
    options: [
      { id: "morning", label: "Morning", icon: "🌅" },
      { id: "afternoon", label: "Afternoon", icon: "☀️" },
      { id: "evening", label: "Evening", icon: "🌙" },
      { id: "varies", label: "It Varies", icon: "🔄" },
    ],
  },
];

// Default category mappings for goals
const defaultGoalCategories = {
  muscle: ["protein", "creatine"],
  weight: ["fat-burner", "pre-workout"],
  energy: ["pre-workout", "vitamins"],
  health: ["vitamins", "amino"],
};

const RecommendationPage = () => {
  const { products, categories, store, loading: storeLoading } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAnswer = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => {
        setShowResults(true);
        saveRecommendation(optionId);
      }, 300);
    }
  };

  const saveRecommendation = async (lastAnswer) => {
    if (!store) return;

    setSaving(true);
    try {
      const recommendations = getRecommendations({ ...answers, 1: answers[1] || lastAnswer });
      
      await supabase.from("user_recommendations").insert({
        store_id: store.id,
        session_id: `session_${Date.now()}`,
        answers: answers,
        recommended_product_ids: recommendations.map((p) => p.id),
      });
    } catch (err) {
      console.error("Error saving recommendation:", err);
    } finally {
      setSaving(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  // Get recommended products based on answers and available products
  const getRecommendations = (currentAnswers = answers) => {
    const goal = currentAnswers[1];
    
    // Get category slugs for the selected goal
    const targetCategories = defaultGoalCategories[goal] || defaultGoalCategories.health;
    
    // Filter products by category slug
    const recommended = products.filter((p) => {
      const categorySlug = p.categories?.slug || "";
      return targetCategories.some((cat) => 
        categorySlug.toLowerCase().includes(cat.toLowerCase())
      );
    });

    // If no matches, return highest rated products
    if (recommended.length === 0) {
      return products
        .slice()
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 4);
    }

    return recommended.slice(0, 4);
  };

  if (storeLoading) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-theme-primary" />
      </div>
    );
  }

  if (showResults) {
    const recommendations = getRecommendations();

    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 gradient-theme rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl text-dark mb-4">
              Your Personalized{" "}
              <span className="gradient-theme-text">Recommendations</span>
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Based on your goals and lifestyle, here are the supplements we
              recommend for you.
            </p>
          </div>

          {/* Recommended Products */}
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {recommendations.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    ...product,
                    category: product.categories?.slug || product.category_id,
                    rating: product.rating || 4.5,
                    reviews: product.reviews_count || 0,
                    image: product.image_url || "/images/hero-product.png",
                  }} 
                  index={index} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-12">
              <p className="text-gray-500">
                No products available yet. Check back soon!
              </p>
            </div>
          )}

          {/* Retake Quiz */}
          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="inline-flex items-center px-8 py-4 bg-white text-theme-primary font-heading rounded-full border-2 border-theme-primary hover:bg-primary-50 transition-colors"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div 
      className="min-h-screen pt-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5F1E8 0%, color-mix(in srgb, var(--primary-color, #4CAF50) 15%, #F5F1E8) 50%, #F5F1E8 100%)' }}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-theme-primary-light blob opacity-30" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent-50 blob-2 opacity-20" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-theme-primary font-medium">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-gray-500">
              {Math.round(((currentStep + 1) / questions.length) * 100)}%
              complete
            </span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full gradient-theme transition-all duration-500"
              style={{
                width: `${((currentStep + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card-hover">
          <div className="text-center mb-10">
            <div className="w-16 h-16 gradient-theme rounded-2xl flex items-center justify-center mx-auto mb-6">
              <currentQuestion.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-dark">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(currentQuestion.id, option.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover-lift text-left ${
                  answers[currentQuestion.id] === option.id
                    ? "border-theme-primary bg-primary-50"
                    : "border-gray-200 hover:border-primary-200 bg-white"
                }`}
              >
                <span className="text-3xl mb-3 block">{option.icon}</span>
                <span className="font-heading text-dark">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="mt-8 inline-flex items-center text-gray-500 hover:text-theme-primary transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Previous question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
