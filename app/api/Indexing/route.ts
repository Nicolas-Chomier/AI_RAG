import { NextRequest, NextResponse } from 'next/server';
import { embed } from '@/app/utils/functions/embed';
import { errorResponse } from '@/app/utils/functions/responses';
import { split } from '@/app/utils/functions/split';
import { store } from '@/app/utils/functions/store';
import { upload } from '@/app/utils/functions/upload';

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return errorResponse('Method not allowed', 405);
	}

	if (!request.body) {
		return errorResponse('Request body is missing', 400);
	}

	let result;
	try {
		result = await request.json();
	} catch {
		return errorResponse('Invalid JSON body', 400);
	}

	const [fileName, fileData] = result;
	if (!fileName || !fileData) {
		return errorResponse('Name or data not found', 400);
	}

	try {
		const newFile = await handleUpload(fileData);
		const newSplitedFile = await handleSplit(fileName, newFile);
		const newEmbededFile = await handleEmbed(newSplitedFile);
		const newStoredFile = await handleStore(fileName, newEmbededFile);

		return NextResponse.json({ ...newStoredFile }, { status: 200 });
	} catch (error: any) {
		console.log(error.message);
		return errorResponse(error.message, 500);
	}
}

// Handle the file upload
async function handleUpload(fileData: any) {
	const newFile = await upload(fileData);
	if (newFile.error) {
		throw new Error(`${newFile.message ?? 'Error during file upload'}`);
	}
	return newFile;
}

// Handle the file splitting
async function handleSplit(fileName: string, fileData: any) {
	const newSplitedFile = await split({ fileName, fileData });
	if (newSplitedFile.error) {
		throw new Error(
			`${newSplitedFile.message ?? 'Error during file splitting'}`,
		);
	}
	return newSplitedFile;
}

// Handle the file embedding
async function handleEmbed(splitedFile: any) {
	const newEmbededFile = await embed(splitedFile);
	if (newEmbededFile.error) {
		throw new Error(
			`${newEmbededFile.message ?? 'Error during file embedding'}`,
		);
	}
	return newEmbededFile;
}

// Handle the file storage
async function handleStore(fileName: string, embededFile: any) {
	const newStoredFile = await store({ fileName, fileData: embededFile });
	if (newStoredFile.error) {
		throw new Error(
			`${newStoredFile.message ?? 'Error during file storage'}`,
		);
	}
	return newStoredFile;
}
