// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import { Flex, IconButton, Popover, Text } from '@radix-ui/themes';
import { FileText } from 'lucide-react';
// Local components
// Hooks and utilities
import { collections } from '@/app/utils/functions/collections';
// Configuration
// Styles

export const DocumentPanel: React.FC = () => {
	const [chromaCollectionList, setChromaCollectionList] = useState([]);

	const handleCollections = async () => {
		const collectionsList = await collections();

		if (!collectionsList.error && collectionsList.data) {
			setChromaCollectionList(collectionsList.data);
		}
		return null;
	};

	return (
		<Popover.Root>
			<Popover.Trigger>
				<IconButton
					radius='large'
					color='gray'
					variant='solid'
					highContrast
					onClick={handleCollections}
				>
					<FileText size={20} />
				</IconButton>
			</Popover.Trigger>
			<Popover.Content maxHeight={'400px'}>
				<Flex align='start' gap='4' direction='column'>
					{chromaCollectionList.map((collection: any) => {
						return (
							<DataListItem
								collectionInfo={collection}
								key={`data-list-${collection.id}`}
							/>
						);
					})}
				</Flex>
			</Popover.Content>
		</Popover.Root>
	);
};

type CollectionInfo = {
	id: string;
	name: string;
	metadata: {
		'hnsw:space': string;
	};
	dimension: number;
	tenant: string;
	database: string;
	version: number;
};

type DataListProps = { collectionInfo: CollectionInfo };

export const DataListItem: React.FC<DataListProps> = ({ collectionInfo }) => {
	return (
		<Flex align='start' direction='column'>
			<Flex align='start' gap='1' direction='row'>
				<Text size='3'>Name:</Text>
				<Text size='3' color='orange'>
					{collectionInfo.name ?? 'N/A'}
				</Text>
			</Flex>
			<Flex align='start' gap='1' direction='row'>
				<Text size='3'>Dimension:</Text>
				<Text size='3'>{collectionInfo.dimension ?? 'N/A'}</Text>
			</Flex>
			<Flex align='start' gap='1' direction='row'>
				<Text size='3'>Database:</Text>
				<Text size='3'>{collectionInfo.database ?? 'N/A'}</Text>
			</Flex>
		</Flex>
	);
};
