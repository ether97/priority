import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import bcrypt, { hash } from "bcrypt";

export const userRouter = createTRPCRouter({
  registerUser: protectedProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(({ ctx, input }) => {
      // If this query fails, it means a user already exists
      // Any other fails would be validation which is handled on the frontend
      ctx.prisma.user
        .findUnique({
          where: {
            email: input.email,
          },
        })
        .catch((e) => {
          if (e) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "User already exists!",
            });
          }
        });
      if (ctx.session.user.email === input.email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Already registered and logged in!",
        });
      }
      return ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),
});
