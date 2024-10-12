import { PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import SiteFooter from '../site-footer';
import SiteHeader from '../site-header';
import { PanelType, PanelTypes } from '../../utils/constants';
import { useAuth } from '../../contexts/auth.context';
import './layout.styles.css';

export const Layout = ({ children }: PropsWithChildren) => {
	const { currentUser } = useAuth();
	const [activePanel, setActivePanel] = useState<PanelType>(
		currentUser?.uid ? null : (PanelTypes.AUTH as PanelType)
	);

	const classes = clsx('layout', !!currentUser?.uid && 'layout--authorized');

	return (
		<div className={classes}>
			<SiteHeader activePanel={activePanel} handlePanel={setActivePanel} />
			<main>{children}</main>
			<SiteFooter activePanel={activePanel} handlePanel={setActivePanel} />
		</div>
	);
};
