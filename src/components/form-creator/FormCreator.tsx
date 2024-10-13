import { lazy, useState, useCallback } from 'react';
import { Formik, FormikProps } from 'formik';
import { createValidationSchema } from '../../utils/create-validation-schema';
import {
	FormConfigType,
	FormNodeType,
	InitialValuesType,
} from '../../utils/constants';
import './form-creator.styles.css';
import { countFormSteps } from '../../utils/count-form-steps';

const Input = lazy(() => import('../input'));
const InputGroup = lazy(() => import('../input-group'));
const FieldSet = lazy(() => import('../fieldset'));
const Button = lazy(() => import('../button'));

type FormCreatorProps = {
	config: FormConfigType;
	submitHandler: (values: InitialValuesType) => Promise<void>;
};

export const FormCreator = ({ config, submitHandler }: FormCreatorProps) => {
	const {
		initialValues,
		validationRules = {}, // Default to empty object if validationRules is undefined
		nodes,
		formId,
		formTitle,
		formSubtitle,
		formDescription,
	} = config;

	const [isLoading, setIsLoading] = useState(false);
	const [currentFormStep, setCurrentFormStep] = useState<number>(1); // Step starts at 1

	const steps = countFormSteps(nodes);

	const handleSubmit = async (values: InitialValuesType) => {
		setIsLoading(true);
		try {
			await submitHandler(values);
		} finally {
			setIsLoading(false);
		}
	};

	const handleNextStep = () => {
		if (currentFormStep < steps) {
			setCurrentFormStep(currentFormStep + 1);
		}
	};

	const handlePreviousStep = () => {
		if (currentFormStep > 1) {
			setCurrentFormStep(currentFormStep - 1);
		}
	};

	const renderInput = useCallback(
		(
			{ id, type, name, label, description }: FormNodeType,
			{
				values,
				touched,
				errors,
				handleChange,
				handleBlur,
			}: FormikProps<InitialValuesType>
		) => {
			if (name) {
				const errorMessage =
					touched[name] && errors[name] ? (errors[name] as string) : undefined;

				return (
					<Input
						key={id}
						type={type}
						id={id}
						name={name}
						label={label}
						value={values[name] || ''} // Use `name` dynamically
						onChange={handleChange}
						onBlur={handleBlur}
						description={description}
						errorMessage={errorMessage}
					/>
				);
			}
		},
		[]
	);

	const renderGroup = useCallback(
		(
			{ id, title, items }: FormNodeType,
			formikProps: FormikProps<InitialValuesType>
		) => (
			<InputGroup key={id} title={title}>
				{items?.map((item) => renderInput(item, formikProps))}
			</InputGroup>
		),
		[renderInput]
	);

	// Render only the nodes in the current step
	const renderStep = (
		stepIndex: number,
		formikProps: FormikProps<InitialValuesType>
	) => {
		const currentSet = nodes.filter((node) => node.node === 'set')[
			stepIndex - 1
		];

		if (!currentSet) return null;

		return (
			<FieldSet key={currentSet.id} title={currentSet.title}>
				{currentSet.items?.map((item) =>
					item.node === 'field'
						? renderInput(item, formikProps)
						: renderGroup(item, formikProps)
				)}
			</FieldSet>
		);
	};

	return (
		<div className='form'>
			{(formTitle || formSubtitle || formDescription) && (
				<header className='form__header'>
					{formTitle && <h2 className='form__title'>{formTitle}</h2>}
					{formSubtitle && <h3 className='form__subtitle'>{formSubtitle}</h3>}
					{formDescription && (
						<p className='form__description'>
							<em>{formDescription}</em>
						</p>
					)}
					{!!steps && (
						<div className='form__steps'>
							<Button
								mod='icon bordered arrow arrow-left'
								aria-label='previous step'
								disabled={currentFormStep === 1}
								onClick={handlePreviousStep}
							/>
							<div>
								<p>шаг</p>
								{currentFormStep} из {steps}
							</div>
							<Button
								mod='icon bordered arrow arrow-right'
								aria-label='next step'
								disabled={currentFormStep === steps}
								onClick={handleNextStep}
							/>
						</div>
					)}
				</header>
			)}
			<Formik
				initialValues={initialValues}
				validationSchema={createValidationSchema(validationRules)}
				onSubmit={handleSubmit}
			>
				{(formikProps) => (
					<form id={formId} onSubmit={formikProps.handleSubmit}>
						<div className='form__content'>
							{/* Render only the current step */}
							{renderStep(currentFormStep, formikProps)}
						</div>
						<footer className='form__footer'>
							{/* Show Submit button on the last step */}
							{currentFormStep === steps && (
								<Button
									type='submit'
									mod='wide'
									disabled={isLoading}
									activeClass={!isLoading ? 'loading' : ''}
									aria-label='submit form'
									form={formId}
								>
									{isLoading ? 'Submitting...' : 'Submit'}
								</Button>
							)}
						</footer>
					</form>
				)}
			</Formik>
		</div>
	);
};
