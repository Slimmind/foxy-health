import { useState, lazy } from 'react';
import { useAuth } from '../../contexts/auth.context';
import './auth.styles.css';

const Button = lazy(() => import('../button'));
const Panel = lazy(() => import('../panel'));
const GoogleIcon = lazy(() => import('../../icons/google-icon'));

type AuthProps = {
	isActive: boolean;
	togglePanel: () => void;
};

export const Auth = ({ isActive, togglePanel }: AuthProps) => {
	const { loginWithGoogle, logout, currentUser } = useAuth();
	const [error, setError] = useState('');

	const handleGoogleLogin = async () => {
		try {
			setError('');
			await loginWithGoogle();
		} catch {
			setError('Failed to log in with Google');
		}
	};

	return (
		<section onClick={togglePanel}>
			<Button
				mod='icon bordered auth'
				onClick={togglePanel}
				aria-label='open authentication menu'
			/>
			<Panel
				isActive={isActive}
				mod='auth'
				filled={true}
				title='Аутентификация'
			>
				{currentUser?.uid ? (
					<Button mod='wide light' onClick={logout} aria-label='log out'>
						Log Out
					</Button>
				) : (
					<Button
						mod='wide light'
						onClick={handleGoogleLogin}
						aria-label='log in with Google'
					>
						<GoogleIcon />
						Log In with Google
					</Button>
				)}
				{error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
			</Panel>
		</section>
	);
};
