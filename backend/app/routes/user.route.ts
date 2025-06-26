import { Router } from "express";
import { createUser, getUsers, updateUser } from "../services/user.service";
import { responseHandler } from "../utils/responseHandler";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const tenant = await createUser(req.body);
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
        const tenants = await getUsers();
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

router.put("/:id", async (req, res) => {
    try {
        const updated = await updateUser(req.params.id, req.body);
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
