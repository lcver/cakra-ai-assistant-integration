import axios from "axios";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index";

const OPENAI_API_KEY = process.env.CAKRA_OPENAI_API_KEY;
const OPENAI_API_MODEL = process.env.CAKRA_OPENAI_API_MODEL;

export const sendToOpenAI = async (
    prompt: ChatCompletionMessageParam[],
    model = OPENAI_API_MODEL
) => {
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
        model: model || "gpt-3.5-turbo",
        messages: prompt,
        logprobs: true,
        top_logprobs: 1,
        user: "lucver",
    });

    const choice = completion.choices[0];
    const content = choice.message.content;

    // Confidence estimation (simple average of token logprobs)
    let confidence_score: number | null = null;

    if (choice.logprobs?.content?.length) {
        const logprobs = choice.logprobs.content.map((t) => t.logprob ?? -100);
        const avgLogProb = logprobs.reduce((sum, val) => sum + val, 0) / logprobs.length;

        // Convert logprob to confidence: confidence = e^logprob
        confidence_score = Math.exp(avgLogProb); // between 0 and 1
    }

    return {
        content,
        confidence_score,
    };
};
