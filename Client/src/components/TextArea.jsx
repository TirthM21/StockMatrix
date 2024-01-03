import React from "react";

const TextArea = ({ label, value, handleChange, placeholderText, disabled }) => {
  return (
    <>
      <div>
        <label
          for={label}
          className='block text-sm text-gray-500'
        >
          {label}
        </label>

        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholderText}
          className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
          disabled={disabled}
        ></textarea>
      </div>
    </>
  );
};

export default TextArea;
