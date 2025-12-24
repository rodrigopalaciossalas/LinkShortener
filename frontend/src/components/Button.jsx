import React from 'react';

const Button = ({ children, type = 'button', onClick, variant = 'primary', className = '' }) => {
  const baseStyles = "w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200";
  
  const variants = {
    primary: "text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 focus:ring-violet-800 shadow-lg shadow-violet-500/20",
    secondary: "text-white bg-slate-700 hover:bg-slate-600 focus:ring-slate-700 border border-slate-600",
    outline: "text-gray-300 bg-transparent border border-gray-500 hover:border-gray-300 hover:text-white focus:ring-gray-700"
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
