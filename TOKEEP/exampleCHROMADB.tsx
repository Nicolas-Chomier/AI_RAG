import { ChromaClient } from 'chromadb';
import { buildChromaObject } from './buildChromaObject';
import chromaBuild from '../app/api/chromaDB';
import { extraction } from './extraction';
import { splitting } from './splitting';

import styles from './page.module.css';

const DATASOURCE = 'data/constitution.pdf';

export default async function Home() {
	console.log('Hello');
	const rawText = await extraction(DATASOURCE);

	if (rawText) {
		const chunks = await splitting(rawText);
		const chromaObject = await buildChromaObject(chunks, DATASOURCE);
		console.log(chromaObject);

		const chroma = new ChromaClient({ path: 'http://localhost:8000' });
		const collection = await chroma.getOrCreateCollection({
			name: 'test-from-js-2',
		});
		for (let i = 0; i < 20; i++) {
			await collection.add({
				ids: ['test-id-' + i.toString()],
				embeddings: [1, 2, 3, 4, 5],
				documents: ['test'],
			});
		}
		const queryData = await collection.query({
			queryEmbeddings: [1, 2, 3, 4, 5],
			queryTexts: ['test'],
		});

		console.log(queryData);
	}

	return (
		<main className={styles.main}>
			<div>R.A.G</div>
		</main>
	);
}

