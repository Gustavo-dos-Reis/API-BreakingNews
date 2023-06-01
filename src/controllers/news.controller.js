import { createService, findAllService } from "../services/news.service.js"

const create = async (res, req) => {
   try{ 
        const { title, text, banner } = req.body;

        if(!title || !text || !banner){
            res.status(400).send({
                message: "Submit all fields for refistration",
            });
        }

        await createService ({
            title,
            text,
            banner,
            id: "objectidfake1",
        });

        res.send(201);
    }catch (error){
        res.status(500).send({message: err.message})
    }
};

const findAll = (res,req) => {
    const news = [];
    res.send(news);
};

export default { create, findAll};