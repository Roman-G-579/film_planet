import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import {User, UserModel} from "../models/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Config} from "../config/config";
import {sendMail} from "./mail.controller";
import {config} from "dotenv";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password, firstName, lastName, email } = req.body;

        if (await emailExists(email)) {
            return next(new Error('Account with this Email already exists'));
        }

        if (await usernameExists(username)) {
            return next(new Error('Username already taken'));
        }

        // The details of the registration email
        const mailOptions = {
            from: Config.ADMIN_EMAIL,
            to: email,
            subject: `Your Film Planet account has been created`,
            text: `Hi ${firstName}, your account has been successfully registered!`,
        }

        // Hashes the user's password
        const hashedPassword = await bcrypt.hash(password, Config.SALT_ROUNDS);

        await UserModel.create({
            username: username.toLowerCase(),
            password: hashedPassword,
            firstName,
            lastName,
            email: email.toLowerCase()
        });

        //const result = await sendMail(mailOptions);

        // if (!result) {
        //     throw new Error('Could not send mail');
        // }

        return res.send({ response: 'success', email: email.toLowerCase(), firstName, lastName});

    } catch (err) {
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        let { username, password } = req.body;

        if (!username || !password ) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: 'Username and password are required' });
        }

        username = username.toLowerCase();
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid username or password' });
        }

        const accessToken = await generateAccessToken(user.username);
        const refreshToken = await generateRefreshToken(user.username);

        // TODO: update 'secure' to true once app uses HTTPS
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        user.password = undefined;

        return res.status(httpStatus.OK).json({ token: accessToken, user});
    } catch (err) {
        next(err);
    }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(httpStatus.FORBIDDEN).json({ message: 'Refresh token missing' });
    }

    try {
        const decodedToken = jwt.verify(refreshToken, Config.REFRESH_SECRET) as { username: string };

        const username = decodedToken.username;
        const user = await UserModel.findOne({ username });
        console.log(user)
        if (!user) {
            return res.status(httpStatus.FORBIDDEN).json({ message: 'Invalid refresh token'});
        }

        const newToken = await generateAccessToken(user.username)
        console.log(newToken)
        return res.status(httpStatus.OK).json({ token: newToken });
    } catch (err) {
        res.status(httpStatus.FORBIDDEN).json({ message: 'Invalid refresh token' });
    }
}

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    res.status(httpStatus.OK).json({ message: 'Token is valid' });
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie('refreshToken');
    return res.status(httpStatus.OK).json({ message: 'Logged out'});
}

export async function getUserByToken(req: Request, res: Response, next: NextFunction) {
    try {
        req.user.password = undefined;

        return res.status(httpStatus.OK).json(req.user);
    } catch (err) {
        next(err);
    }
}

/**
 * Returns true if a user with the given email already exists in the database,
 * otherwise returns false
 * @param email the email address to be checked
 */
async function emailExists(email: string): Promise<boolean> {
    const exists = await UserModel.findOne({ email });

    return !!exists;
}

async function usernameExists(username: string): Promise<boolean> {
    const exists = await UserModel.findOne({ username });

    return !!exists;
}

async function generateAccessToken(username: string) {
    return jwt.sign({ username: username}, Config.JWT_SECRET, { expiresIn: '10s' });
}

async function generateRefreshToken(username: string) {
    return jwt.sign({ username: username}, Config.REFRESH_SECRET);
}


