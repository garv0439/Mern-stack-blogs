import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';


// create a connection to MongoDB


dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@blogapp-shard-00-00.z6rbn.mongodb.net:27017,blogapp-shard-00-01.z6rbn.mongodb.net:27017,blogapp-shard-00-02.z6rbn.mongodb.net:27017/?ssl=true&replicaSet=atlas-g59wf1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BlogApp`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
         const filename = `${Date.now()}_${file.originalname}`;
    
    const fileInfo = {
      filename: filename,
      bucketName: 'images'
    };
    return fileInfo;
    }
});

export default multer({ storage }); 



// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';


// dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//     url: `mongodb://${username}:${password}@blogapp-shard-00-00.z6rbn.mongodb.net:27017,blogapp-shard-00-01.z6rbn.mongodb.net:27017,blogapp-shard-00-02.z6rbn.mongodb.net:27017/?ssl=true&replicaSet=atlas-g59wf1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BlogApp`,
//     options: { useNewUrlParser: true },
//     file: (request, file) => {
//         const match = ["image/png", "image/jpg"];

//         if(match.indexOf(file.mimitype) === -1) 
//             return `${Date.now()}-blog-${file.originalname}`;

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-blog-${file.originalname}`
//         }
//     }
// });

// export default multer({ storage }); 
