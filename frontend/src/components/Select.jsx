import React, { useId } from "react";

const Select = (
  { label = "", options = [], className = "", name = "", option, ...props },
  ref
) => {
  const id = useId();
  return (
    <div className="w-full gap-4 ">
      {label && <label htmlFor={id}>{label}</label>}{" "}
      <select
        className={`border border-gray-300shadow-md p-2 rounded mt-1 outline-none focus:ring-indigo-500 focus:border-indigo-500 outline-indigo-500 ${className}`}
        name={name}
        id={id}
        ref={ref}
        {...props}>
        <option value="">{option}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
