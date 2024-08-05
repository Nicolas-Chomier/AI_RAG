export const formatLLMOutput = (input: any): string => {
	// Convertir l'entrée en chaîne de caractères
	let rawText = processStructure(input);
	// Appliquer le formatage existant
	let cleanedText = rawText
		.trim()
		.replace(/[\n\r\t]/g, '')
		.replace(/\s+/g, ' ');
	cleanedText = cleanedText.replace(/([.!?])\s*/g, '$1\n\n');
	cleanedText = cleanedText.replace(/(\d+\.\s)/g, '\n$1');
	cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');

	const keywords = ['important', 'crucial', 'essentiel', 'clé'];
	keywords.forEach((keyword) => {
		const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
		cleanedText = cleanedText.replace(regex, `**${keyword}**`);
	});

	cleanedText = cleanedText.replace(/```([\s\S]*?)```/g, (match, p1) => {
		return `\n\nCode :\n\`\`\`\n${p1.trim()}\n\`\`\`\n\n`;
	});

	return String(cleanedText);
};

// Fonction récursive pour traiter les objets et tableaux
const processStructure = (item: any, depth: number = 0): string => {
	const indent = '  '.repeat(depth);

	if (Array.isArray(item)) {
		return item
			.map((el, index) => `${indent}- ${processStructure(el, depth + 1)}`)
			.join('\n');
	} else if (typeof item === 'object' && item !== null) {
		return Object.entries(item)
			.map(
				([key, value]) =>
					`${indent}${key}: ${processStructure(value, depth + 1)}`,
			)
			.join('\n');
	} else {
		return String(item);
	}
};
