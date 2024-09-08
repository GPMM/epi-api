import { z } from "zod";

const CreateSession = z.object({
    code: z.string(),
    trainingId: z.number(),
});

export type CreateSessionSchema = z.infer<typeof CreateSession>;

const UpdateSession = z.object({
    code: z.string(),
    trainingId: z.number(),
});

export type UpdateSessionSchema = z.infer<typeof UpdateSession>;

export { CreateSession, UpdateSession };