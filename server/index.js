import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';


import Connection from './database/db.js';
import router from './routes/route.js';


dotenv.config();


const app = express();



app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);


const PORT = 8000;


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


Connection(username, password);


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));