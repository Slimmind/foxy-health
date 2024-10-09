import { useState } from 'react';
import clsx from 'clsx';
import { useAuth } from './contexts/auth.context';
import { PanelType, PanelTypes } from './utils/constants';
import SiteHeader from './components/site-header';
import SiteFooter from './components/site-footer';
import './index.css';

function App() {
	const { currentUser } = useAuth();
	const [activePanel, setActivePanel] = useState<PanelType>(
		currentUser?.uid ? null : (PanelTypes.AUTH as PanelType)
	);

	const mainClasses = clsx('main', !!currentUser?.uid && 'main--authorized');

	return (
		<>
			<SiteHeader activePanel={activePanel} handlePanel={setActivePanel} />
			<main className={mainClasses}></main>
			<SiteFooter activePanel={activePanel} handlePanel={setActivePanel} />
		</>
	);
}

export default App;
