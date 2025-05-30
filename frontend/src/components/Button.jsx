import React from "react";

const Button = (
  { type = "submit", className = "", children, ...props },
  ref
) => {
  return (
    <button
      type={type}
      className={`w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition cursor-pointer ${className}`}
      ref={ref}>
      {children}
    </button>
  );
};

export default React.forwardRef(Button);


