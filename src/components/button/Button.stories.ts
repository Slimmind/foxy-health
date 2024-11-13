import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		mod: 'primary',
		children: 'Primary Button',
	},
};

export const Secondary = {
	args: {
		mod: 'secondary',
		children: 'Secondary Button',
	},
};

export const Wide: Story = {
	parameters: {
		docs: {
			description: {
				story: 'full width button on mobile devices and centered on desktop',
			},
		},
	},
	args: {
		mod: 'primary wide',
		children: 'Wide Button',
	},
};

export const Auth: Story = {
	args: {
		mod: 'icon bordered auth',
	},
};

export const Menu: Story = {
	args: {
		mod: 'icon menu',
	},
};

export const Search: Story = {
	args: {
		mod: 'icon search',
	},
};

export const Add: Story = {
	args: {
		mod: 'icon add',
	},
};

export const ArrowLeft: Story = {
	args: {
		mod: 'icon bordered arrow arrow-left',
	},
};

export const ArrowRight: Story = {
	args: {
		mod: 'icon bordered arrow arrow-right',
	},
};
