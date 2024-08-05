export type TFile = any;

export type TFinalResponse = {
	dataset: TDataset;
	count: number;
};

export type TDataset = {
	ids: string[];
	embeddings: number[][];
	metadatas: Metadatas;
	documents: string[];
};

export type ResponseData = {
	message: string;
	data: TDataset;
};

export type EmbededQuestion = {
	data: [
		{
			id: number;
			pageContent: string;
			metadata: string;
		},
	];
};
