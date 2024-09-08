import { NextFunction, Request, Response } from 'express';
import { Controller } from "./controller";
import { TrainingService } from "@/services/training";
import {
    CreateTraining,
    CreateTrainingSchema,
    UpdateTraining,
    UpdateTrainingSchema
} from "@/requests/training";
import { HttpException } from "@/middlewares/errorHandler";

export class TrainingController extends Controller {
    private readonly trainingService: TrainingService;

    constructor(trainingService: TrainingService) {
        super();
        this.trainingService = trainingService;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CreateTrainingSchema = req.body;
            const { success: isValid } = CreateTraining.safeParse(body);
            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const training = await this.trainingService.createTraining(body);
            res.status(201).json(training);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.create.name)
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const trainings = await this.trainingService.getAllTrainings();
            res.status(200).json(trainings);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.findAll.name)
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const training = await this.trainingService.getTrainingById(id);
            if (!training) {
                return next(new HttpException(404, "Training not found"));
            }

            res.status(200).json(training);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.findById.name)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const existsTraining = await this.trainingService.getTrainingById(id);
            if (!existsTraining) {
                return next(new HttpException(404, "Training not found"));
            }

            const body: UpdateTrainingSchema = req.body;
            const { success: isValid } = UpdateTraining.safeParse(body);
            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const updatedTraining = await this.trainingService.updateTraining(id, body);
            res.status(200).json(updatedTraining);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.update.name)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const existsTraining = await this.trainingService.getTrainingById(id);
            if (!existsTraining) {
                return next(new HttpException(404, "Training not found"));
            }

            await this.trainingService.deleteTraining(id);
            res.status(204).send();
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.delete.name)
        }
    }
}
