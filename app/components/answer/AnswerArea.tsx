// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { TextBox } from '../textBox/TextBox';
import { Loader } from '../loader/Loader';
// Hooks and utilities
// Configuration
// Styles
import styles from './AnswerArea.module.css';

type AnswerAreaProps = {
	answerIsLoading: boolean;
	answerValue: string;
};

export const AnswerArea: React.FC<AnswerAreaProps> = ({
	answerIsLoading,
	answerValue,
}) => {
	console.log(answerIsLoading);
	return (
		<div className={styles.container}>
			{answerIsLoading ? (
				<Loader height={100} width={100} />
			) : (
				answerValue && (
					<TextBox
						className={styles.answerBox}
						name='AnswerBox'
						value={answerValue}
						rows={20}
						readonly
					/>
				)
			)}
		</div>
	);
};
