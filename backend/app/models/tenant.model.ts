import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db.config";

export interface TenantAttributeInterface {
    id: string;
    name: string;
    config_json?: object;
    api_key: string;
    is_active?: boolean;
    created_at?: Date;
}

type TenantCreationAttributes = Optional<
    TenantAttributeInterface,
    "id" | "config_json" | "is_active" | "created_at"
>;

type TenantInstance = Model<TenantAttributeInterface, TenantCreationAttributes> &
    TenantAttributeInterface;

const Tenant = sequelize.define<TenantInstance>(
    "Tenants",
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        config_json: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        api_key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "api_key",
                msg: "api_key has been used!",
            },
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "tenants",
        createdAt: "created_at",
        timestamps: true,
        updatedAt: false,
    }
);

export default Tenant;
