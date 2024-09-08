import { PrismaClient } from "@prisma/client";

export class SessionRepository {
    private readonly prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(data: { code: string; trainingId: number }) {
        return this.prismaClient.session.create({ data });
    }

    async findAll() {
        return this.prismaClient.session.findMany({
            include: { training: true },
        });
    }

    async findById(id: number) {
        return this.prismaClient.session.findUnique({
            where: { id },
            include: { training: true },
        });
    }

    async findByCode(code: string) {
        return this.prismaClient.session.findUnique({
            where: { code },
            include: {
                training: {
                    include: { unityObjects: true },
                },
            },
        });
    }

    async update(id: number, data: { code?: string; trainingId?: number }) {
        return this.prismaClient.session.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return this.prismaClient.session.delete({
            where: { id },
        });
    }
}
