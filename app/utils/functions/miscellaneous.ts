// Build a dataset from the provided data
export const buildCollection = (data: any) => {
	const dataset: { [key: string]: any[] } = {
		ids: [],
		embeddings: [],
		metadatas: [],
		documents: [],
	};

	for (const [index, object] of data.entries()) {
		dataset.ids.push(`id-${index + 1}`);
		dataset.embeddings.push(object?.embedding);
		dataset.metadatas.push({
			chapter: `${object?.metadata}`,
		});
		dataset.documents.push(object?.pageContent);
	}

	const filteredDataset: { [key: string]: any[] } = {};
	for (const key in dataset) {
		if (dataset[key].length > 0) {
			filteredDataset[key] = dataset[key];
		}
	}

	return filteredDataset;
};

// Clean the file name to remove special characters and extensions
export const cleanFileName = (fileName: string) => {
	if (!fileName) return null;

	// replace all non-alphanumeric characters with underscores
	let cleanedName = fileName.replace(/[^a-zA-Z0-9]/g, '_');

	// remove the choosen extension (.pdf) if it exists
	cleanedName = cleanedName.replace(/\.pdf$/i, '');

	return cleanedName;
};

// Verifie si le fichier est valide (BETA)
const MAX_SIZE = 7 * 1024 * 1024; // 7 MB
const ERRORS = {
	OK: 'Fichier valide',
	NO_PDF: 'Aucun fichier sélectionné',
	NOT_PDF: 'Veuillez sélectionner un fichier PDF',
	TOO_LARGE: 'Veuillez sélectionner un fichier de moins de 5Mo',
	EMPTY: 'Veuillez sélectionner un fichier PDF non vide',
	NO_NAME: 'Le fichier doit avoir un nom valide',
};

export const checkFile = (file: File) => {
	if (!file) {
		return { isValid: false, message: ERRORS.NO_PDF };
	}

	if (file.type !== 'application/pdf') {
		return { isValid: false, message: ERRORS.NOT_PDF };
	}

	if (file.size > MAX_SIZE) {
		return { isValid: false, message: ERRORS.TOO_LARGE };
	}

	if (file.size === 0) {
		return { isValid: false, message: ERRORS.EMPTY };
	}

	if (!file.name) {
		return { isValid: false, message: ERRORS.NO_NAME };
	}

	return { isValid: true, message: ERRORS.OK };
};

// Filtering the data based on the provided filters
export const cleanAndFormatText = (text: string): string => {
	return (
		text
			// Supprime les puces de liste et la numérotation
			.replace(/^[\s•\-*+]+(.*)/gm, '$1')
			//.replace(/^\d+\.\s*/gm, '')
			//.replace(/^[a-zA-Z]\)\s*/gm, '')
			//.replace(/^[[({]?[a-zA-Z0-9]+[\])}]?\s*/gm, '')

			// Supprime tous les caractères non alphanumériques,
			// sauf les lettres accentuées, les chiffres et les espaces
			.replace(/[^a-zA-Z0-9\u00C0-\u017F\s]/g, '')

			// Normalise les espaces (remplace les séquences d'espaces par un seul espace)
			.replace(/\s+/g, ' ')

			// Supprime les espaces au début et à la fin de la chaîne
			.trim()
	);
};
