import { lazy } from 'react';
import { PanelType } from '../../utils/constants';
import './site-footer.styles.css';

const MainMenu = lazy(() => import('../main-menu'));

type SiteFooterProps = {
	activePanel: string | null;
	handlePanel: (panel: PanelType) => void;
};

export const SiteFooter = ({ activePanel, handlePanel }: SiteFooterProps) => {
	return (
		<footer className='site-footer'>
			<MainMenu
				isActive={activePanel === 'menu'}
				togglePanel={() => handlePanel(activePanel === 'menu' ? null : 'menu')}
			/>
		</footer>
	);
};
