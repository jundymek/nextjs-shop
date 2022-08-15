import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "./FormInput";

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

  const onSubmit = handleSubmit((data) => {
    const response = fetch("http://localhost:3001/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });
    console.log(response);
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
