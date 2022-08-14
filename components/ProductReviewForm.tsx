import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const schema = yup
  .object({
    email: yup.string().email("It is not a valid email").required("Email is required"),
    content: yup.string().required("Address is required"),
    headline: yup.string().required("City is required"),
    name: yup.string().required("Postcode is required"),
  })
  .required();

export type ProductReviewFormType = yup.InferType<typeof schema>;

interface ProductReviewFormProps {
  productSlug: string;
}

export const ProductReviewForm = ({ productSlug }: ProductReviewFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductReviewFormType>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => console.log(data);

  console.log(productSlug);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-10">
      {/* register your input into the hook by invoking the "register" function */}
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
        <div className="w-full mt-4">
          <FormInput
            label="name"
            type="name"
            placeholder="Your name"
            inputName="name"
            errors={errors}
            register={register}
          />
        </div>
        <div className="w-full mt-4">
          <FormInput
            label="headline"
            type="headline"
            placeholder="Headline"
            inputName="Headline"
            errors={errors}
            register={register}
          />
        </div>
        <div className="w-full mt-4">
          <label htmlFor="content" className="block mb-3 text-sm font-semibold text-gray-500">
            {" "}
            Review
          </label>
          <textarea
            {...register("content")}
            className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
            rows={4}
            placeholder="Your review"
          ></textarea>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">Add review</button>
      </div>
    </form>
  );
};
