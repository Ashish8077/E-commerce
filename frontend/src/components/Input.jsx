import React, { useId } from "react";

const Input = (
  { label, type = "text", className = "", error, ...props },
  ref
) => {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500  ${className}`}
        ref={ref}
        {...props}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default React.forwardRef(Input);
