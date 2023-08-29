import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: string;
}

const CustomInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error = 'error'
}: Props) => {
  return (
    <div className="mb-4 flex flex-col items-start">
      <label
        className="blocktext-sm font-bold mb-1"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500"
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="block italic text-red-500">{error}</span>}
    </div>
  );
};

export default CustomInput;
