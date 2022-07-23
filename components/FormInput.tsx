import { HTMLInputTypeAttribute } from "react";
import { DeepRequired, FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { ChekoutFormType } from "./CheckoutForm";

interface FormInputProps {
  label: keyof ChekoutFormType;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  inputName: string;
  errors: FieldErrorsImpl<DeepRequired<ChekoutFormType>>;
  register: UseFormRegister<ChekoutFormType>;
}

export const FormInput = ({ label, type, placeholder, inputName, errors, register }: FormInputProps) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={label} className="block mb-3 text-sm font-semibold text-gray-500">
        {inputName}
      </label>
      <input
        {...register(`${label}`)}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
      />
      <span role="alert" className="text-red-500 text-xs">
        {errors[label]?.message}
      </span>
    </div>
  );
};
