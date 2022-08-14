import { HTMLInputTypeAttribute } from "react";
import { DeepRequired, FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { ChekoutFormType } from "./CheckoutForm";
import { ProductReviewFormType } from "./ProductReviewForm";

type Dupa = ChekoutFormType | ProductReviewFormType;

interface FormInputProps {
  label: keyof ChekoutFormType | keyof ProductReviewFormType;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  inputName: string;
  errors: FieldErrorsImpl<DeepRequired<ChekoutFormType>> & FieldErrorsImpl<DeepRequired<ProductReviewFormType>>;
  register: UseFormRegister<ChekoutFormType> | UseFormRegister<ProductReviewFormType>;
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
