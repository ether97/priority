import { useSession } from "next-auth/react";
import { api, type RouterOutputs } from "../utils/api";

const Deadlines: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: deadlines, refetch: refetchDeadlines } =
    api.deadline.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        console.log(data);
      },
    });

  return (
    <div>
      {deadlines?.map((deadline) => {
        return (
          <div key={deadline.id}>
            <h1 className="text-bold text-[50px]">{deadline.title}</h1>
            <p>{deadline.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Deadlines;
