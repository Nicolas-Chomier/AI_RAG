import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export const splitting = async (text: string) => {
	const splitter = new RecursiveCharacterTextSplitter({
		chunkSize: 800,
		chunkOverlap: 80,
		lengthFunction: (text: string) => text.length,
	});
	try {
		const chunks = await splitter.createDocuments([text]);
		return chunks;
	} catch (error) {
		console.error('Erreur lors de la phase de segmentation:', error);
		return null;
	}
};
