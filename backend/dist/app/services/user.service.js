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
exports.updateUser = exports.getUsers = exports.createUser = void 0;
const validator_1 = require("validator");
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.create({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        is_active: data.is_active,
    });
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findAll();
});
exports.getUsers = getUsers;
const updateUser = (uuid, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validator_1.isUUID)(uuid, 4))
        throw new Error("Id invalid, User is not found");
    const user = yield user_model_1.default.findByPk(uuid);
    if (!user)
        throw new Error("User not found");
    return yield user.update(data);
});
exports.updateUser = updateUser;
