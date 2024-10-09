import { useEffect, useState } from 'react';
import Panel from '../panel';
import './time.styles.css';

type TimeProps = {
	isActive: boolean;
	togglePanel: () => void;
};

export const Time = ({ isActive, togglePanel }: TimeProps) => {
	const [time, setTime] = useState<string>('');

	const updateTime = () => {
		const currentTime = new Date();
		const hours = String(currentTime.getHours()).padStart(2, '0');
		const minutes = String(currentTime.getMinutes()).padStart(2, '0');
		const seconds = String(currentTime.getSeconds()).padStart(2, '0');
		setTime(`${hours}:${minutes}:${seconds}`);
	};

	useEffect(() => {
		updateTime();

		const intervalId = setInterval(() => {
			updateTime();
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);
	return (
		<>
			<div className='time' onClick={togglePanel}>
				{time}
			</div>
			<Panel isActive={isActive} mod='time' filled={true}></Panel>
		</>
	);
};
