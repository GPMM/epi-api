import { NextFunction, Request, Response } from 'express';
import { SessionService } from '@/services/session';
import { Controller } from "./controller";
import {
    CreateSession,
    CreateSessionSchema,
    UpdateSession,
    UpdateSessionSchema
} from "@/requests/session";
import { HttpException } from "@/middlewares/errorHandler";

export class SessionController extends Controller {
    private readonly sessionService: SessionService;

    constructor(sessionService: SessionService) {
        super();
        this.sessionService = sessionService;
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CreateSessionSchema = req.body;
            const { success: isValid } = CreateSession.safeParse(body);
            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const existsCode = await this.sessionService.getSessionByCode(body.code);
            if (existsCode) {
                return next(new HttpException(404, "Session already exists"));
            }

            const session = await this.sessionService.createSession(body);
            res.status(201).json(session);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.create.name);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const sessions = await this.sessionService.getAllSessions();
            res.status(200).json(sessions);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.findAll.name);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const session = await this.sessionService.getSessionById(id);
            if (!session) {
                return next(new HttpException(404, "Session not found"));
            }

            res.status(200).json(session);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.findById.name);
        }
    }

    async findByCode(req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = req.params;
            if (!code) {
                return next(new HttpException(422, "Invalid request parameters: Code is required"));
            }

            const session = await this.sessionService.getSessionByCode(code);
            if (!session) {
                return next(new HttpException(404, "Session not found"));
            }

            res.status(200).json(session);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.findByCode.name);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const existsSession = await this.sessionService.getSessionById(id);
            if (!existsSession) {
                return next(new HttpException(404, "Session not found"));
            }

            const body: UpdateSessionSchema = req.body;
            const { success: isValid } = UpdateSession.safeParse(body);
            if (!isValid) {
                return next(new HttpException(422, "Invalid request body"));
            }

            const existsCode = await this.sessionService.getSessionByCode(body.code);
            if (existsCode) {
                return next(new HttpException(404, "Session already exists"));
            }

            const updatedSession = await this.sessionService.updateSession(id, body);
            res.status(200).json(updatedSession);
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.update.name);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                return next(new HttpException(422, "Invalid request parameters: ID is required"));
            }

            const existsSession = await this.sessionService.getSessionById(id);
            if (!existsSession) {
                return next(new HttpException(404, "Session not found"));
            }

            await this.sessionService.deleteSession(id);
            res.status(204).send();
        } catch(err) {
            next(err);
        } finally {
            this.logActivity(req, this.delete.name);
        }
    }
}
