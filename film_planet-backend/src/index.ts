import express from 'express';
import { createServer } from 'http';
import helmet from "helmet";
import cors from 'cors';
import {expressLogger} from "./controllers/logger.controller";
import {errorHandler} from "./middlewares/error.middleware";
import {connectToDb} from "./config/db";
import {Config} from "./config/config";

const app = express();
const httpServer = createServer(app);

// helmet
app.use(helmet());

// cors
app.use(cors({ origin: true, credentials: true }));

// logger
app.use(expressLogger);

// body parser
app.use(express.json());


// middlewares (routers etc.)


// error handler
app.use(errorHandler);

async function main() {
    //connect to database
    await connectToDb();

    httpServer.listen(Config.PORT, () => {
        console.log('> App is listening...');
        console.log(`> App Name: ${Config.PACKAGE}`);
        console.log(`> Version: ${Config.VERSION}`);
        console.log(`> Port: ${Config.PORT}\n`);
    });
}

main().then();
