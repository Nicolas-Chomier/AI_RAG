import { NextRequest, NextResponse } from 'next/server';
import { EmbededQuestion } from '@/app/utils/types';
import { embed } from '@/app/utils/functions/embed';
import { getPrompt } from '@/app/utils/functions/getPrompt';
import { query } from '@/app/utils/functions/query';
import { errorResponse } from '@/app/utils/functions/responses';
import { ask } from '@/app/utils/functions/ask';

export async function POST(request: NextRequest) {
	console.log('=> QUESTION');

	if (request.method !== 'POST') {
		return errorResponse('Method not allowed', 405);
	}

	if (!request.body) {
		return errorResponse('No request body allowed', 400);
	}

	let question;
	let fileName;
	try {
		const result = (await request.json()) ?? null;
		question = result.question ?? null;
		fileName = result.fileName ?? null;
	} catch {
		return errorResponse('Invalid JSON body vlol', 400);
	}

	if (!question || !fileName) {
		return errorResponse('Name or data not found', 400);
	}

	// Convert simple question string to right format for embedding
	const formattedQuestion: EmbededQuestion = {
		data: [
			{
				id: 0,
				pageContent: question,
				metadata: '',
			},
		],
	};

	const embededQuestion = await embed(formattedQuestion);

	if (embededQuestion.error) {
		return errorResponse('Erorr during question embedding', 500);
	}

	const numericValue = embededQuestion?.data[0]?.embedding;

	const resultFromQuery = await query(fileName, numericValue);

	if (resultFromQuery?.error) {
		return errorResponse('Erorr during query', 500);
	}

	const superPrompt = getPrompt(resultFromQuery?.data?.documents, question);

	const answer = await ask(superPrompt);

	if (!answer) {
		return errorResponse('Erorr during query', 500);
	}
	console.log(answer);
	return NextResponse.json(answer, { status: 200 });
}
