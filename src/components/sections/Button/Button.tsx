import React, { useEffect } from "react";

interface ButtonProps {
  className?: string;
  content: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  className = '', 
  content, 
  variant = 'primary',
  onClick,
  type = 'button'
}) => {
  const baseStyles = "flex items-center justify-center px-6 py-1.5 rounded-[100px] transition-colors duration-200 font-[garamond]";
  const variantStyles = {
    primary: "bg-button-primary border-2 border-solid border-[#212529] text-button-text hover:bg-button-hover",
    secondary: "bg-button-secondary border-2 border-solid border-button-border text-button-text hover:bg-button-hover"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <span className="font-medium text-sm">
        {content}
      </span>
    </button>
  );
};