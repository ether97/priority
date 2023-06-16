import { string, z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const deadlineRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return ctx.prisma.deadline.findMany({
      where: {
        userId: "648cc3bdfbc0030d6d9b463b",
      },
    });
  }),
  addReminder: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deadline.create({
        data: {
          userId: "648cc3bdfbc0030d6d9b463b",
          ...input,
        },
      });
    }),
  deleteReminder: protectedProcedure
    .input(z.object({ id: string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deadline.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
