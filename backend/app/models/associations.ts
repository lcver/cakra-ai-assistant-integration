import Conversation from "./conversation.model";
import Message from "./message.model";
import Tenant from "./tenant.model";

Conversation.belongsTo(Tenant, { foreignKey: "tenant_id" });
Conversation.hasMany(Message, { foreignKey: "conversation_id" });

Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

Tenant.hasMany(Conversation, { foreignKey: "tenant_id" });
