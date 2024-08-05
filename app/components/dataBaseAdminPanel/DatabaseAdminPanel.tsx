// React core
import React from 'react';
// External modules / Third-party libraries
import { Database, DatabaseZap } from 'lucide-react';
import { Avatar, Flex, IconButton, Popover, Spinner } from '@radix-ui/themes';
// Local components
// Hooks and utilities
// Configuration
import { useQuery } from '@tanstack/react-query';
// Styles

const WATCHDOG_URL = 'http://localhost:3000/api/watchdog/chromaDB';

export const DatabaseAdminPanel: React.FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['ChromaDB_watchdog', WATCHDOG_URL],
		queryFn: () => apiService(WATCHDOG_URL),
		retry: 1,
		enabled: true,
		refetchOnWindowFocus: false,
		staleTime: 0,
		gcTime: 0,
		refetchInterval: 1000 * 10,
	});

	if (isLoading) return <Spinner size='2' />;

	return (
		<Popover.Root>
			<Popover.Trigger>
				<IconButton
					radius='large'
					color={data ? 'grass' : 'red'}
					variant='solid'
				>
					{data ? <Database size={20} /> : <DatabaseZap size={20} />}
				</IconButton>
			</Popover.Trigger>
			<Popover.Content width='360px'>
				<Flex gap='3'>
					<Avatar
						size='2'
						src='https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop'
						fallback='A'
						radius='full'
					/>
				</Flex>
			</Popover.Content>
		</Popover.Root>
	);
};

const apiService = async (url: string) => {
	const response = await fetch(url, {
		method: 'GET',
		cache: 'no-store',
		headers: {
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
		},
	});

	if (response.ok) {
		const res = await response.json();
		return res.message;
	} else {
		return null;
	}
};
