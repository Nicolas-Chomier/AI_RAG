'use client';
// React core
import React, { useRef, DragEvent, useState } from 'react';
// External modules / Third-party libraries
import { Button, Spinner } from '@radix-ui/themes';
import { Cloud, CloudUpload } from 'lucide-react';
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './DropZone.module.css';

interface FilePickerProps {
	handleFile: (file: File) => void;
	loading: boolean;
}

export const DropZone: React.FC<FilePickerProps> = ({
	handleFile,
	loading,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [icon, setIcon] = useState(false);

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

	const iconRender = () => {
		if (loading) {
			return <Spinner size='2' />;
		} else if (icon) {
			return <CloudUpload size={20} strokeWidth={1.8} />;
		}

		return <Cloud size={20} strokeWidth={1.8} />;
	};

	return (
		<div className={styles.container}>
			<Button
				onClick={handleClick}
				color='gray'
				variant='solid'
				radius='large'
				highContrast
			>
				Download
				{iconRender()}
			</Button>

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
