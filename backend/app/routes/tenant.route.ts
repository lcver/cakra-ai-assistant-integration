import { Router } from "express";
import {
    createTenant,
    getTenants,
    updateTenant,
    updateTenantConfig,
} from "../services/tenant.service";
import { responseHandler } from "../utils/responseHandler";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const tenant = await createTenant(req.body);

        responseHandler.successResponse({
            code: 201,
            res: res,
            data: tenant,
        });
    } catch (error) {
        responseHandler.errorResponse({
            res: res,
            message: (error as Error).message,
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const tenants = await getTenants();
        responseHandler.successResponse({
            res: res,
            data: tenants,
        });
    } catch (error) {
        responseHandler.errorResponse({
            res: res,
            message: (error as Error).message,
        });
    }
});

router.put("/:id/config", async (req, res) => {
    try {
        const updated = await updateTenantConfig(req.params.id, req.body);
        responseHandler.successResponse({
            res: res,
            data: updated,
        });
    } catch (error) {
        responseHandler.errorResponse({
            res: res,
            message: (error as Error).message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await updateTenant(req.params.id, req.body);
        responseHandler.successResponse({
            res: res,
            data: updated,
        });
    } catch (error) {
        responseHandler.errorResponse({
            res: res,
            message: (error as Error).message,
        });
    }
});

export default router;
