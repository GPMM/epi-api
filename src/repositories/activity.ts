import { PrismaClient } from "@prisma/client";

export class ActivityRepository {
    private readonly prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(data: { unityObjectId: number; posX: number; posY: number; posZ: number; sessionId: number }) {
        return this.prismaClient.activity.create({ data, include: { unityObject: true, session: true } });
    }

    async findAll() {
        return this.prismaClient.activity.findMany();
    }

    async findById(id: number) {
        return this.prismaClient.activity.findUnique({ where: { id } });
    }

    async findBySessionId(sessionId: number) {
        return this.prismaClient.activity.findMany({ where: { sessionId } });
    }

    async update(id: number, data: { unityObjectId?: number; posX?: number; posY?: number; posZ?: number; sessionId?: number }) {
        return this.prismaClient.activity.update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prismaClient.activity.delete({ where: { id } });
    }
}
