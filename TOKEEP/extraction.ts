import fs from 'fs/promises';
import path from 'path';
import pdfParse from 'pdf-parse';

export const extraction = async (pdfPath: string) => {
	try {
		const absolutePath = path.resolve(pdfPath); // Convertir en chemin absolu
		await fs.access(absolutePath); // Vérifier si le fichier existe
		const buffer = await fs.readFile(absolutePath);
		const result = await pdfParse(buffer);
		return result.text;
	} catch (error) {
		if (error === 'ENOENT') {
			console.error(`Le fichier n'existe pas: ${pdfPath}`);
		} else {
			console.error('Erreur lors du traitement du PDF:', error);
		}
		return null;
	}
};
