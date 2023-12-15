import { 
    createService, 
    findAllService, 
    countNews,
    findByIdService,
    topNewsService,
    searchByTitleService,
    byUserService,
    updateService,
    eraserService,
    LikeNewsService,
    deleteLikeNewsService
} from "../services/news.service.js"

export const create = async (req, res) => {
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

export const findAll = async (req,res) => {
    try {
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
        const nextUrl = next < total ? `${currentnUrl}?limit=$  {limit}&offset=${next}`: null;

        const previus = offset - limit < 0 ? null : offset - limit;
        const previusUrl = previus != null ?`${currentnUrl}?limit=$ {limit}&offset=${previus}`: null;

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
                banner: item.banner,
                likes: item.likes,
                coments: item.comments,
                name: item.user.name,
                username: item.user.name,
                userAvatar: item.user.avatar
            }))
        });
    } catch (err) {
        res.status(500).send(err.message);
      } 

    
};

export const topNews = async (req,res) =>  {
    try{
        const news = await topNewsService();

        if(!news) {return res.status(400).send({message: "There are no registered news"})};

        res.send({
            news:{
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.name,
                userAvatar: news.user.avatar
            }
        })
    } catch (err) {
      res.status(500).send(err.message);
    } 
};

export const findById = async (req,res) => {
    try{
        const { id } = req.params;

        const news = await findByIdService(id)

        return res.send({
            news:{
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.name,
                userAvatar: news.user.avatar
            }
        })
    } catch (err) {
        res.status(500).send(err.message);
      } 
};

export const searchByTitle = async (req,res) => {
    try{
        const { title } = req.query;

        const news = await searchByTitleService(title);

        if (news.length == 0) {
            return res
                .status(400)
                .stend({ message: "There are no news with this title"});
        }

        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                coments: item.comments,
                name: item.user.name,
                username: item.user.name,
                userAvatar: item.user.avatar
            })),
        });
    } catch (err) {
        res.status(500).send(err.message);
      } 
}

export const byUser = async (req, res) => {
    try{
        const  id = req.userId;
        const news = await byUserService(id);

        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                coments: item.comments,
                name: item.user.name,
                username: item.user.name,
                userAvatar: item.user.avatar
        })),
    });
    } catch (err) {
        res.status(500).send(err.message);
      } 
}

export const update = async (req, res) => {

    try { 
        const { title, text, banner } = req.body;
        const { id } = req.params;

        if(!title && !text && !banner){
            res.status(400).send({
                message: "Submit all fields for registration",
            });
        }

        const news = await findByIdService(id);

        if (news.user._id != req.userId ){
            return res.status(400).send({
                message: "You didn't update this post",
            });
        }

        await updateService(id,title, text, banner);

        return res.send({ message: "News sucessfully update!" });
    } catch (err) {
        res.status(500).send(err.message);
      }
}
export const erase = async (req, res) => {

    try{
        const  { id } = req.params;
        
        const news = await  findByIdService(id);

        if (news.user._id != req.userId ){
            return res.status(400).send({
                message: "You didn't delete this post",
            });
        }

        await eraserService(id);

        return res.send({ message: "News deleted sucessfuly" });
    } catch (err) {
        res.status(500).send(err.message);
      }
}

export const likeNews = async (req, res) => {

    try{
        const { id } =  req.params;
        const userId = req.userId;
    
        const newsLiked = await LikeNewsService(id, userId);
        
        if (!newsLiked){
            await deleteLikeNewsService(id, userId);
            return res.status(200).send({ message: "Like successfully remove" });
        }
        res.send({ message: "Like done successfully" })
    } catch (err) {
        res.status(500).send(err.message);
      }

   
};