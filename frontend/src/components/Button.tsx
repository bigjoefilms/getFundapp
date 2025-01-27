import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  type = "submit",
  className = "",
  loading = false,
  onClick,
  children
}) => {
  return (
    <button
      type={type}
      className={`bg-black text-white py-2 px-3 rounded-lg font-semibold text-[15px] relative hover:opacity-85 ${className}`}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? <div className="loader"></div> : children}
    </button>
  );
};

export default Button;