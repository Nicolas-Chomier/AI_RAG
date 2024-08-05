import '@radix-ui/themes/styles.css';
import './styles/theme.config.css';
import ReactQueryProvider from './utils/provider/reactQuerryProvider';
import { Theme } from '@radix-ui/themes';
import './styles/globals.css';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<Theme accentColor='indigo'>
					<ReactQueryProvider>
						<main>{children}</main>
					</ReactQueryProvider>
				</Theme>
			</body>
		</html>
	);
}

