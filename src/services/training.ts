import { TrainingRepository } from "@/repositories/training";
import { CreateTrainingSchema, UpdateTrainingSchema } from "@/requests/training";

export class TrainingService {
    private readonly trainingRepository: TrainingRepository;

    constructor(activityRepository: TrainingRepository) {
        this.trainingRepository = activityRepository;
    }

    async createTraining(data: CreateTrainingSchema) {
        return this.trainingRepository.create(data);
    }

    async getAllTrainings() {
        return this.trainingRepository.findAll();
    }

    async getTrainingById(id: number) {
        return this.trainingRepository.findById(id);
    }

    async updateTraining(id: number, data: UpdateTrainingSchema) {
        return this.trainingRepository.update(id, data);
    }

    async deleteTraining(id: number) {
        return this.trainingRepository.delete(id);
    }
}
