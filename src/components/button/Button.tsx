import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import getMod from '../../utils/get-mod';
import './button.styles.css';

type CommonProps = {
	mod?: string;
	activeClass?: string;
} & PropsWithChildren;

type ButtonProps = ComponentPropsWithoutRef<'button'> &
	CommonProps & {
		href?: never;
	};

type AnchorProps = ComponentPropsWithoutRef<'a'> &
	CommonProps & {
		href: string;
	};

type Props = ButtonProps | AnchorProps;

const isAnchorProps = (props: Props): props is AnchorProps => 'href' in props;

export const Button = (props: Props) => {
	const { mod = 'primary', activeClass, children, ...restProps } = props;
	const classes = `btn ${getMod('btn', mod)} ${activeClass ? activeClass : ''}`;

	if (isAnchorProps(props)) {
		const { href, ...anchorProps } = restProps as AnchorProps;
		return (
			<a className={classes} href={href} {...anchorProps}>
				{children}
			</a>
		);
	} else {
		const { type, ...buttonProps } = restProps as ButtonProps;
		return (
			<button className={classes} type={type || 'button'} {...buttonProps}>
				{children}
			</button>
		);
	}
};
