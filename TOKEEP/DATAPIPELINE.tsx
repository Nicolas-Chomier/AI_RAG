import { ChromaClient } from 'chromadb';
import { buildChromaObject } from './buildChromaObject';
import chromaBuild from '../app/api/chromaDB';
import { extraction } from './extraction';
import { splitting } from './splitting';

import styles from './page.module.css';
import { addCollection } from './addCollection';
import { log } from 'console';
import { embedding } from './embedding';
import { getMetaPrompt } from './getMetaPrompt';
import { useMutation } from '@tanstack/react-query';
import { getAIResult } from './getAIResult';

const DATASOURCE = 'data/constitution.pdf';
const QUESTION = 'Combien de membres comprend le conseil constitutionnel ?';
export default async function Home() {
	// POST payload when payload is truthy
	const mutation = useMutation({
		mutationFn: (metaPrompt: any) => getAIResult(metaPrompt),
		onMutate: () => {
			console.log('Mutation started');
		},
		onSuccess: (response) => {
			console.log('Success', response);
		},
		onError: (error) => {
			console.log(error);
		},
		onSettled: () => {
			console.log('Settled');
		},
	});

	console.log('Hello');
	/* const rawText = await extraction(DATASOURCE);

	if (rawText) {
		const chunks = await splitting(rawText);
		const chromaObject = await buildChromaObject(chunks, DATASOURCE);

		const chroma = new ChromaClient({ path: 'http://localhost:8000' });
		const collection = await chroma.getOrCreateCollection({
			name: 'demo-1',
		});

		if (chromaObject) {
			console.log(chromaObject.ids);
			try {
				console.log('Adding collection...');
				const addResult = await collection.add({
					ids: chromaObject.ids,
					embeddings: chromaObject.embeddings,
					metadatas: chromaObject.metadatas ?? [],
					documents: chromaObject.documents ?? [],
				});
				console.log('Add result:', addResult);

				const count = await collection.count();
				console.log('Collection count:', count);
			} catch (error) {
				console.error('Error adding to collection:', error);
			}
		}

		const response = await collection.get({
			ids: ['cks-10', 'cks-11'],
			limit: 10,
			offset: 0,
		});
		console.log(response); }*/

	// Créer un client Chroma
	const chroma = new ChromaClient({ path: 'http://localhost:8000' });

	// Obtenir la collection
	const collection = await chroma.getCollection({ name: 'demo-1' });

	// Obtenir l'embedding de la question
	const questionEmbedding = await embedding([QUESTION]);

	// Effectuer la recherche
	const resultats = await collection.query({
		queryEmbeddings: questionEmbedding,
		nResults: 3, // Nombre de résultats souhaités
	});

	const metaPrompt = getMetaPrompt(QUESTION, resultats);

	console.log(metaPrompt);

	// Envoie du payload au serveur
	const handlePrompt = (metaPrompt: any) => {
		mutation.mutate({
			metaPrompt: metaPrompt,
		});
	};

	return (
		<main className={styles.main}>
			<button onClick={handlePrompt}>R.A.G</button>
		</main>
	);
}

