"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../../config/db.config"));
const Message = db_config_1.default.define("Messages", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    conversation_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    sender_type: {
        type: sequelize_1.DataTypes.ENUM("user", "assistant", "system", "external"),
        allowNull: true,
    },
    ai_response: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    confidence_score: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    timestamp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "messages",
    createdAt: false,
    timestamps: false,
    updatedAt: false,
});
exports.default = Message;
