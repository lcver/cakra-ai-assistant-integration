import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable("integrations", {
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
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            endpoint_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            auth_config: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        });
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable("integrations");
    },
};
