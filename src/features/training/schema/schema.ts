import { z } from "zod";

export const trainingSchema = z.object({
  name: z.string().min(3).max(35),
  exercises: z.array(
    z.object({
      name: z.string().min(3).max(35),
      sets: z.array(
        z.object({
          weight: z.number().positive(),
          reps: z.number().positive().int(),
        }),
      ),
    }),
  ),
});

export type TrainingSchema = z.infer<typeof trainingSchema>;
