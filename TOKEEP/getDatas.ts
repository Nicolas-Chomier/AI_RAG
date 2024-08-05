// Centralise la logique de gestion des erreurs
async function getData(url: URL | string, options: RequestInit | undefined) {
	console.log('getData', url, options);
	if (!url) {
		throw new Error('URL not found');
	}

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();

		if (!data) {
			throw new Error('API returned no data');
		}

		return data;
	} catch (error) {
		console.error('Error fetching data', error);
		throw error;
	}
}

// Asynchronisation de la fonction getData
export default async function getDatas(
	url: URL | string,
	options: RequestInit | undefined = undefined,
) {
	return getData(url, options);
}
