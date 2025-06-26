import { Router } from "express";
import { loginUser } from "../services/auth.service";
import { createUser } from "../services/user.service";
import { responseHandler } from "../utils/responseHandler";

const router = Router();

router.post("/signin", async (req, res) => {
    try {
        const auth = await loginUser(req.body);

        res.json(auth);
    } catch (error) {
        responseHandler.errorResponse({
            res: res,
            message: (error as Error).message,
        });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const auth = await createUser(req.body);

        responseHandler.successResponse({
            res: res,
            data: auth,
        });
    } catch (error) {
        responseHandler.errorResponse({
            res: res,
            message: (error as Error).message,
        });
    }
});

export default router;
