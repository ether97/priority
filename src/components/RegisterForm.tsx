import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const RegisterFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
// extracting the type
type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const registerUser = api.user.registerUser.useMutation({
    onSuccess: () => {
      console.log("success!");
    },
  });

  const onSubmit: SubmitHandler<RegisterFormSchemaType> = (data) => {
    console.log(data);
    registerUser.mutate({
      ...data,
    });
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name")} />
      <input type="text" {...register("email")} />
      <input type="text" {...register("password")} />

      <button type="submit">Add Register</button>
    </form>
  );
};

export default RegisterForm;
