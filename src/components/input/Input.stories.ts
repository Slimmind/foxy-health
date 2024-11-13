import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
	args: {
		id: 'text-input',
		type: 'text',
	},
};

export const TextInputWithLabel: Story = {
	args: {
		id: 'text-input',
		label: 'Text Input With Label',
		type: 'text',
	},
};

export const TextInputWithDescription: Story = {
	args: {
		id: 'text-input',
		label: 'Text Input',
		type: 'text',
		description: 'Text Input with description',
	},
};

export const TextInputWithError: Story = {
	args: {
		id: 'input-with-error',
		label: 'Input with Error',
		type: 'text',
		errorMessage: 'This field has an error',
	},
};

export const TextInputWithDescriptionAndError: Story = {
	args: {
		id: 'input-with-description-and-error',
		label: 'Input with Description And Error',
		type: 'text',
		description: 'Text Input with description',
		errorMessage: 'This field has an error',
	},
};

export const PasswordInput: Story = {
	args: {
		id: 'password-input',
		label: 'Password Input',
		type: 'password',
		description: 'Password should be at least 6 characters long',
	},
};

export const TextArea: Story = {
	args: {
		id: 'textarea',
		label: 'Text Area',
		type: 'textarea',
		description: 'This is a text area',
	},
};

export const CheckboxInput: Story = {
	args: {
		id: 'checkbox-input',
		label: 'Checkbox Input',
		type: 'checkbox',
	},
};

export const RadioInput: Story = {
	args: {
		id: 'radio-input',
		label: 'Radio Input',
		type: 'radio',
	},
};

// export const WithChildren: Story = {
// 	args: {
// 		id: 'input-with-children',
//     label: 'Input with Children',
//     type: 'text',
//     children: <span>Extra content</span>,
// 	},
// };

export const DisabledInput: Story = {
	args: {
		id: 'disabled-input',
		label: 'Disabled Input',
		type: 'text',
		description: 'This input is disabled',
		disabled: true,
	},
};
