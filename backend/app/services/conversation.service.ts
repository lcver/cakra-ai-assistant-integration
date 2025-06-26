import { isUUID } from "validator";
import Conversation, { ConversationAttributeInterface } from "../models/conversation.model";
import { fetchAllProducts } from "../integrations/fakestore.api";
import Message from "../models/message.model";
import { sendToOpenAI } from "../integrations/openai.api";
import { ChatCompletionMessageParam } from "openai/resources/index";
import Tenant from "../models/tenant.model";
import { ConversationCreateNewInterface } from "./conversation.service.type";
import { ConfigTenantInterface } from "./tenant.service.type";

export const getConversationsByTenant = async (uuid: string) => {
    if (!isUUID(uuid, 4)) throw new Error("Id invalid, Conversation is not found");

    return await Conversation.findAll({
        where: { tenant_id: uuid },
        include: ["Tenant", "Messages"],
    });
};

export const handlerMessageConversation = async (
    tenant_id: string,
    id: string,
    props: ConversationCreateNewInterface
) => {
    if (!isUUID(id)) {
        // New Conversation
        return await createNewConversation(tenant_id, props);
    }

    const validateExistConversation = await Conversation.findByPk(id);

    if (!validateExistConversation) {
        throw new Error("Conversation is not found, please create new one!");
    }

    // Continue the Conversation
    return await createNewMessage(validateExistConversation.id, props.message);
};

export const createNewConversation = async (
    tenant_id: string,
    props: ConversationCreateNewInterface
) => {
    const tenant = await Tenant.findByPk(tenant_id);

    if (!tenant) throw Error("Tenant is not found");
    const products = await fetchAllProducts();

    const conversation = await Conversation.create({
        tenant_id: tenant_id,
        user_id: props.user_id,
        context_data: {
            intent: "recommendation",
            data_tenant: products,
        },
        status: true,
    });

    // Creating First Message
    await createNewMessage(conversation.id, props.message);

    return await Conversation.findByPk(conversation.id, {
        include: ["Messages"],
    });
};

export const createNewMessage = async (conversation_id: string, message: string) => {
    const conversation = await Conversation.findByPk(conversation_id, {
        include: ["Messages", "Tenant"],
    });

    if (!conversation) throw Error("Conversation room is not found");

    const config = conversation.Tenant?.config_json as ConfigTenantInterface;
    const configurationTenant: ConfigTenantInterface = config;

    const prompt = promptGenerate(conversation, configurationTenant, message);

    const openAI = await sendToOpenAI(prompt, configurationTenant.model);

    await Message.create({
        conversation_id: conversation_id,
        sender_type: "user",
        content: message,
        ai_response: openAI.content || "",
        confidence_score: openAI.confidence_score || 0,
    });

    return await Conversation.findByPk(conversation_id, {
        include: ["Messages"],
    });
};

const promptGenerate = (
    dataConversation: ConversationAttributeInterface,
    config: ConfigTenantInterface,
    newMessage: string
): ChatCompletionMessageParam[] => {
    if (!dataConversation.Messages || !dataConversation.Tenant) {
        throw Error("Message or Tenant Undefined");
    }
    const systemPrompt = config.default_prompt_prefix || "You are a helpful assistant.";

    let prompt: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: `${systemPrompt} Format: ${config.response_format || "default"},Language: ${
                config.language
            }, Tone: ${config.tone || "neutral"}, Context : ${JSON.stringify(
                dataConversation?.context_data
            )}`,
        },
    ];

    // Load prev conversation
    dataConversation.Messages.map((msg) => {
        prompt = [
            ...prompt,
            { role: "user", content: msg.content },
            { role: "assistant", content: msg.ai_response },
        ];
    });

    // Adding new prompt
    prompt = [...prompt, { role: "user", content: newMessage }];

    return prompt;
};
