import { NextFunction, Request, Response } from 'express';
import { ActivityService } from "@/services/activity";
import { Controller } from "./controller";
import {
    CreateActivity,
    CreateActivitySchema,
    UpdateActivity,
    UpdateActivitySchema
} from "@/requests/activity";
import { HttpException } from "@/middlewares/errorHandler";

export class ActivityController extends Controller {
    private readonly activityService: ActivityService;

    constructor(activityService: ActivityService) {
        super();
        this.activityService = activityService;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CreateActivitySchema = req.body;
            const { success: isValid } = CreateActivity.safeParse(body);
            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const activity = await this.activityService.createActivity(body);
            res.status(201).json(activity);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.create.name);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const activities = await this.activityService.getAllActivities();
            res.status(200).json(activities);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.create.name);
        }
    }

    async findAllBySessionId(req: Request, res: Response, next: NextFunction) {
        try {
            const sessionId = parseInt(req.params.sessionId);
            if (!sessionId) {
                return next(new HttpException(422, "Invalid request parameters: Session ID is required"));
            }

            const activities = await this.activityService.getAllActivitiesBySessionID(sessionId);
            res.status(200).json(activities);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.create.name);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const activity = await this.activityService.getActivityById(id);
            if (!activity) {
                return next(new HttpException(404, "Activity not found"));
            }

            res.status(200).json(activity);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.create.name);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const existsActivity = await this.activityService.getActivityById(id);
            if (!existsActivity) {
                return next(new HttpException(404, "Activity not found"));
            }

            const body: UpdateActivitySchema = req.body;
            const { success: isValid } = UpdateActivity.safeParse(body);
            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const updatedActivity = await this.activityService.updateActivity(id, body);
            res.status(200).json(updatedActivity);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.create.name);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const existsActivity = await this.activityService.getActivityById(id);
            if (!existsActivity) {
                return next(new HttpException(404, "Activity not found"));
            }

            await this.activityService.deleteActivity(id);
            res.status(204).send();
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.create.name);
        }
    }
}
