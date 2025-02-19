import express from 'express';
import { createServer } from 'http';
import helmet from "helmet";
import cors from 'cors';
import {expressLogger} from "./controllers/logger.controller";
import {errorHandler} from "./middlewares/error.middleware";
import {connectToDb} from "./config/db";
import {Config} from "./config/config";
import libraryRouter from "./routes/library.router";
import detailsRouter from "./routes/details.router";
import userRouter from "./routes/user-profile.router";
import authRouter from "./routes/auth.router";
import passport from "passport";
import {jwtStrategy} from "./config/passport.config";
import cookieParser from "cookie-parser";

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

// cookie parser
app.use(cookieParser());

// JWT
passport.use(jwtStrategy);
app.use(passport.initialize());

// middlewares (routers etc.)
app.get('/api/ping', (req, res) => {
    res.send({ name: Config.PACKAGE, port: Config.PORT, version: Config.VERSION });
});

app.use('/api/library', libraryRouter);
app.use('/api/details', detailsRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

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
