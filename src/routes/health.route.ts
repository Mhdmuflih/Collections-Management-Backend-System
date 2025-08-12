import { Request, Response, Router } from "express";

const Health_Route = Router();

Health_Route.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

export default Health_Route;