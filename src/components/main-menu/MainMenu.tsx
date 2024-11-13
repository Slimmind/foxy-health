import { lazy } from 'react';
import { appColors, ColorOptionType } from '../../utils/constants';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import './main-menu.styles.css';
import Menu from '../menu';
import Dropdown from '../dropdown';

const Button = lazy(() => import('../button'));
const Panel = lazy(() => import('../panel'));

const creationMenuItems = [
	{
		path: '/forms/basic-questionnaire',
		name: 'Базовая анкета',
	},
	{
		path: '/forms/smart-diagnostics',
		name: 'SMART Диагностика',
	},
	{
		path: '/forms/smart-diagnostics',
		name: 'Конструктор',
	},
];

type MainMenuProps = {
	isActive: boolean;
	togglePanel: () => void;
};

export const MainMenu = ({ isActive, togglePanel }: MainMenuProps) => {
	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
	const [colorsMenu, setColorsMenu] = useState<ColorOptionType[]>([]);

	const changeColor = (color: string) => {
		document.documentElement.style.setProperty('--main-color-prop', color);

		const newColorIndex = appColors.findIndex(
			(appColor: string) => appColor === color
		);

		const changedColors = colorsMenu.map(
			(colorOption: ColorOptionType, idx: number): ColorOptionType => ({
				...colorOption,
				isActive: idx === newColorIndex,
			})
		);

		setColorsMenu(changedColors);
		setIsMenuVisible(false);
	};

	const classes = clsx('main-menu', isMenuVisible && 'main-menu--open');

	useEffect(() => {
		const colors = appColors.map((color: string, idx: number) => ({
			isActive: idx === 0,
			color,
		}));

		setColorsMenu(colors);
	}, []);

	return (
		<>
			<Button
				mod='icon menu'
				onClick={togglePanel}
				aria-label='toggle main menu'
			/>
			<Panel isActive={isActive} filled={true} mod='main-menu'>
				<div className={classes}>
					<section className='panel__section'>
						<Dropdown title='Создать:'>
							<Menu
								items={creationMenuItems}
								itemClasses='btn btn--wide btn--secondary'
							/>
						</Dropdown>
					</section>
					<section className='panel__section'>
						<Dropdown title='Сменить цвет:'>
							<ul className='main-menu__colors'>
								{colorsMenu.map((colorOption, idx) => (
									<li className='main-menu__colors-item' key={idx}>
										<Button
											mod='icon color'
											activeClass={colorOption.isActive ? 'active' : ''}
											onClick={() => changeColor(colorOption.color)}
											style={{
												backgroundColor: `rgb(${colorOption.color})`,
											}}
											aria-label='choose color'
										/>
									</li>
								))}
							</ul>
						</Dropdown>
					</section>
				</div>
			</Panel>
		</>
	);
};
