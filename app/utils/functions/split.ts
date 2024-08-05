import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { invalidResponse, validResponse } from './responses';
import { cleanAndFormatText } from './miscellaneous';

// Function to split a text into smaller chunks
export const split = async (file: any) => {
	console.log('=> split');

	const fileName = file.fileName ?? null;
	const dataToSplit = file?.fileData?.data ?? null;

	if (!file || !fileName || !dataToSplit) {
		return invalidResponse('No data provided inside split function');
	}

	// Check if the provided data is not empty
	if (dataToSplit.length === 0) {
		return invalidResponse('No data provided inside split function');
	}

	try {
		// Initialize the TextSplitter with splitting parameters
		const textSpliter = new RecursiveCharacterTextSplitter({
			chunkSize: 5000, // Maximum size of each chunk
			chunkOverlap: 0, // Number of overlapping characters between chunks
		});

		// Split the documents using the TextSplitter
		const chunks = await textSpliter.splitDocuments(dataToSplit);

		// Check if the splitting was successful
		if (!chunks || chunks.length === 0) {
			return invalidResponse('Error during the spliting of the text');
		}

		// Add a chunk IDs to each chunk
		const chunksWithID = chunks.map((chunk) => {
			const from = chunk.metadata.loc.lines.from;
			const to = chunk.metadata.loc.lines.to;

			return {
				...chunk,
				metadata: `${fileName}:${from}:${to}`,
			};
		});

		// Filtration of the chunks
		const filteredChunks = chunksWithID.map((chunk) => {
			const filteredChunk = cleanAndFormatText(chunk.pageContent);
			return {
				...chunk,
				pageContent: filteredChunk,
			};
		});

		// Check if the splitting was successful
		if (!filteredChunks || filteredChunks.length === 0) {
			return invalidResponse('Error during chunks filtration');
		}

		// Return the successfully split chunks
		return validResponse(filteredChunks);
	} catch (error) {
		console.error('Error during the text splitting phase:', error);
		return invalidResponse('Error during the splitting of the text');
	}
};
