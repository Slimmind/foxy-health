import { Link } from '@tanstack/react-router';
import './site-logo.styles.css';

export const SiteLogo = () => {
	return (
		<h1>
			<Link className='site-logo' to='/' aria-label='site logo'></Link>
		</h1>
	);
};
