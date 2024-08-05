'use client';
// React core
import React, { useRef, DragEvent, useState } from 'react';
// External modules / Third-party libraries
import { Cloud, CloudUpload } from 'lucide-react';
// Local components
import { Loader } from '../loader/Loader';
// Hooks and utilities
// Configuration
// Styles
import styles from './DropZone.module.css';

const Title = 'Drag & drop files here';

interface FilePickerProps {
	handleFile: (file: File) => void;
	loading: boolean;
	title: string;
}

export const DropZone: React.FC<FilePickerProps> = ({
	handleFile,
	loading,
	title,
}) => {
	const [icon, setIcon] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileDrop = (e: DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file: File = e.dataTransfer.files[0];
		if (file.type === 'application/pdf') {
			handleFile(file);
			setIcon(false);
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleDragOver = () => {
		setIcon(true);
	};

	const handleDragLeave = () => {
		setIcon(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>{title ?? Title}</div>

			{loading ? (
				<div className={styles.loaderWrapper}>
					<Loader />
				</div>
			) : (
				<button
					onClick={handleClick}
					type='button'
					className={styles.button}
				>
					{icon ? (
						<CloudUpload
							color='var(--Light)'
							size={80}
							strokeWidth={1.6}
						/>
					) : (
						<Cloud
							color='var(--Light)'
							size={80}
							strokeWidth={1.6}
						/>
					)}
				</button>
			)}

			<input
				className={styles.input}
				ref={fileInputRef}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleFileDrop}
				id='pdf'
				type='file'
				accept='.pdf'
				onChange={(e) => {
					if (e.target.files) {
						handleFile(e.target.files[0]);
					}
				}}
			/>
		</div>
	);
};
