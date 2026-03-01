import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  width?: string;
  inputStyle?: string;
  sectionStyle?: string;
}

export const Input: React.FC<IInputProps> = ({
  label,
  error,
  helpText,
  type,
  ...props
}) => {
  return (
    <div className={`flex flex-col ${props.sectionStyle}`}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input
        {...props}
        className={`w-full px-4 py-2 border rounded-md 
                    focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-blue-500
                    transition duration-200 
                    ${props.inputStyle}`}
      />
      {helpText && <small className="text-gray-500">{helpText}</small>}
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

interface IInputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  width?: string;
  inputStyle?: string;
  sectionStyle?: string;
}

export const InputNumber: React.FC<IInputNumberProps> = ({
  label,
  error,
  helpText,
  ...props
}) => {
  return (
    <div className={`flex flex-col ${props.sectionStyle}`}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input
        {...props}
        className={`w-full px-4 py-2 border rounded-md 
                    focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-blue-500
                    transition duration-200 
                    ${props.inputStyle}`}
                    type="number"
      />
      {helpText && <small className="text-gray-500">{helpText}</small>}
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};


