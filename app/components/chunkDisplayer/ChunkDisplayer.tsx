// React core
import React, { useMemo } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './ChunkDisplayer.module.css';

type ChunkDisplayerProps = {
	chunks?: string[];
};

export const ChunkDisplayer: React.FC<ChunkDisplayerProps> = ({
	chunks = [],
}) => {
	const chunksToDisplay = useMemo(() => chunks.slice(0, 100), [chunks]);

	if (chunksToDisplay.length === 0) return null;

	return (
		<div className={styles.container}>
			{chunksToDisplay.map((chunk, index) => (
				<div key={index}>{chunk}</div>
			))}
		</div>
	);
};
