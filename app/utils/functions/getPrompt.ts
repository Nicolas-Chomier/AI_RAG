import { patternFR } from '../constant/globalPrompt';

export const getPrompt = (contexte: string[], question: string) => {
	const flatContexte = contexte.flat();

	const formattedPrompt = `
    Démarche :
    ${patternFR.demarche.trim()}

    Contexte :
    ${patternFR.contexteIntroduction.trim()}
    ${flatContexte.map((chunk) => `- ${chunk}`).join('\n')}

    Question de l'utilisateur :
    ${question}
    `;

	return formattedPrompt;
};
