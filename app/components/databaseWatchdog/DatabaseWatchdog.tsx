// React core
import React from 'react';
// External modules / Third-party libraries
import { useQuery } from '@tanstack/react-query';
import { Database, DatabaseZap } from 'lucide-react';
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './DatabaseWatchdog.module.css';
import { Loader } from '../UI/buttons/loader/Loader';

const WATCHDOG_URL = 'http://localhost:3000/api/watchdog/chromaDB';

export const DatabaseWatchdog: React.FC = () => {
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

	if (isLoading) return <Loader width={30} height={30} />;
	return (
		<div className={styles.container}>
			{data ? (
				<Database
					size={28}
					strokeWidth={1.8}
					color='var(--color-success)'
				/>
			) : (
				<DatabaseZap
					size={28}
					strokeWidth={1.8}
					color='var(--color-error)'
				/>
			)}
		</div>
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
