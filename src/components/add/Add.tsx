import { lazy } from 'react';

const Button = lazy(() => import('../button'));
const Panel = lazy(() => import('../panel'));
const Menu = lazy(() => import('../menu'));

type AddProps = {
	isActive: boolean;
	togglePanel: () => void;
};

const creationMenuItems = [
	{
		path: '/forms/basic-questionnaire',
		name: 'Базовая анкета',
	},
	{
		path: '/forms/smart-diagnostics',
		name: 'SMART Диагностика',
	},
];

export const Add = ({ isActive, togglePanel }: AddProps) => {
	return (
		<section onClick={togglePanel}>
			<Button
				mod='icon add'
				onClick={togglePanel}
				aria-label='open add patient form'
			/>
			<Panel isActive={isActive} title='Создать:' filled={true}>
				<Menu
					items={creationMenuItems}
					itemClasses='btn btn--wide btn--light'
				/>
			</Panel>
		</section>
	);
};
