"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_model_1 = __importDefault(require("./conversation.model"));
const message_model_1 = __importDefault(require("./message.model"));
const tenant_model_1 = __importDefault(require("./tenant.model"));
conversation_model_1.default.belongsTo(tenant_model_1.default, { foreignKey: "tenant_id" });
conversation_model_1.default.hasMany(message_model_1.default, { foreignKey: "conversation_id" });
message_model_1.default.belongsTo(conversation_model_1.default, { foreignKey: "conversation_id" });
tenant_model_1.default.hasMany(conversation_model_1.default, { foreignKey: "tenant_id" });
