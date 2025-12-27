import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "This protein powder transformed my recovery time. I'm seeing gains I never thought possible. Best investment in my fitness journey!",
    name: "Marcus Johnson",
    username: "@marcus_lifts",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The pre-workout gives me insane energy without the crash. I've crushed every PR since I started using it. Game changer!",
    name: "Sarah Chen",
    username: "@sarahfitness",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Finally found supplements that actually work. My strength has increased dramatically and I feel unstoppable in the gym!",
    name: "David Rodriguez",
    username: "@david_power",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "The creatine quality is unmatched. Clean ingredients, no bloating, just pure muscle fuel. My deadlift went up 50lbs!",
    name: "Emma Thompson",
    username: "@emma_strong",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "From skinny to strong in 6 months. These supplements combined with hard work changed my life. No looking back!",
    name: "James Wilson",
    username: "@jamesgains",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

const getVisibleCount = (width) => {
  if (width >= 1280) {
    return 3;
  }
  if (width >= 768) {
    return 2;
  }
  return 1;
};

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);

      const oldVisibleCount = getVisibleCount(windowWidth);
      const newVisibleCount = getVisibleCount(newWidth);

      if (oldVisibleCount !== newVisibleCount) {
        const maxIndexForNewWidth = testimonials.length - newVisibleCount;
        if (currentIndex > maxIndexForNewWidth) {
          setCurrentIndex(Math.max(0, maxIndexForNewWidth));
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth, currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying) {
      return;
    }

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        const visibleCount = getVisibleCount(windowWidth);
        const maxIndex = testimonials.length - visibleCount;

        setCurrentIndex((prev) => {
          if (prev >= maxIndex) {
            setDirection(-1);
            return prev - 1;
          } else if (prev <= 0) {
            setDirection(1);
            return prev + 1;
          } else {
            return prev + direction;
          }
        });
      }, 4000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, windowWidth, direction]);

  const visibleCount = getVisibleCount(windowWidth);
  const maxIndex = testimonials.length - visibleCount;
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const goNext = () => {
    if (canGoNext) {
      setDirection(1);
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      pauseAutoPlay();
    }
  };

  const goPrev = () => {
    if (canGoPrev) {
      setDirection(-1);
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      pauseAutoPlay();
    }
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleDragEnd = (event, info) => {
    const { offset } = info;
    const swipeThreshold = 30;

    if (offset.x < -swipeThreshold && canGoNext) {
      goNext();
    } else if (offset.x > swipeThreshold && canGoPrev) {
      goPrev();
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  return (
    <div className="px-4 py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block py-2 px-4 rounded-full bg-primary-50 text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl text-dark mt-4 px-4">
            What Our <span className="gradient-text">Warriors</span> Say
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4">
            Real results from real athletes who trust MuscleUp for their gains
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto mt-6"></div>
        </motion.div>

        <div className="relative" ref={containerRef}>
          {/* Navigation Buttons */}
          <div className="flex justify-center sm:justify-end sm:absolute sm:-top-16 right-0 space-x-2 mb-4 sm:mb-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goPrev}
              disabled={!canGoPrev}
              className={`p-3 rounded-full ${
                canGoPrev
                  ? "bg-white shadow-md hover:bg-gray-50 text-primary"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              } transition-all duration-300 border border-gray-200`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goNext}
              disabled={!canGoNext}
              className={`p-3 rounded-full ${
                canGoNext
                  ? "bg-white shadow-md hover:bg-gray-50 text-primary"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              } transition-all duration-300 border border-gray-200`}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Slider */}
          <div className="overflow-hidden relative px-2 sm:px-0">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 20,
              }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className={`flex-shrink-0 w-full ${
                    visibleCount === 3
                      ? "md:w-1/3"
                      : visibleCount === 2
                      ? "md:w-1/2"
                      : "w-full"
                  } p-3`}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98, cursor: "grabbing" }}
                  style={{ cursor: "grab" }}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full bg-gradient-to-br from-cream-light to-white border border-gray-100 shadow-lg"
                    whileHover={{
                      boxShadow:
                        "0 20px 40px -10px rgba(76, 175, 80, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Quote Icon */}
                    <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-green rounded-2xl flex items-center justify-center shadow-green opacity-90">
                      <Quote className="w-5 h-5 text-white" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col pt-6">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-accent fill-accent"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-sm sm:text-base text-gray-600 font-medium mb-6 leading-relaxed flex-grow">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <div className="relative flex-shrink-0">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover ring-4 ring-primary-50"
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face";
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-full bg-primary/20"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0, 0.3, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-heading text-lg text-dark">
                              {testimonial.name}
                            </h4>
                            <p className="text-gray-500 text-sm">
                              {testimonial.username}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8">
            {Array.from(
              { length: testimonials.length - visibleCount + 1 },
              (_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative mx-1.5 focus:outline-none"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <motion.div
                    className={`w-2.5 h-2.5 rounded-full ${
                      index === currentIndex ? "bg-primary" : "bg-gray-300"
                    }`}
                    animate={{
                      scale: index === currentIndex ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: index === currentIndex ? Infinity : 0,
                      repeatDelay: 1,
                    }}
                  />
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30"
                      animate={{
                        scale: [1, 2],
                        opacity: [1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.button>
              )
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "50K+", label: "Happy Athletes", color: "text-primary" },
            { value: "100+", label: "Products", color: "text-accent" },
            { value: "4.9", label: "Average Rating", color: "text-primary" },
            { value: "24/7", label: "Support", color: "text-accent" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p
                className={`font-heading text-4xl md:text-5xl ${stat.color} mb-2 group-hover:scale-110 transition-transform`}
              >
                {stat.value}
              </p>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
