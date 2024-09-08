import { z } from "zod";

const CreateActivity = z.object({
    name: z.string(),
    posX: z.number(),
    posY: z.number(),
    posZ: z.number(),
    unityObjectId: z.number(),
    sessionId: z.number(),
});

export type CreateActivitySchema = z.infer<typeof CreateActivity>;

const UpdateActivity = z.object({
    name: z.string(),
    posX: z.number(),
    posY: z.number(),
    posZ: z.number(),
    unityObjectId: z.number(),
    sessionId: z.number(),
});

export type UpdateActivitySchema = z.infer<typeof UpdateActivity>;

export { CreateActivity, UpdateActivity };