import { TCollectionObject } from './addCollection';
import { embedding } from './embedding';

export const buildChromaObject = async (
	chunks: any[] | null,
	label: string,
): Promise<TCollectionObject | null> => {
	if (chunks && chunks.length > 0) {
		const processChunk = async (chunk: any, index: number) => {
			const from = chunk.metadata.loc.lines.from;
			const to = chunk.metadata.loc.lines.to;
			const chunkID = `cks-${index + 1}`;
			const metadata = createChromaObjectMetadata(
				label,
				from,
				to,
				chunkID,
			);
			const coreChunk = chunk.pageContent;
			const cleanedChunk = cleanChunk(coreChunk);
			const vector = await embedding([cleanedChunk]);

			return {
				id: chunkID,
				embeddings: vector[0],
				metadata,
				documents: cleanedChunk,
			};
		};

		const results = await Promise.all(chunks.map(processChunk));

		const chromaObject: TCollectionObject = {
			ids: [],
			embeddings: [],
			metadatas: [],
			documents: [],
		};

		results.forEach((result) => {
			chromaObject.ids.push(result.id);
			chromaObject.embeddings.push(result.embeddings);

			if (chromaObject.metadatas) {
				chromaObject.metadatas.push(result.metadata ?? {});
			}
			if (chromaObject.documents) {
				chromaObject.documents.push(result.documents ?? '');
			}
		});

		return chromaObject;
	}

	return null;
};

const createChromaObjectMetadata = (
	label: string,
	from: number,
	to: number,
	id: string,
) => {
	return { [id]: `${label}:${from}:${to}` };
};

const cleanChunk = (chunk: string): string => {
	// Remplacer les sauts de ligne multiples par un seul
	let clean = chunk.replace(/\n{2,}/g, '\n\n');
	// Supprimer les espaces en début et fin de ligne
	clean = clean.trim();
	// Supprimer les espaces multiples
	clean = clean.replace(/ {2,}/g, ' ');
	return clean.trim();
};
