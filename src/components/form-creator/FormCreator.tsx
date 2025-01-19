import { nanoid } from 'nanoid';
import { lazy, useState } from 'react';
import { FormItemTypes } from '../../utils/constants';
import './form-creator.styles.css';

const Button = lazy(() => import('../button'));

type InitialValueType = {
	name: string;
	value: string;
};

export type FormFieldType = {
	node: 'step' | 'set' | 'group' | 'field';
	id: string;
	name?: string;
	title?: string;
	type?: string;
	label?: string;
	description?: string;
	items?: FormFieldType[];
};

type FormConfigType = {
	formId: string;
	formTitle: string;
	formSubtitle: string;
	formDescription: string;
	initialValues: InitialValueType[];
	steps: FormFieldType[];
};

const initialFormConfig: FormConfigType = {
	formId: nanoid(),
	formTitle: '',
	formSubtitle: '',
	formDescription: '',
	initialValues: [],
	steps: [
		{
			node: 'step',
			id: nanoid(),
			items: [],
		},
	],
};

export const FormCreator = () => {
	const [formConfig, setFormConfig] =
		useState<FormConfigType>(initialFormConfig);
	const [activeItemId, setActiveItemId] = useState<string>(
		initialFormConfig.formId
	);

	const addItem = (itemType: string) => {
		const itemId = nanoid();
		const newItem: FormFieldType = {
			node: 'field',
			id: itemId,
			type: itemType,
		};

		setActiveItemId(itemId);

		setFormConfig((prevConfig) => ({
			...prevConfig,
			steps: prevConfig.steps.map((step, index) =>
				index === 0
					? { ...step, items: [...(step.items || []), newItem] }
					: step
			),
		}));

		setActiveItemId(itemId);

		console.log('TYPE:', activeItemId);
		console.log('ACTIVE_ITEM_ID:', itemId);
		console.log('FORM_CONFIG:', formConfig);
	};

	const formItems = [
		{ label: 'Step', type: FormItemTypes.STEP },
		{ label: 'Block', type: FormItemTypes.BLOCK },
		{ label: 'Column', type: FormItemTypes.COLUMN },
		{ label: 'Fieldset', type: FormItemTypes.FIELDSET },
		{ label: 'Field', type: FormItemTypes.FIELD },
		{ label: 'LargeField', type: FormItemTypes.LARGE_FIELD },
		{ label: 'Checkbox', type: FormItemTypes.CHECKBOX },
		{ label: 'RadioButton', type: FormItemTypes.RADIO_BUTTON },
	];

	return (
		<div className='form-creator'>
			<aside className='form-creator__sidebar'>
				{formItems.map(({ label, type }) => (
					<Button key={type} onClick={() => addItem(type)}>
						{label}
					</Button>
				))}
			</aside>
			<div className='form-creator__body'>
        <pre>
          <code>
            {JSON.stringify(formConfig)}
          </code>
        </pre>
      </div>
		</div>
	);
};
