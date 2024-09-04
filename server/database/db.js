import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@blogapp-shard-00-00.z6rbn.mongodb.net:27017,blogapp-shard-00-01.z6rbn.mongodb.net:27017,blogapp-shard-00-02.z6rbn.mongodb.net:27017/?ssl=true&replicaSet=atlas-g59wf1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BlogApp`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;