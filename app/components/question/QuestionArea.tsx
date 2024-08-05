// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import { SendHorizontal } from 'lucide-react';
// Local components
import { Flex, IconButton } from '@radix-ui/themes';
import { TextBox } from '../textBox/TextBox';
// Hooks and utilities
// Configuration
// Styles
import styles from './QuestionArea.module.css';

type QuestionAreaProps = {
	handleSendQuestion: (value: string) => void;
	placeholder?: string;
};

export const QuestionArea: React.FC<QuestionAreaProps> = ({
	handleSendQuestion,
	placeholder = '',
}) => {
	const [question, setQuestion] = useState('');

	const handleQuestion = (value: string) => {
		setQuestion(value);
	};

	return (
		<Flex gap='2' className={styles.questionBox}>
			<TextBox
				name={'QuestionBox'}
				placeholder={placeholder}
				handleChange={handleQuestion}
				value={question}
				className={styles.textArea}
			></TextBox>
			<IconButton
				size={'4'}
				radius='large'
				color='gray'
				variant='solid'
				highContrast
				onClick={() => handleSendQuestion(question)}
			>
				<SendHorizontal size={26} strokeWidth={1.8} />
			</IconButton>
		</Flex>
	);
};
