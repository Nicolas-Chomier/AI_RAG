// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './Loader.module.css';

type LoaderProps = { width?: number; height?: number };

export const Loader: React.FC<LoaderProps> = ({ width = 58, height = 58 }) => {
	return (
		<span
			className={styles.loader}
			style={{ width: width, height: height }}
		></span>
	);
};
