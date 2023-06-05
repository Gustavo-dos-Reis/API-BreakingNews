import { Router } from 'express';
const route = Router();

import { create, findAll } from '../controllers/news.controller.js';
import { authMiddleware } from '../middlerwares/auth.middlewares.js';  

route.post("/", authMiddleware, create);
route.get("/", findAll);

export default route;