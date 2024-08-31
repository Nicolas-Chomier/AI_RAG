'use server';
import { ChromaClient } from 'chromadb';
import { invalidResponse, validResponse } from './responses';

const path = process.env.VECTOR_DB_ADDRESS;

export const collections = async () => {
	console.log('collections');

	try {
		const chroma = new ChromaClient({ path: path });
		const collectionsList = await chroma.listCollections();

		if (!collectionsList.length) {
			throw new Error('No collections found');
		}

		return validResponse(collectionsList);
	} catch (error) {
		console.error('Error during the storage phase:', error);
		return invalidResponse(error as string);
	}
};
