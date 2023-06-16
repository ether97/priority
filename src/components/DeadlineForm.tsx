import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const deadlineFormSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
});
// extracting the type
type DeadlineFormSchemaType = z.infer<typeof deadlineFormSchema>;

const DeadlineForm: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: deadlines, refetch: refetchDeadlines } =
    api.deadline.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        console.log(data);
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeadlineFormSchemaType>({
    resolver: zodResolver(deadlineFormSchema),
  });

  const addReminder = api.deadline.addReminder.useMutation({
    onSuccess: () => {
      void refetchDeadlines();
    },
  });

  const onSubmit: SubmitHandler<DeadlineFormSchemaType> = (data) => {
    console.log(data);
    addReminder.mutate({
      ...data,
    });
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("title")} />
      <input type="text" {...register("description")} />
      <input type="date" {...register("date")} />
      <select {...register("priority")}>
        <option value="HIGH">HIGH</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="LOW">LOW</option>
      </select>
      <button type="submit">Add Deadline</button>
    </form>
  );
};

export default DeadlineForm;
