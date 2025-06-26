import { isUUID } from "validator";
import Tenant, { TenantAttributeInterface } from "../models/tenant.model";
import Joi from "joi";
import {
    ConfigTenantInterface,
    TenantInterface,
    UpdateTenantInterface,
} from "./tenant.service.type";

export const createTenant = async (data: TenantInterface) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        api_key: Joi.string().required(),
        config_json: Joi.string().allow(""),
    });

    const validation = schema.validate(data);

    if (validation.error) throw new Error(`${validation.error.message}`);

    return await Tenant.create({
        name: validation.value.name,
        config_json: validation.value.config_json,
        api_key: validation.value.api_key,
    });
};

export const getTenants = async (): Promise<TenantAttributeInterface[]> => {
    return await Tenant.findAll();
};

export const updateTenant = async (uuid: string, data: UpdateTenantInterface) => {
    if (!isUUID(uuid, 4)) throw new Error("Id invalid, Tenant is not found");

    const schema = Joi.object({
        name: Joi.string().required(),
        api_key: Joi.string().required(),
        is_active: Joi.required(),
    });

    const validation = schema.validate(data);

    if (validation.error) throw new Error(`${validation.error.message}`);

    const tenant = await Tenant.findByPk(uuid);
    if (!tenant) throw new Error("Tenant not found");

    return await tenant.update(validation.value);
};

export const updateTenantConfig = async (uuid: string, config: ConfigTenantInterface) => {
    if (!isUUID(uuid, 4)) throw new Error("Id invalid, Tenant is not found");

    const schema = Joi.object({
        model: Joi.string().required(),
        tone: Joi.string().required(),
        language: Joi.string().required(),
        response_format: Joi.string().required(),
        default_prompt_prefix: Joi.string().required(),
    });

    const validation = schema.validate(config);

    if (validation.error) throw new Error(`${validation.error.message}`);

    const defaultConfiguration = {
        model: validation.value.model,
        tone: validation.value.tone,
        language: validation.value.language,
        response_format: validation.value.response_format,
        default_prompt_prefix: validation.value.default_prompt_prefix,
    };

    const tenant = await Tenant.findByPk(uuid);
    if (!tenant) throw new Error("Tenant not found");

    tenant.config_json = defaultConfiguration;
    return await tenant.save();
};
