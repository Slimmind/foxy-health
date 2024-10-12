import { lazy, PropsWithChildren } from 'react';
import clsx from 'clsx';
import './input-group.styles.css';

const WarningIcon = lazy(() => import('../../icons/warning-icon'));

type InputGroupProps = {
	label: string;
	description?: string;
	errorMessage?: string;
} & PropsWithChildren;

export const InputGroup = ({
	label,
	children,
	description,
	errorMessage,
}: InputGroupProps) => {
	const classes = clsx(
		'input-group',
		description && 'input-group--with-description',
		errorMessage && 'input-group--invalid'
	);
	return (
		<div className={classes}>
			<h5 className='input-group__title'>{label}</h5>
			<div className='input-group__body'>{children}</div>
			{description && <p className='input__description'>{description}</p>}
			{errorMessage && (
				<p className='input__error-message'>
					<WarningIcon />
					{errorMessage}
				</p>
			)}
		</div>
	);
};
