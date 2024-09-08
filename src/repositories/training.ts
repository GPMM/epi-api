import { PrismaClient } from "@prisma/client";
import { CreateTrainingSchema, UpdateTrainingSchema } from "@/requests/training";

export class TrainingRepository {
    private readonly prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(data: CreateTrainingSchema) {
        return this.prismaClient.training.create({
            data: {
                name: data.name,
                description: data.description,
                unityObjects: {
                    connect: data.unityObjectIds.map((id) => ({ id })),
                },
            },
            include: { unityObjects: true },
        });
    }

    async findAll() {
        return this.prismaClient.training.findMany({
            include: { unityObjects: true },
        });
    }

    async findById(id: number) {
        return this.prismaClient.training.findUnique({
            where: { id },
            include: { unityObjects: true },
        });
    }

    async update(id: number, data: UpdateTrainingSchema) {
        return this.prismaClient.training.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                unityObjects: {
                    set: data.unityObjectIds?.map((id) => ({ id })) || [],
                },
            },
            include: { unityObjects: true },
        });
    }

    async delete(id: number) {
        return this.prismaClient.training.delete({
            where: { id },
        });
    }
}
