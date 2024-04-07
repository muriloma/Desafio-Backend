import express from 'express';
import 'dotenv/config';
import routes from './routes/router.js';

const app = express();
app.use(express.json());
routes(app);


export default app;