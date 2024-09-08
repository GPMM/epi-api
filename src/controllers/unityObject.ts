import { NextFunction, Request, Response } from 'express';
import { UnityObjectService } from '@/services/unityObject';
import { Controller } from "./controller";
import {
    CreateUnityObject,
    CreateUnityObjectSchema,
    UpdateUnityObject,
    UpdateUnityObjectSchema
} from "@/requests/unityObject";
import { HttpException } from "@/middlewares/errorHandler";

export class UnityObjectController extends Controller {
    private readonly unityObjectService: UnityObjectService;

    constructor(unityObjectService: UnityObjectService) {
        super();
        this.unityObjectService = unityObjectService;
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CreateUnityObjectSchema = req.body;
            const { success: isValid } = CreateUnityObject.safeParse(body);
            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const unityObject = await this.unityObjectService.createUnityObject(body);
            return res.status(201).json(unityObject);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.create.name);
        }

    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const unityObjects = await this.unityObjectService.getAllUnityObjects();
            return res.status(200).json(unityObjects);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.findAll.name);
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const unityObject = await this.unityObjectService.getUnityObjectById(id);
            if (!unityObject) {
                return next(new HttpException(404, "Unity Object not found"));
            }

            return res.status(200).json(unityObject);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.findById.name);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const existsUnityObject = await this.unityObjectService.getUnityObjectById(id);
            if (!existsUnityObject) {
                return next(new HttpException(404, "Unity Object not found"));
            }

            const body: UpdateUnityObjectSchema = req.body;
            const { success: isValid } = UpdateUnityObject.safeParse(body);
            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const updatedUnityObject = await this.unityObjectService.updateUnityObject(id, body);
            return res.status(200).json(updatedUnityObject);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.update.name);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const existsUnityObject = await this.unityObjectService.getUnityObjectById(id);
            if (!existsUnityObject) {
                return next(new HttpException(404, "Unity Object not found"));
            }

            await this.unityObjectService.deleteUnityObject(id);
            return res.status(204).send();
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.delete.name);
        }
    }
}
