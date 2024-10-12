import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { lazy, Suspense } from 'react';
import SplashScreen from '../components/splash-screen';

const Layout = lazy(() => import('../components/Layout'));

export const Route = createRootRoute({
	component: () => (
		<Suspense fallback={<SplashScreen />}>
			<Layout>
				<Outlet />
				<TanStackRouterDevtools />
			</Layout>
		</Suspense>
	),
});
