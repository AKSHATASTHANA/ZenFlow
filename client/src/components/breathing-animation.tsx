import { cn } from "@/lib/utils";

interface BreathingAnimationProps {
  isActive: boolean;
  pattern?: string;
  className?: string;
  delay?: number;
}

export default function BreathingAnimation({
  isActive,
  pattern = "4-7-8",
  className,
  delay = 0,
}: BreathingAnimationProps) {
  const getAnimationClass = () => {
    if (!isActive) return "";
    
    switch (pattern) {
      case "4-4-4-4":
        return "breathe-4-4-4-4";
      case "6-2-6-2":
        return "breathe-6-2-6-2";
      default:
        return "breathe-4-7-8";
    }
  };

  return (
    <div
      className={cn(
        "w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto transition-all duration-300",
        isActive && getAnimationClass(),
        className
      )}
      style={{
        animationDelay: delay ? `${delay}s` : undefined,
      }}
    />
  );
}
