// React core
import React from 'react';
// External modules / Third-party libraries
import { Flex, Heading } from '@radix-ui/themes';
// Local components
import { DropZone } from '../dropZone/DropZone';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';
import { DatabaseAdminPanel } from '../dataBaseAdminPanel/DatabaseAdminPanel';
import { DocumentPanel } from '../documentPanel/DocumentPanel';
// Hooks and utilities
// Configuration
// Styles

type ControlAreaProps = {
	handleFile: (file: File) => void;
	title: string;
	isLoading: boolean;
	fileName?: string;
};

export const ControlArea: React.FC<ControlAreaProps> = ({
	handleFile,
	title,
	isLoading,
	fileName = '',
}) => {
	return (
		<Flex direction='row' gap='1' align='center' justify='between' px={'4'}>
			<Flex direction='column' gap='3' align='start' justify='between'>
				<Heading size={'7'} weight={'light'}>
					{fileName || title}
				</Heading>
			</Flex>
			<Flex direction='row' gap='3' align='center' justify='between'>
				<DropZone
					handleFile={handleFile}
					loading={isLoading}
				></DropZone>
				<DocumentPanel />
				<SettingsPanel />
				<DatabaseAdminPanel />
			</Flex>
		</Flex>
	);
};
