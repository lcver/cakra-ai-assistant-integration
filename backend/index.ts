import express, { Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.config";

// Routes
import tenantRoutes from "./app/routes/tenant.route";
import userRoutes from "./app/routes/user.route";
import conversationRoutes from "./app/routes/conversation.route";
import authRoutes from "./app/routes/auth.route";

import "./app/models/associations";
import { verifyToken } from "./app/utils/verifyToken";
dotenv.config();

const app = express();
app.use(express.json());

// Authentication Route
app.use("/api/auth", authRoutes);

// Register Routes
app.use(verifyToken);
app.use("/api/tenants", tenantRoutes);
app.use("/api/users", userRoutes);
app.use("/api", conversationRoutes);

// Root
app.get("/", (_req: Request, res: Response) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        sequelize.authenticate();
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Unable to connect to database: ", error);
    }
})();
