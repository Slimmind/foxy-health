import { Link } from '@tanstack/react-router';
import { MenuItemType } from '../../utils/constants';
import './menu.styles.css';

type MenuProps = {
	items: MenuItemType[];
	itemClasses?: string;
};

export const Menu = ({ items, itemClasses }: MenuProps) => {
	return (
		<ul className='menu'>
			{items.map(({ path, name }, index) => (
				<li className='menu__item' key={index}>
					<Link to={path} className={itemClasses}>
						{name}
					</Link>
				</li>
			))}
		</ul>
	);
};
