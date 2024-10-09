import { lazy } from 'react';
import Patient from '../patient';

const Button = lazy(() => import('../button'));
const Panel = lazy(() => import('../panel'));

type AddProps = {
	isActive: boolean;
	togglePanel: () => void;
};

export const Add = ({ isActive, togglePanel }: AddProps) => {
	return (
		<>
			<Button mod='icon add' onClick={togglePanel} />
			<Panel isActive={isActive} title='Patient Data'>
				<Patient />
			</Panel>
		</>
	);
};