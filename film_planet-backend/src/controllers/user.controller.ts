import {NextFunction, Request, Response} from "express";
import {User, UserModel} from "../models/user.interface";
import httpStatus from "http-status";
import {Config} from "../config/config";
import bcrypt from 'bcrypt';
import {sendMail} from "./mail.controller";

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.params;
        const user = await UserModel.findOne({ email});

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found'});
        }

        const userProfile: User = {
            ...user.toObject(),
            password: undefined,

        };

        return res.status(httpStatus.OK).send(userProfile);
    } catch (err) {
        next(err);
    }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password, firstName, lastName, email } = req.body;

        if (await emailExists(email)) {
            throw new Error('Account with this Email already exists');
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
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email: email.toLowerCase()
        });

        const result = await sendMail(mailOptions);

        if (!result) {
            throw new Error('Could not send mail');
        }

        return res.send({ response: 'success', email: email.toLowerCase(), firstName, lastName});

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
