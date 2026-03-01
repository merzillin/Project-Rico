import React from "react";

interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<IButtonProps> = ({
  label,
  className = "",
  type = "submit",
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={`px-4 py-2 rounded-md 
                  bg-blue-600 text-white 
                  hover:bg-blue-700 
                  transition duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${className}`}
    >
      {label}
    </button>
  );
};