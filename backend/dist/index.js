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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("./config/db.config"));
// Routes
const tenant_route_1 = __importDefault(require("./app/routes/tenant.route"));
const user_route_1 = __importDefault(require("./app/routes/user.route"));
const conversation_route_1 = __importDefault(require("./app/routes/conversation.route"));
require("./app/models/associations");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Register Routes
app.use("/api/tenants", tenant_route_1.default);
app.use("/api/users", user_route_1.default);
app.use("/api", conversation_route_1.default);
// Root
app.get("/", (_req, res) => {
    res.send("API is running");
});
const PORT = process.env.PORT || 3000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_config_1.default.authenticate();
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Unable to connect to database: ", error);
    }
}))();
