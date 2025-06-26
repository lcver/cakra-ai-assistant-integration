export interface TenantInterface {
    name: string;
    config_json?: object;
    api_key: string;
    is_active?: boolean;
}

export interface UpdateTenantInterface {
    name: string;
    api_key: string;
    is_active?: boolean;
}

export interface ConfigTenantInterface {
    model: string;
    tone: string;
    language: string;
    response_format: string;
    default_prompt_prefix: string;
}
