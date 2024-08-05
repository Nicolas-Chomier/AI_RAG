// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './Buttons.module.css';

type ResetButtonProps = {
	handleClick: () => void;
	title?: string;
	className?: string;
};

export const Button: React.FC<ResetButtonProps> = ({
	title,
	className,
	handleClick,
}) => {
	return (
		<button
			onClick={handleClick}
			className={`${styles.reset} ${className}`}
		>
			{title}
		</button>
	);
};
