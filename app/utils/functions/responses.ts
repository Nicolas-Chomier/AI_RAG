import { NextResponse } from 'next/server';

export const validResponse = (
	data: any = {},
	validMessage: string | undefined = 'OK',
) => {
	return {
		error: false,
		message: validMessage,
		status: 200,
		data: data,
	};
};

export const invalidResponse = (
	errorMessage: string,
	statusCode: number = 400,
) => {
	return {
		error: true,
		message: errorMessage,
		status: statusCode,
	};
};

// Fonction utilitaire pour gérer les réponses d'erreur
export const errorResponse = (message: string, status: number) => {
	console.log(message, status);

	return NextResponse.json({ message: message }, { status: status });
};
