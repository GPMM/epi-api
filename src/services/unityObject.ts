import { UnityObjectRepository } from "@/repositories/unityObject";
import { CreateUnityObjectSchema, UpdateUnityObjectSchema } from "@/requests/unityObject";

export class UnityObjectService {
    private readonly unityObjectRepository: UnityObjectRepository;

    constructor(unityObjectRepository: UnityObjectRepository) {
        this.unityObjectRepository = unityObjectRepository;
    }

    async createUnityObject(data: CreateUnityObjectSchema) {
        return this.unityObjectRepository.create(data);
    }

    async getAllUnityObjects() {
        return this.unityObjectRepository.findAll();
    }

    async getUnityObjectById(id: number) {
        return this.unityObjectRepository.findById(id);
    }

    async updateUnityObject(id: number, data: UpdateUnityObjectSchema) {
        return this.unityObjectRepository.update(id, data);
    }

    async deleteUnityObject(id: number) {
        return this.unityObjectRepository.delete(id);
    }
}
