import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db.config";

export interface UserAttributeInterface {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    is_active?: boolean;
    created_at?: Date;
}

type UserCreationAttribute = Optional<UserAttributeInterface, "id" | "is_active" | "created_at">;

type UserInstance = Model<UserAttributeInterface, UserCreationAttribute> & UserAttributeInterface;

const User = sequelize.define<UserInstance>(
    "Users",
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "users",
        createdAt: "created_at",
        timestamps: true,
        updatedAt: false,
    }
);

export default User;
