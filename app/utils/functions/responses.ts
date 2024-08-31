import { NextResponse } from 'next/server';

// Définition du type CollectionsResponse
type CollectionsResponse = {
	error: boolean;
	message: string;
	status: number;
	data?: any;
};

// Fonction validResponse existante
export const validResponse = (
	data: any = {},
	validMessage: string = 'OK',
): CollectionsResponse => {
	return {
		error: false,
		message: validMessage,
		status: 200,
		data: data,
	};
};

export const invalidResponse = (
	message: string = 'Une erreur est survenue',
	status: number = 500,
): CollectionsResponse => {
	return {
		error: true,
		message: message,
		status: status,
		// Pas de data dans le cas d'une erreur
	};
};

// Fonction utilitaire pour gérer les réponses d'erreur
export const errorResponse = (message: string, status: number) => {
	console.log(message, status);

	return NextResponse.json({ message: message }, { status: status });
};
