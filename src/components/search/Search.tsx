import { lazy } from 'react';

const Button = lazy(() => import('../button'));
const Panel = lazy(() => import('../panel'));

type SearchProps = {
	isActive: boolean;
	togglePanel: () => void;
};

export const Search = ({ isActive, togglePanel }: SearchProps) => {
	return (
		<>
			<Button
				mod='icon search'
				onClick={togglePanel}
				aria-label='toggle search panel'
			/>
			<Panel isActive={isActive} title='Поиск' filled={true}></Panel>
		</>
	);
};
