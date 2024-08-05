'use client';
import { useState } from 'react';
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';
import { useMutation } from '@tanstack/react-query';
import { checkFile, cleanFileName } from './utils/functions/miscellaneous';
import { TDataset } from './utils/types';
import toast, { Toaster } from 'react-hot-toast';
import { ControlArea } from './components/controlArea/ControlArea';
import { AnswerArea } from './components/answer/AnswerArea';
import { QuestionArea } from './components/question/QuestionArea';
import styles from './styles/page.module.css';

const Home = () => {
	const [fileName, setFileName] = useState('');
	const [fileLoading, setFileLoading] = useState(false);
	const [answerIsLoading, setAnswerIsLoading] = useState(false);
	const [dataset, setDataset] = useState<TDataset | undefined>(undefined);
	const [answer, setAnswer] = useState('');

	const uploadingFile = useMutation({
		mutationFn: (document: any) => {
			return fetch('/api/Indexing', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(document),
			});
		},
		onMutate: (document) => {
			setFileName(document[0]);
			setDataset(undefined);
			setFileLoading(true);
		},
		onSuccess: async (response) => {
			const result = await response.json();
			if (response.status === 200) {
				toast.success(`${result.data.count} File(s) uploaded`);
				setDataset(result.data.dataset);
			} else {
				setFileName('');
				setDataset(undefined);
				toast.error(
					result.message ??
						'Une erreur inconnue est survenue. Veuillez réessayer.',
				);
			}
		},
		onError: (error) => {
			toast.error(
				'Une erreur inconnue est survenue. Veuillez réessayer.',
			);
			console.error(error);
		},
		onSettled: () => {
			setFileLoading(false);
		},
	});

	// Load the droped file and send it to the API
	const handleFile = async (file: File) => {
		const validationResult = checkFile(file);
		if (!validationResult.isValid) return alert(validationResult.message);

		const fileName = cleanFileName(file.name) ?? '';
		const fileType = file.type;
		const reader = new FileReader();

		try {
			reader.onload = async (event) => {
				const fileData = event.target?.result;
				if (fileData) {
					const blob = new Blob([fileData], {
						type: fileType,
					});

					const loader = new WebPDFLoader(blob);
					const documents = await loader.load();
					uploadingFile.mutate([fileName, { ...documents }]);
				}
			};
		} catch (error) {
			console.error('Erreur lors du chargement du PDF:', error);
		} finally {
			reader.readAsArrayBuffer(file);
		}
	};

	const generation = useMutation({
		mutationFn: (document: any) => {
			return fetch('/api/generation', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(document),
			});
		},
		onMutate: () => {
			setAnswerIsLoading(true);
		},
		onSuccess: async (response) => {
			const result = await response.json();
			if (response.status === 200) {
				setAnswer(result.result);
			} else {
				setAnswer('');
			}
		},
		onError: (error) => {
			toast.error("This didn't work.");
			console.error(error);
		},
		onSettled: () => {
			setAnswerIsLoading(false);
		},
	});

	// Send question to backend
	const handleSendQuestion = (question: string) => {
		if (fileName) {
			generation.mutate({ fileName: fileName, question: question });
		}
	};

	return (
		<div className={styles.container}>
			<Toaster />
			<div className={styles.top}>
				<ControlArea
					handleFile={handleFile}
					title={'R.A.G Admin panel'}
					isLoading={fileLoading}
					fileName={fileName}
				/>
			</div>

			<div className={styles.middle}>
				<AnswerArea
					answerIsLoading={answerIsLoading}
					answerValue={answer}
				/>
			</div>

			<div className={styles.bottom}>
				<QuestionArea
					handleSendQuestion={handleSendQuestion}
					placeholder={'Une question ?'}
				/>
			</div>
		</div>
	);
};

export default Home;

