// Endpoint pour recuperation des machines
const ollamaUrl = 'http://127.0.0.1:11434/api/generate';

export async function ask(prompt: any) {
	if (!prompt) {
		throw new Error('Invalid user information');
	}

	const payload = {
		model: 'dolphin-llama3',
		prompt: prompt,
		options: {
			temperature: 0.6,
		},
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
			console.log('Server response:', await response.text());
			throw new Error(
				`Network response was not ok: ${response.status} ${response.statusText}`,
			);
		}

		// Extraire le contenu JSON de la réponse
		const result = await response.json();

		if (!result?.response) {
			throw new Error(
				`Network response was not ok: ${response.status} ${response.statusText}`,
			);
		}

		return {
			message: 'Prompt sent successfully!',
			success: true,
			result: result.response,
		};
	} catch (error) {
		console.error('Error', error);
		throw error;
	}
}
