import { invalidResponse, validResponse } from './responses';

const direct = true; //! Settings to deploy (BETA)

export const upload = async (file: File) => {
	console.log('=> upload');

	// Check if the parsed body contains any data
	if (!file || Object.keys(file).length === 0) {
		return invalidResponse('Request body must contain "file"');
	}

	// Extract the raw file data from the parsed body
	const rawFile = Object.values(file);

	// Check if the raw file data is empty
	if (rawFile.length === 0) {
		return invalidResponse('Uploaded file is empty');
	}

	if (direct) {
		return validResponse(rawFile);
	} else {
		// Map and filter the raw file data to get the page content
		const newFile = rawFile.map((page: any) => page.pageContent ?? '');
		const newFileFiltered = newFile.filter((page: any) => page !== '');

		// Check if the filtered file data is empty
		if (newFileFiltered.length === 0) {
			return invalidResponse('No valid page content found in "newFile"');
		}

		return validResponse(newFileFiltered);
	}
};
