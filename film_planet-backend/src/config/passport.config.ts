import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import {Config} from "./config";
import {UserModel} from "../models/user.interface";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done ) => {
    try {
        console.log(`JWT Payload: ${JSON.stringify(jwt_payload)}`);

        const user = await UserModel.findOne({ username: jwt_payload.username});
        if (user) {
            console.log('user found: ', user.username);
            return done(null, user);
        } else {
            console.log('User not found');
        }
        return done(null, false);
    } catch (err) {
        console.error('Error in JWT strategy: ', err);
        return done(err, false);
    }
});
