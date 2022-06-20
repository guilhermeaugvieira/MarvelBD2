import { Router } from "express"
import { serve, setup } from 'swagger-ui-express';
import swaggerDocs from '../Swagger/swaggerDocs.json';

const rotaSwagger = Router();

rotaSwagger.use("/swagger", serve),
rotaSwagger.get("/swagger", setup(swaggerDocs));

export { rotaSwagger };