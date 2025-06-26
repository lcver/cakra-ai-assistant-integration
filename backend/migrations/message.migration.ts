import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("messages", {
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
        });
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable("messages");
    },
};
