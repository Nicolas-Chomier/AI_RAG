// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles

type TextBoxProps = {
	handleChange?: (value: string) => void;
	name: string;
	placeholder?: string;
	value: string;
	rows?: number;
	col?: number;
	readonly?: boolean;
	className?: string;
};

export const TextBox: React.FC<TextBoxProps> = ({
	handleChange,
	name,
	placeholder,
	value,
	rows = 8,
	col = 34,
	readonly,
	className,
}) => {
	const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (handleChange) {
			handleChange(event.target.value);
		}
	};

	return (
		<textarea
			className={className}
			id={name}
			name={name}
			rows={rows}
			cols={col}
			placeholder={placeholder}
			onChange={handleText}
			value={value}
			readOnly={readonly}
		></textarea>
	);
};
