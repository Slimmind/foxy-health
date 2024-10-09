import { lazy } from 'react';
import { PanelType } from '../../utils/constants';
import './site-footer.styles.css';
import { useAuth } from '../../contexts/auth.context';

const Add = lazy(() => import('../add'));
const MainMenu = lazy(() => import('../main-menu'));
const Search = lazy(() => import('../search'));

type SiteFooterProps = {
	activePanel: string | null;
	handlePanel: (panel: PanelType) => void;
};

export const SiteFooter = ({ activePanel, handlePanel }: SiteFooterProps) => {
	const { currentUser } = useAuth();
	return (
		<footer className='site-footer'>
			{currentUser?.email && (
				<Search
					isActive={activePanel === 'search'}
					togglePanel={() =>
						handlePanel(activePanel === 'search' ? null : 'search')
					}
				/>
			)}
			<MainMenu
				isActive={activePanel === 'menu'}
				togglePanel={() => handlePanel(activePanel === 'menu' ? null : 'menu')}
			/>
			{currentUser?.email && (
				<Add
					isActive={activePanel === 'add'}
					togglePanel={() => handlePanel(activePanel === 'add' ? null : 'add')}
				/>
			)}
		</footer>
	);
};
