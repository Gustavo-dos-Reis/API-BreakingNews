import mongoose from 'mongoose';

const conetcDatabase = () => {
    console.log("Wait connecting to the database...")

    mongoose
        .connect(process.env.MONGODB_URI ,
            {
                useNewUrlParser: true ,
                useUnifiedTopology: true
            }
    )
    .then(() => console.log("Mongo DB Atlas Connected"))
    .catch((err) => console.log(`Error connecting to MongoDB Atlas: ${err}`));
};

export default conetcDatabase;