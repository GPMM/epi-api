import { SessionRepository } from '@/repositories/session';
import { Session } from '@prisma/client';

export class SessionService {
    private readonly sessionRepository: SessionRepository;

    constructor(sessionRepository: SessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    async createSession(data: { code: string; trainingId: number }) {
        return this.sessionRepository.create(data);
    }

    async getAllSessions() {
        return this.sessionRepository.findAll();
    }

    async getSessionById(id: number) {
        return this.sessionRepository.findById(id);
    }

    async getSessionByCode(code: string) {
        const session: SessionSchema | null = await this.sessionRepository.findByCode(code);

        if(session) {
            const updatedSession = { ...session };
  
            updatedSession.training.unityObjects = updatedSession.training.unityObjects.map((unityObject: UnityObjectSchema) => ({
                ...unityObject,
                pos: [unityObject.posX, unityObject.posY, unityObject.posZ]
            }));
            
            updatedSession.training.unityObjects.forEach((unityObject: UnityObjectSchema) => {
                // @ts-ignore
                delete unityObject.posX;
                // @ts-ignore
                delete unityObject.posY;
                // @ts-ignore
                delete unityObject.posZ;
            });
    
            return updatedSession;
            // return {unityObjects: updatedSession.training.unityObjects};
        }
        
        return session;
    }

    async updateSession(id: number, data: { code?: string; trainingId?: number }) {
        return this.sessionRepository.update(id, data);
    }

    async deleteSession(id: number) {
        return this.sessionRepository.delete(id);
    }
}
