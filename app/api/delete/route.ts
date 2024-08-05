import { NextRequest, NextResponse } from 'next/server';
import { ChromaClient } from 'chromadb';
import { errorResponse } from '@/app/utils/functions/responses';

export async function GET(request: NextRequest) {
	if (request.method !== 'GET') {
		return errorResponse('Method not allowed', 405);
	}

	if (request.body) {
		return errorResponse('Request body must be empty', 400);
	}

	const fileName: string | null = request.headers.get('Accept') ?? null;

	if (!fileName) {
		return errorResponse('Accept header is missing', 400);
	}

	const path = process.env.VECTOR_DB_ADDRESS;

	try {
		const client = new ChromaClient({ path: path });
		const collection = await client.getCollection({
			name: fileName,
		});

		if (collection.name === fileName) {
			const _ = await client.deleteCollection({ name: fileName });

			return NextResponse.json(
				{ message: 'Collection remove from Database' },
				{ status: 200 },
			);
		} else {
			throw new Error('Database not found');
		}
	} catch (error) {
		console.log(error);

		return errorResponse(`${'Error during indexing'}`, 404);
	}
}
