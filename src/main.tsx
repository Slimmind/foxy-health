import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/auth.context';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</StrictMode>
	);
}
