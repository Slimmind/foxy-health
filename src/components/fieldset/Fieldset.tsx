import { PropsWithChildren } from 'react';
import './fieldset.styles.css';

type FieldsetProps = {
	title?: string;
} & PropsWithChildren;

export const Fieldset = ({ children, title }: FieldsetProps) => {
	return (
		<fieldset>
			{title && <legend>{title}</legend>}
			{children}
		</fieldset>
	);
};
