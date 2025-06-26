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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversation_service_1 = require("../services/conversation.service");
const router = (0, express_1.Router)();
// list conversations
router.get("/:tenant_id/conversations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversations = yield (0, conversation_service_1.getConversationsByTenant)(req.params.tenant_id);
        res.json(conversations);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.post("/:tenant_id/conversations/:id/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newConversations = yield (0, conversation_service_1.handlerMessageConversation)(req.params.tenant_id, req.params.id, req.body);
        res.json(newConversations);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
exports.default = router;
