import { Router } from "express";
import {
    createNewConversation,
    getConversationsByTenant,
    handlerMessageConversation,
} from "../services/conversation.service";
import { responseHandler } from "../utils/responseHandler";

const router = Router();

// list conversations
router.get("/:tenant_id/conversations", async (req, res) => {
    try {
        const conversations = await getConversationsByTenant(req.params.tenant_id);

        responseHandler.successResponse({
            res: res,
            data: conversations,
        });
    } catch (error) {
        responseHandler.errorResponse({
            res: res,
            message: (error as Error).message,
        });
    }
});

router.post("/:tenant_id/conversations", async (req, res) => {
    try {
        const newConversations = await createNewConversation(req.params.tenant_id, req.body);

        responseHandler.successResponse({
            res: res,
            data: newConversations,
        });
    } catch (error) {
        responseHandler.errorResponse({
            res: res,
            message: (error as Error).message,
        });
    }
});
router.post("/:tenant_id/conversations/:id/messages", async (req, res) => {
    try {
        const newConversations = await handlerMessageConversation(
            req.params.tenant_id,
            req.params.id,
            req.body
        );
        responseHandler.successResponse({
            res: res,
            data: newConversations,
        });
    } catch (error) {
        responseHandler.errorResponse({
            res: res,
            message: (error as Error).message,
        });
    }
});

export default router;
