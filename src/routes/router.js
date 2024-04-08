import userRoutes from "./user-routes.js";
import auth from "../middlewares/auth.js";
import deviceRoutes from "./device-routes.js"

function routes(app) {
    app.use('/user', userRoutes)
    app.use(auth)
    app.use('/device', deviceRoutes)

};

export default routes;