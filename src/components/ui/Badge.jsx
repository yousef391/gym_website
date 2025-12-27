import { cn } from "../../lib/utils";

const badgeVariants = {
  default: "border-transparent bg-primary text-white hover:bg-primary/80",
  secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline: "text-dark border-gray-300",
  accent: "border-transparent bg-gradient-orange text-white",
  success: "border-transparent bg-gradient-green text-white",
};

function Badge({ className, variant = "default", children, ...props }) {
  const variantClasses = badgeVariants[variant] || badgeVariants.default;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-300",
        variantClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
