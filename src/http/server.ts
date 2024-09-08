import express from "express";
import cors from "cors"
import { PrismaClient } from "@prisma/client";

import { env } from "@/env";
import { Routes } from "@/routes";
import { Logger } from "@/infra/logger";
import { ErrorHandlerMiddleware } from "@/middlewares/errorHandler";
import { UnityObjectRepository } from "@/repositories/unityObject";
import { UnityObjectService } from "@/services/unityObject";
import { UnityObjectController } from "@/controllers/unityObject";
import { TrainingRepository } from "@/repositories/training";
import { TrainingService } from "@/services/training";
import { TrainingController } from "@/controllers/training";
import { SessionRepository } from "@/repositories/session";
import { SessionService } from "@/services/session";
import { SessionController } from "@/controllers/session";
import { ActivityRepository } from "@/repositories/activity";
import { ActivityService } from "@/services/activity";
import { ActivityController } from "@/controllers/activity";

const logger = Logger.getInstance();
const prismaClient = new PrismaClient();

async function main() {
    const app = express();

    const unityObjectRepository = new UnityObjectRepository(prismaClient);
    const unityObjectService = new UnityObjectService(unityObjectRepository);
    const unityObjectController = new UnityObjectController(unityObjectService);

    const trainingRepository = new TrainingRepository(prismaClient);
    const trainingService = new TrainingService(trainingRepository);
    const trainingController = new TrainingController(trainingService);

    const sessionRepository = new SessionRepository((prismaClient));
    const sessionService = new SessionService(sessionRepository);
    const sessionController = new SessionController(sessionService);

    const activityRepository = new ActivityRepository(prismaClient);
    const activityService = new ActivityService(activityRepository);
    const activityController = new ActivityController(activityService);

    app.use(cors());
    app.use(express.json());
    app.use(
        Routes.PREFIX,
        Routes.initialize(
            unityObjectController,
            trainingController,
            sessionController,
            activityController
        )
    );
    app.use(ErrorHandlerMiddleware.handler);

    app.listen(env.PORT, () => {
        logger.info(`Application running on port ${env.PORT}`);
    })
}

main()
    .catch(err => logger.error("Error initializing the application", err))
    .finally(async () => await prismaClient.$disconnect());