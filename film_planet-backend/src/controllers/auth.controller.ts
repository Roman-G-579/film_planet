import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import {UserModel} from "../models/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Config} from "../config/config";
import {sendMail} from "./mail.controller";

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

        const token = jwt.sign({ username: user.username}, Config.JWT_SECRET, { expiresIn: '3h' });

        user.password = undefined;

        return res.status(httpStatus.OK).json({ token, user});
    } catch (err) {
        next(err);
    }
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
