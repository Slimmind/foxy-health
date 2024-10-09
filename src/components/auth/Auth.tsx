import { useState, lazy } from 'react';
import { useAuth } from '../../contexts/auth.context';
import './auth.styles.css';

const Button = lazy(() => import('../button'));
const Panel = lazy(() => import('../panel'));

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
		<>
			<Button mod='icon auth' onClick={togglePanel} />
			<Panel isActive={isActive} mod='auth'>
				{currentUser?.uid ? (
					<Button mod='wide' onClick={logout}>
						Log Out
					</Button>
				) : (
					<Button mod='wide' onClick={handleGoogleLogin}>
						Log In with Google
					</Button>
				)}
				{error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
			</Panel>
		</>
	);
};
