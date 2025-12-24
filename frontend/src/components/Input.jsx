import React from 'react';

const Input = ({ label, type = 'text', id, placeholder, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className="w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block p-2.5 placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
