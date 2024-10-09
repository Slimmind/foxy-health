import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../input';
import PatientReport from '../patient-report';
import {
	PatientFormInitialValues,
	PatientFormType,
	// responseTemplate,
} from '../../utils/constants';
import Button from '../button';
import { createPrompt } from '../../utils/create-prompt';
import { useState } from 'react';
import './patient.styles.css';

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	age: Yup.number()
		.required('Age is required')
		.positive('Age must be a positive number')
		.integer('Age must be an integer'),
	gender: Yup.string().required('Gender is required'),
	height: Yup.number()
		.required('Height is required')
		.positive('Height must be a positive number'),
	weight: Yup.number()
		.required('Weight is required')
		.positive('Weight must be a positive number'),
	bloodPressure: Yup.string().required('Blood Pressure is required'),
	notes: Yup.string().optional(),
});

export const Patient = () => {
	const [isLoading, setIsLoading] = useState(false);
	// const [data, setData] = useState<string>(responseTemplate);
	const [data, setData] = useState<string>('');

	const handleSubmit = async (values: PatientFormType) => {
		const prompt = createPrompt(values);
		setIsLoading(true);

		try {
			const response = await fetch(
				'https://api.openai.com/v1/chat/completions',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
					},
					body: JSON.stringify({
						model: 'gpt-3.5-turbo',
						messages: [{ role: 'user', content: prompt }],
						max_tokens: 3000,
						temperature: 0.7,
					}),
				}
			);

			const data = await response.json();
			setData(data.choices[0].message.content);
			console.log('ChatGPT Response:', data.choices[0].message.content);
		} catch (error) {
			console.error('Error calling ChatGPT API:', error);
		} finally {
			setIsLoading(false);
		}
	};

	if (data) {
		return <PatientReport reportData={data} />;
	}

	return (
		<Formik
			initialValues={PatientFormInitialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<form onSubmit={handleSubmit}>
					<Input
						id='name'
						name='name'
						label='Имя'
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={touched.name && errors.name ? errors.name : undefined}
					/>

					<Input
						id='age'
						name='age'
						type='number'
						label='Возраст'
						value={values.age}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={touched.age && errors.age ? errors.age : undefined}
					/>

					<Input
						id='gender'
						name='gender'
						label='Пол'
						value={values.gender}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={
							touched.gender && errors.gender ? errors.gender : undefined
						}
					/>

					<Input
						id='height'
						name='height'
						type='number'
						label='Рост (см)'
						value={values.height}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={
							touched.height && errors.height ? errors.height : undefined
						}
					/>

					<Input
						id='weight'
						name='weight'
						type='number'
						label='Вес (кг)'
						value={values.weight}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={
							touched.weight && errors.weight ? errors.weight : undefined
						}
					/>

					<Input
						id='bloodPressure'
						name='bloodPressure'
						label='Давление (mmHg)'
						value={values.bloodPressure}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={
							touched.bloodPressure && errors.bloodPressure
								? errors.bloodPressure
								: undefined
						}
					/>

					<Input
						id='notes'
						name='notes'
						label='Дополнительные сведения'
						type='textarea'
						value={values.notes}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={
							touched.notes && errors.notes ? errors.notes : undefined
						}
					/>

					<Button type='submit' mod='wide' disabled={isLoading}>
						{isLoading ? 'Submitting...' : 'Submit'}
					</Button>
				</form>
			)}
		</Formik>
	);
};
