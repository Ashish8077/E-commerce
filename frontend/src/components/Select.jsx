import React, { useId } from "react";

const Select = (
  { label = "", options = [], className = "", name = "", ...props },
  ref
) => {
  const id = useId();
  return (
    <div className="w-full gap-4">
      {label && <label htmlFor={id}>{label}</label>}{" "}
      <select
        className={`outline  outline-gray-400 p-2 rounded mt-1 ${className}`}
        name={name}
        id={id}
        ref={ref}
        {...props}>
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
