import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db.config";

export interface MessageAttributeInterface {
    id: string;
    conversation_id: string;
    content: string;
    sender_type: string;
    ai_response: string;
    confidence_score: number;
    timestamp?: Date;
}

type MessageCreationAttribute = Optional<MessageAttributeInterface, "id">;

type MessageInterface = Model<MessageAttributeInterface, MessageCreationAttribute> &
    MessageAttributeInterface;

const Message = sequelize.define<MessageInterface>(
    "Messages",
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        conversation_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sender_type: {
            type: DataTypes.ENUM("user", "assistant", "system", "external"),
            allowNull: true,
        },
        ai_response: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        confidence_score: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        timestamp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "messages",
        createdAt: false,
        timestamps: false,
        updatedAt: false,
    }
);

export default Message;
