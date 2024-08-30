import { errorResponse } from '@/app/utils/functions/responses';
import { NextResponse } from 'next/server';

export async function GET() {
	const path = process.env.VECTOR_DB_ADDRESS;

	try {
		const response = await fetch(`${path}/api/v1`);

		if (!response.ok) {
			throw new Error('Failed to fetch from ChromaDB server');
		}

		const result = await response.json();
		if (!result) {
			throw new Error('Failed to fetch from ChromaDB server');
		}

		return NextResponse.json({ message: 'Ping' }, { status: 200 });
	} catch (error) {
		return errorResponse('Failed to fetch from ChromaDB server', 500);
	}
}
