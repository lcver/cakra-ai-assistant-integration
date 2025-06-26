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
exports.searchProductByKeyword = exports.fetchProductById = exports.fetchAllProducts = void 0;
const fetchApi_1 = require("../utils/fetchApi");
const API_URL = "https://fakestoreapi.com/";
const fetchAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, fetchApi_1.fetchApi)(`${API_URL}/products`);
    return response.data;
});
exports.fetchAllProducts = fetchAllProducts;
const fetchProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, fetchApi_1.fetchApi)(`${API_URL}/products/${id}`);
    return response.data;
});
exports.fetchProductById = fetchProductById;
const searchProductByKeyword = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, fetchApi_1.fetchApi)(`${API_URL}/products`);
    const results = response.data.filter((p) => p.title.toLowerCase().includes(keyword.toLowerCase()));
    return results;
});
exports.searchProductByKeyword = searchProductByKeyword;
