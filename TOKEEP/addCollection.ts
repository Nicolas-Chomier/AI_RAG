import { Collection } from 'chromadb';

export interface TCollectionObject {
	ids: string[];
	embeddings: number[][];
	metadatas?: any[];
	documents?: string[];
}

export const addCollection = async (
	collection: Collection,
	collectionObject: TCollectionObject,
) => {
	try {
		console.log('adding collection', collectionObject);
		await collection.upsert({
			ids: collectionObject.ids,
			embeddings: collectionObject.embeddings,
			metadatas: collectionObject.metadatas ?? [],
			documents: collectionObject.documents ?? [],
		});
		console.log(collection);
		return collection;
	} catch (error) {
		console.log(error);
	}
};
