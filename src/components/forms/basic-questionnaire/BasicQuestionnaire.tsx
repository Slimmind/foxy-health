import { lazy, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
	// PatientFormInitialValues,
	PatientFormType,
	// responseTemplate,
} from '../../../utils/constants';
import { createPrompt } from '../../../utils/create-prompt';
import * as config from './config.json';
import './basic-questionnaire.styles.css';
import { createValidationSchema } from '../../../utils/create-validation-schema';

const Fieldset = lazy(() => import('../../fieldset'));
const InputGroup = lazy(() => import('../../input-group'));
const Input = lazy(() => import('../../input'));
const Button = lazy(() => import('../../button'));

const PatientFormInitialValues = config.initialValues;

const validationSchema = createValidationSchema(config.validationRules);

// const validationSchema = Yup.object({
// 	name: Yup.string().required('Name is required'),
// 	surname: Yup.string().required('Surname is required'),
// 	age: Yup.number()
// 		.required('Age is required')
// 		.positive('Age must be a positive number')
// 		.integer('Age must be an integer'),
// 	gender: Yup.string().required('Gender is required'),
// 	height: Yup.number()
// 		.required('Height is required')
// 		.positive('Height must be a positive number'),
// 	weight: Yup.number()
// 		.required('Weight is required')
// 		.positive('Weight must be a positive number'),
// 	bloodPressure: Yup.string().required('Blood Pressure is required'),
// 	notes: Yup.string().optional(),
// });

export const BasicQuestionnaire = () => {
	const [isLoading, setIsLoading] = useState(false);
	// const [data, setData] = useState<string>(responseTemplate);

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
			console.log('ChatGPT Response:', data.choices[0].message.content);
		} catch (error) {
			console.error('Error calling ChatGPT API:', error);
		} finally {
			setIsLoading(false);
		}
	};

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
				<form onSubmit={handleSubmit} className='form'>
					<Fieldset title='Общие сведения:'>
						<Input
							id='name'
							name='name'
							label='Имя'
							value={values.name}
							onChange={handleChange}
							onBlur={handleBlur}
							description='Lorem ipsum dolor sit amet'
							errorMessage={
								touched.name && errors.name ? errors.name : undefined
							}
						/>
						<Input
							id='patronymic'
							name='patronymic'
							label='Отчество'
							value={values.patronymic}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Input
							id='surname'
							name='surname'
							label='Фамилия'
							value={values.surname}
							onChange={handleChange}
							onBlur={handleBlur}
							errorMessage={
								touched.surname && errors.surname ? errors.surname : undefined
							}
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

						<InputGroup
							label='Пол'
							errorMessage={
								touched.gender && errors.gender ? errors.gender : undefined
							}
						>
							<Input
								id='female'
								name='gender'
								type='radio'
								label='Женский'
								checked={values.gender === 'female'}
								value={values.gender}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							<Input
								id='male'
								name='gender'
								type='radio'
								label='Мужской'
								checked={values.gender === 'male'}
								value={values.gender}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</InputGroup>

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
							id='bloodPressure'
							name='bloodPressure'
							label='Давление (артериальное/венозное)'
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

						<InputGroup label='Цели по весу'></InputGroup>
					</Fieldset>

					<fieldset>
						<legend>Питание:</legend>
					</fieldset>
					<fieldset>
						<legend>Здоровье и образ жизни:</legend>
					</fieldset>
					<fieldset>
						<legend>Пищевые привычки:</legend>
					</fieldset>
					<fieldset>
						<legend>Сон и восстановление:</legend>
					</fieldset>
					<fieldset>
						<legend>Психологическое состояние:</legend>
					</fieldset>

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

					<Button
						type='submit'
						mod='wide'
						disabled={isLoading}
						activeClass={!isLoading ? 'loading' : ''}
						aria-label='add a new patient'
					>
						{isLoading ? 'Submitting...' : 'Submit'}
					</Button>
				</form>
			)}
		</Formik>
	);
};
