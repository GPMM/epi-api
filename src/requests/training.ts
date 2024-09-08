import { z } from "zod";

const CreateTraining = z.object({
    name: z.string(),
    description: z.string(),
    unityObjectIds: z.array(z.number()),
});

export type CreateTrainingSchema = z.infer<typeof CreateTraining>;

const UpdateTraining = z.object({
    name: z.string(),
    description: z.string(),
    unityObjectIds: z.array(z.number()),
});

export type UpdateTrainingSchema = z.infer<typeof UpdateTraining>;

export { CreateTraining, UpdateTraining };