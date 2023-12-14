import { Router } from 'express';
const route = Router();

import {
    create,
    findAll,
    topNews,
    findById,
    searchByTitle,
    byUser,
    update,
    erase 
} from '../controllers/news.controller.js';

import { authMiddleware } from '../middlerwares/auth.middlewares.js';  

route.post("/", authMiddleware, create);
route.get("/", findAll);
route.get("/top", topNews);
route.get("/search", searchByTitle);
route.get("/byUser", authMiddleware, byUser );
route.get("/:id", authMiddleware, findById);
route.patch("/:id", authMiddleware, update);
route.delete("/:id", authMiddleware, erase);



export default route;