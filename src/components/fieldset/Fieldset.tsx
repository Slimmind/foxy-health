import { PropsWithChildren } from 'react';
import './fieldset.styles.css';

type FieldsetProps = {
	title?: string;
} & PropsWithChildren;

export const Fieldset = ({ children, title }: FieldsetProps) => {
	return (
		<fieldset className='fieldset'>
			{title && <legend>{title}</legend>}
      <div className="fieldset__content">
			  {children}
      </div>
		</fieldset>
	);
};
