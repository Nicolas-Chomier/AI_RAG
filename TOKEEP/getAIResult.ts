import { formatLLMOutput } from './formatLLMOutput';

// Endpoint pour recuperation des machines
const ollamaUrl = 'http://localhost:11434/api/generate';

export async function getAIResult(prompt: any) {
	if (!prompt) {
		throw new Error('Invalid user information');
	}

	const payload = {
		model: 'llama2-uncensored',
		prompt: prompt,
		format: 'json',
		stream: false,
	};

	try {
		const response = await fetch(ollamaUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		// Extraire le contenu JSON de la réponse
		const result = await response.json();

		const formattedResult = formatLLMOutput(result.response);

		return {
			message: 'Prompt sent successfully!',
			success: true,
			result: formattedResult,
		};
	} catch (error) {
		console.error('Error', error);
		throw error;
	}
}
