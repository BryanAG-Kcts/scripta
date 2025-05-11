import type { Message } from "../controllers/ia.controllers";
import { client } from "../services/ia.services";

export class IaModel {
	static iaClient = client;

	// static defaultConfig = {
	// 	provider: "novita", // hiperbolic
	// 	model: "deepseek-ai/DeepSeek-V3-0324",
	// };

	static IaConfig = {
		// provider: "nebius",
		provider: "cohere",
		// model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
		model: "CohereLabs/c4ai-command-a-03-2025",
	};

	// async chatCompletion(messages: []) {
	// 	return await IaModel.iaClient.chatCompletion({
	// 		...IaModel.defaultConfig,
	// 		messages,
	// 	});
	// }

	async chatIACompletion(messages: Message[]) {
		return await IaModel.iaClient.chatCompletion({
			...IaModel.IaConfig,
			messages: messages,
		});
	}

	// async chatIACompletionStream(messages: []) {
	// 	let out = "";
	// 	for await (const chunk of IaModel.iaClient.chatCompletionStream({
	// 		...IaModel.IaConfig,
	// 		messages,
	// 		max_tokens: 512,
	// 		temperature: 0.1,
	// 	})) {
	// 		if (chunk.choices && chunk.choices.length > 0) {
	// 			out += chunk.choices[0].delta?.content || "";
	// 			console.log(out)
	// 		}
	// 	}
	// 	console.log(`\nEste es el resultado final
	// 		\n${out}`)
	// }
}
