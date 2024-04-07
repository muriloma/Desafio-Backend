import userRoutes from "./user-routes.js";

function routes(app) {
    app.use('/user', userRoutes)
};

export default routes;