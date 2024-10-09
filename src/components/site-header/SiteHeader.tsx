import { lazy } from 'react';
import { PanelType } from '../../utils/constants';
import './site-header.styles.css';

const Auth = lazy(() => import('../auth'));
const Time = lazy(() => import('../time'));
const SiteLogo = lazy(() => import('../site-logo'));

type SiteHeaderProps = {
	activePanel: string | null;
	handlePanel: (panel: PanelType) => void;
};

export const SiteHeader = ({ activePanel, handlePanel }: SiteHeaderProps) => {
	return (
		<header className='site-header'>
			<SiteLogo />
			<Time
				isActive={activePanel === 'time'}
				togglePanel={() => handlePanel(activePanel === 'time' ? null : 'time')}
			/>
			<Auth
				isActive={activePanel === 'auth'}
				togglePanel={() => handlePanel(activePanel === 'auth' ? null : 'auth')}
			/>
		</header>
	);
};
