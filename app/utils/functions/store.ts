import { ChromaClient } from 'chromadb';
import { buildCollection } from './miscellaneous';
import { invalidResponse, validResponse } from './responses';

const path = process.env.VECTOR_DB_ADDRESS;

export const store = async (file: any) => {
	console.log('=> store');

	const fileName = file.fileName ?? null;
	const dataToStore = file?.fileData?.data ?? null;

	if (!file || !fileName || !dataToStore) {
		return invalidResponse('No data provided inside store function');
	}

	// Check if the provided data is not empty
	if (dataToStore.length === 0) {
		return invalidResponse('No data provided inside store function');
	}

	// Store with CHROMADB
	try {
		const chroma = new ChromaClient({ path: path });
		const collection = await chroma.getOrCreateCollection({
			name: fileName,
			metadata: { 'hnsw:space': 'cosine' },
		});

		const dataset = buildCollection(dataToStore);

		if (collection.name) {
			await collection.upsert({
				ids: dataset.ids,
				embeddings: dataset.embeddings,
				metadatas: dataset.metadatas,
				documents: dataset.documents,
			});
		} else {
			throw new Error('collection not found');
		}

		const count = await collection.count();
		if (count === 0) {
			throw new Error('Problem with upserting data');
		}

		const resultObject = { dataset: dataset, count: count };

		return validResponse(resultObject);
	} catch (error) {
		console.error('Error during the storage phase:', error);

		return invalidResponse(
			`Error to connect to ChromaDB, check if it is running`,
		);
	}
};
