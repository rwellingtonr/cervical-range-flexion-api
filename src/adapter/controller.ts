import { Request, Response } from "express"

type Controller = {
    handle(req: Request, Response: Response): Promise<Response>
}

export const adapterRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => await controller.handle(req, res)
}
