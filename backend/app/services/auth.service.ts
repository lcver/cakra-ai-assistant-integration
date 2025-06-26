import Joi from "joi";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginUserInterface } from "./auth.service.type";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";
export const loginUser = async (props: LoginUserInterface) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    const validation = schema.validate(props);

    if (validation.error) throw new Error(`${validation.error.message}`);

    const user = await User.findOne({
        where: {
            username: validation.value.username,
        },
    });
    if (!user) throw new Error("User is not found");

    const valid = await bcrypt.compare(validation.value.password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign(
        {
            user_id: user.id,
            name: user.name,
            email: user.email,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { token, user };
};

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};
