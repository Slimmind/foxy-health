import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import './panel.styles.css';
import getMod from '../../utils/get-mod';

type PanelProps = {
	filled?: boolean;
	isActive?: boolean;
	title?: string;
	mod?: string;
} & PropsWithChildren;

export const Panel = ({
	filled,
	children,
	isActive,
	title,
	mod,
}: PanelProps) => {
	const classes = clsx(
		'panel',
		title && 'panel--with-title',
		filled && 'panel--filled',
		isActive && 'panel--opened',
		mod && getMod('panel', mod)
	);

	const panelHeader = title ? (
		<header className='panel__header'>
			<h2 className='panel__header-title'>{title}</h2>
		</header>
	) : (
		''
	);

	return (
		<div className={classes}>
			{panelHeader}
			{children}
		</div>
	);
};
