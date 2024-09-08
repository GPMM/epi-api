import { Router } from "express";

import { UnityObjectController } from "./controllers/unityObject";
import { TrainingController } from "./controllers/training";
import { SessionController } from "./controllers/session";
import { ActivityController } from "./controllers/activity";

export abstract class Routes {
    public static readonly PREFIX = "/api/v1";

    public static initialize(
        unityObjectController: UnityObjectController,
        trainingController: TrainingController,
        sessionController: SessionController,
        activityController: ActivityController
    ) {
        const router = Router();

        router.get('/health', (req, res) => {
            return res.status(200).json({ message: "OK" });
        });

        router.post('/unityObjects', unityObjectController.create.bind(unityObjectController));
        router.get('/unityObjects', unityObjectController.findAll.bind(unityObjectController));
        router.get('/unityObjects/:id', unityObjectController.findById.bind(unityObjectController));
        router.put('/unityObjects/:id', unityObjectController.update.bind(unityObjectController));
        router.delete('/unityObjects/:id', unityObjectController.delete.bind(unityObjectController));

        router.post('/training', trainingController.create.bind(trainingController));
        router.get('/training', trainingController.findAll.bind(trainingController));
        router.get('/training/:id', trainingController.findById.bind(trainingController));
        router.put('/training/:id', trainingController.update.bind(trainingController));
        router.delete('/training/:id', trainingController.delete.bind(trainingController));

        router.post('/session', sessionController.create.bind(sessionController));
        router.get('/session', sessionController.findAll.bind(sessionController));
        router.get('/session/:id', sessionController.findById.bind(sessionController));
        router.get('/session/code/:code', sessionController.findByCode.bind(sessionController));
        router.put('/session/:id', sessionController.update.bind(sessionController));
        router.delete('/session/:id', sessionController.delete.bind(sessionController));

        router.post('/activities', activityController.create.bind(activityController));
        router.get('/activities', activityController.findAll.bind(activityController));
        router.get('/activities/:id', activityController.findById.bind(activityController));
        router.get('/activities/session/:sessionId', activityController.findAllBySessionId.bind(activityController));
        router.put('/activities/:id', activityController.update.bind(activityController));
        router.delete('/activities/:id', activityController.delete.bind(activityController));

        return router;
    }
}