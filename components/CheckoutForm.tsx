import { format } from "path";
import React, { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "./FormInput";
import { setLocale } from "yup";

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: "field_invalid",
  },
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min }) => ({ key: "field_too_short", values: { min } }),
    max: ({ max }) => ({ key: "field_too_big", values: { max } }),
  },
});

export const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("It is not a valid email").required("Email is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    postcode: yup.string().required("Postcode is required"),
    note: yup.string(),
    saveForLater: yup.string(),
  })
  .required();

export type ChekoutFormType = yup.InferType<typeof schema>;

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChekoutFormType>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log("xx");
    console.log(data, errors);
  });
  return (
    <div className="mx-auto">
      <div className="mt-20">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
          Tailwind CSS Ecommerce Checkout Page UI
        </h1>
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">Shipping Address</h2>
            <form className="justify-center w-full mx-auto" method="post" onSubmit={onSubmit}>
              <div className="">
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <FormInput
                      label="firstName"
                      type="text"
                      placeholder="First Name"
                      inputName="First Name"
                      errors={errors}
                      register={register}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <FormInput
                      label="lastName"
                      type="text"
                      placeholder="Last Name"
                      inputName="Last Name"
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <FormInput
                      label="email"
                      type="email"
                      placeholder="Email"
                      inputName="Email"
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <FormInput
                      label="address"
                      type="text"
                      placeholder="Address"
                      inputName="Address"
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <FormInput
                      label="city"
                      type="text"
                      placeholder="City"
                      inputName="City"
                      errors={errors}
                      register={register}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <FormInput
                      label="postcode"
                      type="text"
                      placeholder="Post Code"
                      inputName="Post Code"
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <label className="flex items-center text-sm group text-heading">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                      {...register("saveForLater")}
                    />
                    <span className="ml-2">Save this information for next time</span>
                  </label>
                </div>
                <div className="relative pt-3 xl:pt-6">
                  <label htmlFor="note" className="block mb-3 text-sm font-semibold text-gray-500">
                    {" "}
                    Notes (Optional)
                  </label>
                  <textarea
                    {...register("note")}
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    rows={4}
                    placeholder="Notes for delivery"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">Process</button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-4">
                    <div>
                      <img src="https://source.unsplash.com/user/erondu/1600x900" alt="image" className="w-60" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Title</h2>
                      <p className="text-sm">Lorem ipsum dolor sit amet, tet</p>
                      <span className="text-red-600">Price</span> $20
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div>
                      <img src="https://source.unsplash.com/collection/190727/1600x900" alt="image" className="w-60" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Title</h2>
                      <p className="text-sm">Lorem ipsum dolor sit amet, tet</p>
                      <span className="text-red-600">Price</span> $20
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">ITEMS 2</h2>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Subtotal<span className="ml-2">$40.00</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Shipping Tax<span className="ml-2">$10</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total<span className="ml-2">$50.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
