import express from 'express';
import { createServer } from 'http';
import helmet from "helmet";
import cors from 'cors';
import {expressLogger} from "./controllers/logger.controller";
import {errorHandler} from "./middlewares/error.middleware";
import {connectToDb} from "./config/db";
import {Config} from "./config/config";
import libraryRouter from "./routes/library.router";

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
app.get('/api/ping', (req, res) => {
    res.send({ name: Config.PACKAGE, port: Config.PORT, version: Config.VERSION });
});

app.use('/api/library', libraryRouter);

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
