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
exports.sendToOpenAI = void 0;
const openai_1 = __importDefault(require("openai"));
const OPENAI_API_KEY = process.env.CAKRA_OPENAI_API_KEY;
const OPENAI_API_MODEL = process.env.CAKRA_OPENAI_API_MODEL;
const sendToOpenAI = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const openai = new openai_1.default({ apiKey: OPENAI_API_KEY });
    const completion = yield openai.chat.completions.create({
        model: OPENAI_API_MODEL || "gpt-3.5-turbo",
        messages: prompt,
        logprobs: true,
        top_logprobs: 1,
        user: "lucver",
    });
    const choice = completion.choices[0];
    const content = choice.message.content;
    // Confidence estimation (simple average of token logprobs)
    let confidence_score = null;
    if ((_b = (_a = choice.logprobs) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.length) {
        const logprobs = choice.logprobs.content.map((t) => { var _a; return (_a = t.logprob) !== null && _a !== void 0 ? _a : -100; });
        const avgLogProb = logprobs.reduce((sum, val) => sum + val, 0) / logprobs.length;
        // Convert logprob to confidence: confidence = e^logprob
        confidence_score = Math.exp(avgLogProb); // between 0 and 1
    }
    return {
        content,
        confidence_score,
    };
});
exports.sendToOpenAI = sendToOpenAI;
