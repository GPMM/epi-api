type UnityObjectSchema = {
    id: number;
    name: string;
    type: string;
    posX: number;
    posY: number;
    posZ: number;
}

type UnityObjectsCoordinates = {
    posX: number;
    posY: number;
    posZ: number;
}
  
type TrainingSchema = {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    unityObjects: UnityObjectSchema[];
}
  
type SessionSchema = {
    id: number;
    code: string;
    createdAt: Date;
    trainingId: number;
    training: TrainingSchema;
}