import { Router } from 'express';
const route = Router();

import { create, findAll, topNews, findById } from '../controllers/news.controller.js';
import { authMiddleware } from '../middlerwares/auth.middlewares.js';  

route.post("/", authMiddleware, create);
route.get("/", findAll);
route.get("/top", topNews);
route.get("/:id", findById)

export default route;