import { PrismaClient } from "@prisma/client";

export class UnityObjectRepository {
    private readonly prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(data: { name: string; type: string }) {
        return this.prismaClient.unityObject.create({ data });
    }

    async findAll() {
        return this.prismaClient.unityObject.findMany();
    }

    async findById(id: number) {
        return this.prismaClient.unityObject.findUnique({ where: { id } });
    }

    async update(id: number, data: { name?: string; type?: string }) {
        return this.prismaClient.unityObject.update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prismaClient.unityObject.delete({ where: { id } });
    }
}
