export {};

declare global {
    namespace Express {
      export interface Request {
          userId?: string;
          userObjectId?: import('mongoose').Types.ObjectId;
      }
    }
}