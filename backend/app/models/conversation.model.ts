import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db.config";
import { TenantAttributeInterface } from "./tenant.model";
import { MessageAttributeInterface } from "./message.model";

export interface ConversationAttributeInterface {
    id: string;
    tenant_id: string;
    user_id: string;
    context_data: object;
    status: boolean;
    created_at?: Date;
    Tenant?: TenantAttributeInterface;
    Messages?: MessageAttributeInterface[] | [];
}

type ConversationCreationAttribute = Optional<
    ConversationAttributeInterface,
    "id" | "Tenant" | "Messages" | "created_at"
>;

type ConversationInstance = Model<ConversationAttributeInterface, ConversationCreationAttribute> &
    ConversationAttributeInterface;

const Conversation = sequelize.define<ConversationInstance>(
    "Conversations",
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        tenant_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        context_data: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "conversations",
        createdAt: "created_at",
        timestamps: true,
        updatedAt: false,
    }
);

export default Conversation;
