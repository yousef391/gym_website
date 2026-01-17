import { Star, Quote } from "lucide-react";
import { testimonials } from "../../data/products";

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-100 blob opacity-20 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-50 blob-2 opacity-15 -translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-50 text-theme-primary font-medium rounded-full text-sm mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-dark mb-4">
            What Our <span className="gradient-theme-text">Customers</span> Say
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have improved their
            fitness journey
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-gradient-to-br from-cream-light to-white rounded-3xl p-8 hover:shadow-card-hover transition-all duration-500 group hover-lift"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 gradient-theme rounded-2xl flex items-center justify-center shadow-theme">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-primary-50"
                />
                <div>
                  <p className="font-heading text-dark">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "50K+", label: "Happy Customers", color: "text-theme-primary" },
            { value: "100+", label: "Products", color: "text-accent" },
            { value: "4.9", label: "Average Rating", color: "text-theme-primary" },
            { value: "24/7", label: "Support", color: "text-accent" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <p
                className={`font-heading text-4xl md:text-5xl ${stat.color} mb-2 group-hover:scale-110 transition-transform`}
              >
                {stat.value}
              </p>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
