'use server';
import { ChromaClient } from 'chromadb';
import { embedding } from './embedding';
import { getMetaPrompt } from './getMetaPrompt';

export default async function search(question: string = '') {
	console.log('Hello');

	const questionEmbedding = await embedding([question]);

	if (questionEmbedding) {
		const chroma = new ChromaClient({ path: 'http://localhost:8000' });
		const collection = await chroma.getCollection({ name: 'demo-1' });

		console.log(collection);

		const results = await collection.query({
			queryEmbeddings: questionEmbedding,
			nResults: 5,
		});
		const metaPrompt = getMetaPrompt(question, results);

		console.log(metaPrompt);
		return metaPrompt;
	}
}
