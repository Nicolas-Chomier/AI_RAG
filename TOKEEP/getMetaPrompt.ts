export const getMetaPrompt = (prompt: string, resultats: any) => {
	const docs = resultats?.documents;

	if (docs) {
		const promptM = `Tu dois répondre à la question suivante : \n "${prompt}" \n en utilisant uniquement les informations qui sont dans le contexte suivant : \n"${docs.flat()}"`;
		console.log(promptM);

		return promptM;
	}
};
