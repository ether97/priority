import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { deadlineRouter } from "./routers/deadline";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  deadline: deadlineRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
