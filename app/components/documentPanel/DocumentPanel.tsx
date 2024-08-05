// React core
import React from 'react';
// External modules / Third-party libraries
import { Flex, IconButton, Popover, Text } from '@radix-ui/themes';
import { FileText } from 'lucide-react';
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './DocumentPanel.module.css';

type DocumentPanelProps = { chunks?: string[] };

export const DocumentPanel: React.FC<DocumentPanelProps> = ({
	chunks = [],
}) => {
	return (
		<Popover.Root>
			<Popover.Trigger>
				<IconButton
					radius='large'
					color='gray'
					variant='solid'
					highContrast
				>
					<FileText size={20} />
				</IconButton>
			</Popover.Trigger>
			<Popover.Content width='360px'>
				<Flex gap='3'></Flex>
			</Popover.Content>
		</Popover.Root>
	);
};
