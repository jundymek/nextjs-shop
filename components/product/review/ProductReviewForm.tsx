import { useForm } from "react-hook-form";
import { FormInput } from "../../FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  GetProductReviewsBySlugDocument,
  GetProductReviewsBySlugQuery,
  useCreateProductReviewMutation,
} from "generated/graphql";

export const schema = yup
  .object({
    email: yup.string().email("It is not a valid email").required("Email is required"),
    content: yup.string().required("Content is required").min(5, "Content must be at least 5 characters"),
    headline: yup.string().required("Headline is required"),
    name: yup.string().required("Your name is required"),
    rating: yup.number().required("Rating is required"),
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
  const [createReview, createReviewResult] = useCreateProductReviewMutation({
    refetchQueries: [{ query: GetProductReviewsBySlugDocument, variables: { slug: productSlug } }],
  });
  const onSubmit = (data: ProductReviewFormType) => {
    console.log(data);
    createReview({
      variables: {
        review: {
          content: data.content,
          email: data.email,
          headline: data.headline,
          name: data.name,
          rating: data.rating,
          product: {
            connect: {
              slug: productSlug,
            },
          },
        },
      },
    });
  };

  console.log(productSlug);

  return (
    <section className="w-full mt-4 border-t py-4 bg-slate-100">
      <h3 className="px-10 mb-4 text-xl font-bold">Add your review</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-10 ">
        {/* register your input into the hook by invoking the "register" function */}
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
          <span role="alert" className="text-red-500 text-xs">
            {errors["content"]?.message}
          </span>
        </div>
        <div className="w-full mt-4">
          <label className="block mb-3 text-sm font-semibold text-gray-500" htmlFor="rating">
            Rating
          </label>
          <select
            id="rating"
            className="block w-36 px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            {...register("rating")}
          >
            <option value="">Select rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <span role="alert" className="text-red-500 text-xs">
            {errors["rating"]?.message}
          </span>
        </div>

        <div className="mt-4">
          <button className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">Add review</button>
        </div>
      </form>
    </section>
  );
};
