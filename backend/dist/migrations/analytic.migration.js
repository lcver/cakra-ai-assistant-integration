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
const sequelize_1 = require("sequelize");
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable("analytics", {
                id: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: sequelize_1.DataTypes.UUIDV4,
                },
                tenant_id: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                metric_type: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                value: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                recorded_at: {
                    type: sequelize_1.DataTypes.DATE,
                    defaultValue: sequelize_1.DataTypes.NOW,
                },
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable("analytics");
        });
    },
};
