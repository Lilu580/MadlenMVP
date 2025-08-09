import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`
          ${sizeClasses[size]}
          border-4
          border-gray-200
          border-t-primary
          rounded-full
          animate-spin
          ${className}
        `}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};
