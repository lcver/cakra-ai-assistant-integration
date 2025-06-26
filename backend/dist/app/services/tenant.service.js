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
exports.updateTenantConfig = exports.updateTenant = exports.getTenants = exports.createTenant = void 0;
const validator_1 = require("validator");
const tenant_model_1 = __importDefault(require("../models/tenant.model"));
const createTenant = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tenant_model_1.default.create({
        name: data.name,
        config_json: data.config_json,
        api_key: data.api_key,
    });
});
exports.createTenant = createTenant;
const getTenants = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield tenant_model_1.default.findAll();
});
exports.getTenants = getTenants;
const updateTenant = (uuid, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validator_1.isUUID)(uuid, 4))
        throw new Error("Id invalid, Tenant is not found");
    const tenant = yield tenant_model_1.default.findByPk(uuid);
    if (!tenant)
        throw new Error("Tenant not found");
    return yield tenant.update(data);
});
exports.updateTenant = updateTenant;
const updateTenantConfig = (uuid, config) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validator_1.isUUID)(uuid, 4))
        throw new Error("Id invalid, Tenant is not found");
    const tenant = yield tenant_model_1.default.findByPk(uuid);
    if (!tenant)
        throw new Error("Tenant not found");
    tenant.config_json = config;
    return yield tenant.save();
});
exports.updateTenantConfig = updateTenantConfig;
