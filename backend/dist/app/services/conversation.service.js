"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewMessage = exports.createNewConversation = exports.handlerMessageConversation = exports.getConversationsByTenant = void 0;
const validator_1 = require("validator");
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const fakestore_api_1 = require("../integrations/fakestore.api");
const message_model_1 = __importDefault(require("../models/message.model"));
const openai_api_1 = require("../integrations/openai.api");
const getConversationsByTenant = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validator_1.isUUID)(uuid, 4))
        throw new Error("Id invalid, Conversation is not found");
    return yield conversation_model_1.default.findAll({ where: { tenant_id: uuid } });
    // return await Conversation.findAll({
    //     where: { tenant_id: uuid },
    //     include: ["Tenant", "Messages"],
    // });
});
exports.getConversationsByTenant = getConversationsByTenant;
const handlerMessageConversation = (tenant_id, id, props) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validator_1.isUUID)(id)) {
        // New Conversation
        return yield (0, exports.createNewConversation)(tenant_id, props);
    }
    const validateExistConversation = yield conversation_model_1.default.findByPk(id);
    if (!validateExistConversation) {
        throw new Error("Conversation is not found, please create new one!");
    }
    // Continue the Conversation
    return yield (0, exports.createNewMessage)(validateExistConversation.id, props.message);
});
exports.handlerMessageConversation = handlerMessageConversation;
const createNewConversation = (tenant_id, props) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, fakestore_api_1.fetchAllProducts)();
    console.log(products);
    const conversation = yield conversation_model_1.default.create({
        tenant_id: tenant_id,
        user_id: props.user_id,
        context_data: {
            intent: "recommendation",
            data_tenant: products,
        },
        status: true,
    });
    // Creating First Message
    // await createNewMessage(conversation.id, props.message);
    return yield conversation_model_1.default.findByPk(conversation.id, {
        include: ["Messages"],
    });
});
exports.createNewConversation = createNewConversation;
const createNewMessage = (conversation_id, message) => __awaiter(void 0, void 0, void 0, function* () {
    const conversation = yield conversation_model_1.default.findByPk(conversation_id);
    const prompt = [
        { role: "system", content: `Context : ${JSON.stringify(conversation === null || conversation === void 0 ? void 0 : conversation.context_data)}` },
        { role: "user", content: message },
    ];
    const openAI = yield (0, openai_api_1.sendToOpenAI)(prompt);
    yield message_model_1.default.create({
        conversation_id: conversation_id,
        sender_type: "user",
        content: message,
        ai_response: openAI.content || "",
        confidence_score: openAI.confidence_score || 0,
    });
    return yield conversation_model_1.default.findByPk(conversation_id, {
        include: ["Messages"],
    });
});
exports.createNewMessage = createNewMessage;
