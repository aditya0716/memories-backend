import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log('MongoDB connected ',conn.connection.host)
    } catch (err) {
        console.error('MongoDb ',err);
        process.exit(1);
    }
}

export default connectDB;
