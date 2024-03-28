import React from "react";

const SelectCategory = React.forwardRef(function SelectCategory(
  { options, defaultValue = null, className, ...props },
  ref
) {
  return (
    <select
      {...props}
      defaultValue={defaultValue}
      className={`border py-3 px-2 rounded-lg outline-none transition-all focus:ring-2 focus:ring-primary ${className}`}
      ref={ref}
    >
      {defaultValue && (
        <option value={defaultValue} disabled>
          {defaultValue}
        </option>
      )}

      {options.map((option) => (
        <option key={option._id} value={JSON.stringify(option)}>
          {option.category}
        </option>
      ))}
    </select>
  );
});

export default SelectCategory;
