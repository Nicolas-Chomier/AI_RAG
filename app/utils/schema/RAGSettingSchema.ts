// schemas/loginSchema.js
import { z, ZodType } from 'zod';
import { settings } from '../constant/RAGSettings';

export const AvailableModels = Object.fromEntries(
	settings.model.map((model) => [model, model]),
);

export const AvailableFilters = Object.fromEntries(
	settings.filters.map((filter) => [filter, filter]),
);

export const AvailableRetrivalAlgorithme = Object.fromEntries(
	settings.filters.map((filter) => [filter, filter]),
);

export type RAGSettingSchemaProps = {
	file_size: number[];
	model: keyof typeof AvailableModels;
	chunk_size: string;
	chunk_overflow: string;
	filters: keyof typeof AvailableFilters;
	temperature: string;
	query_result: number[];
	retrival_algorithme: keyof typeof AvailableRetrivalAlgorithme;
};

export const RAGSettingSchema: ZodType<RAGSettingSchemaProps> = z.object({
	file_size: z.array(z.number().min(1).max(10)),
	model: z.enum(settings.model as [string, ...string[]]),
	chunk_size: z.string(),
	chunk_overflow: z.string(),
	filters: z.enum(settings.filters as [string, ...string[]]),
	temperature: z.string(),
	query_result: z.array(z.number().min(1).max(6)),
	retrival_algorithme: z.enum(
		settings.retrival_algorithme as [string, ...string[]],
	),
});
