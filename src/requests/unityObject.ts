import { z } from "zod";

const CreateUnityObject = z.object({
    name: z.string(),
    type: z.string(),
    posX: z.number(),
    posY: z.number(),
    posZ: z.number(),
});

export type CreateUnityObjectSchema = z.infer<typeof CreateUnityObject>;

const UpdateUnityObject = z.object({
    name: z.string(),
    type: z.string(),
    posX: z.number(),
    posY: z.number(),
    posZ: z.number(),
});

export type UpdateUnityObjectSchema = z.infer<typeof UpdateUnityObject>;

export { CreateUnityObject, UpdateUnityObject };