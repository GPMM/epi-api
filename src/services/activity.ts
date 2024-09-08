import { ActivityRepository } from "@/repositories/activity";
import { CreateActivitySchema, UpdateActivitySchema } from "@/requests/activity";

export class ActivityService {
    private readonly activityRepository: ActivityRepository;

    constructor(activityRepository: ActivityRepository) {
        this.activityRepository = activityRepository;
    }

    async createActivity(data: CreateActivitySchema) {
        return this.activityRepository.create(data);
    }

    async getAllActivities() {
        return this.activityRepository.findAll();
    }

    async getAllActivitiesBySessionID(sessionId: number) {
        return this.activityRepository.findBySessionId(sessionId);
    }

    async getActivityById(id: number) {
        return this.activityRepository.findById(id);
    }

    async updateActivity(id: number, data: UpdateActivitySchema) {
        return this.activityRepository.update(id, data);
    }

    async deleteActivity(id: number) {
        return this.activityRepository.delete(id);
    }
}
