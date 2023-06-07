import { createService, findAllService, countNews } from "../services/news.service.js"

const create = async (req, res) => {
   try{ 
        const { title, text, banner } = req.body;

        if(!title || !text || !banner){
            res.status(400).send({
                message: "Submit all fields for registration",
            });
        }

        await createService ({
            title,
            text,
            banner,
            user: req.userId,
        });

        res.send(201);
    } catch (err) {
      res.status(500).send(err.message)
    }
};

const findAll = async (req,res) => {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
        limit = 5;
    }

    if (!offset) {
        offset = 0;
    }
    
    const news = await findAllService(offset, limit);
    const total = await countNews();
    const currentnUrl = req.baseUrl;
    console.log(currentnUrl)

    const next = offset + limit;
    const nextUrl = next < total ? `${currentnUrl}?limit=${limit}&offset=${next}`: null;

    const previus = offset - limit < 0 ? null : offset - limit;
    const previusUrl = previus != null ?`${currentnUrl}?limit=${limit}&offset=${previus}`: null;

    if (news.length === 0) {
        return res.status(400).send({ 
            message: "There are no registered news",
        })
    }
    res.send({
        nextUrl,
        previusUrl,
        limit,
        offset,
        total,

        results: news.map(item => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.benner,
            likes: item.likes,
            coments: item.coments,
            name: item.user.name,
            username: item.user.name,
            userAvatar: item.user.avatar
        }))
    });
};

export  { create, findAll };