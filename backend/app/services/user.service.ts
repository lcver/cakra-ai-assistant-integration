import { isUUID } from "validator";
import User, { UserAttributeInterface } from "../models/user.model";
import { hashPassword } from "./auth.service";
import Joi from "joi";

interface UserInterface {
    name: string;
    username: string;
    email: string;
    password: string;
    is_active?: boolean;
}

export const createUser = async (data: UserInterface) => {
    const { email, name, username, password } = data;

    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        is_active: Joi.required(),
    });

    const validation = schema.validate(data);

    if (validation.error) throw new Error(`${validation.error.message}`);

    const hashed = await hashPassword(password);

    return await User.create({
        email: email,
        name: name,
        username: username,
        password: hashed,
        is_active: data.is_active,
    });
};

export const getUsers = async (): Promise<UserAttributeInterface[]> => {
    return await User.findAll();
};

export const updateUser = async (uuid: string, data: UserInterface) => {
    if (!isUUID(uuid, 4)) throw new Error("Id invalid, User is not found");

    const user = await User.findByPk(uuid);
    if (!user) throw new Error("User not found");

    return await user.update(data);
};
