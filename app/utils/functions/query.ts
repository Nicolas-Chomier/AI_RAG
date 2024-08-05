import { ChromaClient } from 'chromadb';
import { invalidResponse, validResponse } from './responses';

const path = process.env.VECTOR_DB_ADDRESS;

export async function query(fileName: string, numericValue: number[]) {
	console.log('=> query');
	if (fileName && numericValue) {
		const chroma = new ChromaClient({ path: path });
		const collection = await chroma.getCollection({ name: fileName });

		const results = await collection.query({
			queryEmbeddings: numericValue,
			nResults: 4,
		});

		if (results) return validResponse(results);

		return invalidResponse('Error during the database query');
	}
}
