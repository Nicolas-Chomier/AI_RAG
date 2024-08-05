import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';

const embedder = new OllamaEmbeddings({
	baseUrl: 'http://localhost:11434',
	model: 'nomic-embed-text',
});

export const embedding = async (text: any[]) => {
	const embeddings = embedder.embedDocuments(text);
	return embeddings;
};
