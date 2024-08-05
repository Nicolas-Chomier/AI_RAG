'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './ResetButton.module.css';

type ResetButtonProps = {
	collectionToDelete: string;
};

export const ResetButton: React.FC<ResetButtonProps> = ({
	collectionToDelete,
}) => {
	const handleReset = async () => {
		try {
			const response = await fetch(`/api/delete`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: collectionToDelete,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			alert(data.message);
		} catch (error) {
			alert('Une erreur est survenue, veuillez réessayer.');
		}
	};

	return (
		<button onClick={handleReset} className={styles.button}>
			Reset
		</button>
	);
};
