import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "./FormInput";
import { useMutation } from "react-query";

export const schema = yup
  .object({
    email: yup.string().email("It is not a valid email").required("Email is required"),
  })
  .required();

export type NewsletterFormType = yup.InferType<typeof schema>;

export const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewsletterFormType>({
    resolver: yupResolver(schema),
  });

  const useAddtoNewsletterMutation = () =>
    useMutation(async (email: string) => {
      const response = await fetch("http://localhost:3001/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      return response.json();
    });

  const { mutate } = useAddtoNewsletterMutation();

  const onSubmit = handleSubmit((data) => {
    mutate(data.email);
  });
  return (
    <form className="justify-center w-full mx-auto" method="post" onSubmit={onSubmit}>
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
    </form>
  );
};
