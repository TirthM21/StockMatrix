import React from "react";

const Input = ({
  type,
  labelName,
  inpName,
  placeholder,
  value,
  handleValue,
  handleFocus,
  disabled,
}) => {
  return (
    <>
      <>
        <label for="email" className="block text-sm text-gray-500">
          {labelName}
        </label>

        <input
          type={type}
          placeholder={placeholder}
          className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          name={inpName}
          id={inpName}
          value={value}
          onChange={(e) => handleValue(e.target.value)}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          disabled={disabled}
        />
      </>
    </>
  );
};

export default Input;
