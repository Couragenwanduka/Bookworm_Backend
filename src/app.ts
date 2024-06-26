import express,{ Application } from 'express';
import dataBaseConnection from './database/mongodb';
import { setUpServer } from './chat/chatBot';
import router from './router/router';
import { createServer } from 'http';
import dotenv  from  'dotenv';
import cors   from  'cors'

dotenv.config();
dataBaseConnection();

const port: number = parseInt(process.env.PORT as string, 10 ) || 3000;
const app: Application = express();
const server = createServer(app);
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(router);

setUpServer(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})