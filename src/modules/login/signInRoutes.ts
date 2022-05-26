import { Application } from "express"
import { SingInController } from "./signInController"

export const signInRoutes = (app: Application) => {
    app.route("/signin").post(new SingInController().handle)
}
