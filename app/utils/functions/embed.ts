import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { invalidResponse, validResponse } from './responses';

const model = 'nomic-embed-text';

export const embed = async (file: any) => {
	console.log('=> embed');

	const dataToEmbed = file?.data ?? null;

	// Check if the provided data is not empty
	if (!dataToEmbed || dataToEmbed.length === 0) {
		return invalidResponse('No data provided to embed function');
	}

	try {
		// Initialize the OpenAI embedding model
		const embedingModel = new OllamaEmbeddings({
			baseUrl: process.env.EMBEDING_MODEL_ADRESS,
			model: model,
		});
		const embeddings = await embedFiles(dataToEmbed, embedingModel);

		// Check if the embedding was successful
		if (!embeddings || embeddings.length === 0) {
			throw new Error(
				'Error during text embedding (check if Ollama is wake up)',
			);
		}

		// Return the successfully embedded text
		return validResponse(embeddings);
	} catch (error: any) {
		console.error('Error during the embedding phase:', error.message);
		return invalidResponse(
			error.message ?? 'Error during the embedding of the text',
		);
	}
};

// Embed files function from main data
const embedFiles = async (dataToEmbed: any[], embedingModel: any) => {
	const embededFiles = await Promise.all(
		dataToEmbed.map(async (obj: any) => {
			const document = obj?.pageContent ?? null;

			if (document) {
				const embededText = await embedingModel.embedDocuments([
					document,
				]);
				obj['embedding'] = embededText[0];
			}

			return obj;
		}),
	);

	return embededFiles;
};
