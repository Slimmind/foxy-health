import React, { lazy, useState, useCallback } from 'react';
import { Formik, FormikProps } from 'formik';
import { createValidationSchema } from '../../utils/create-validation-schema';
import {
	FormConfigType,
	FormNodeType,
	InitialValuesType,
} from '../../utils/constants';
import './form-creator.styles.css';

const Input = lazy(() => import('../input'));
const InputGroup = lazy(() => import('../input-group'));
const FieldSet = lazy(() => import('../fieldset'));
const Button = lazy(() => import('../button'));

type FormCreatorProps = {
	config: FormConfigType;
	submitHandler: (values: InitialValuesType) => Promise<void>;
};

export const FormCreator: React.FC<FormCreatorProps> = ({
	config,
	submitHandler,
}) => {
	const {
		initialValues,
		validationRules = {}, // Default to empty object if validationRules is undefined
		nodes,
		formId,
		formTitle,
		formSubtitle,
		formDescription,
	} = config;

	const validationSchema = createValidationSchema(validationRules);
	console.log('VALIDATION RULES: ', validationSchema);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (values: InitialValuesType) => {
		setIsLoading(true);
		await submitHandler(values);
		setIsLoading(false);
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
			const errorMessage =
				touched.name && errors.name ? (errors.name as string) : undefined;

			return (
				<Input
					key={id}
					type={type}
					id={id}
					name={name}
					label={label}
					value={values.name || ''}
					onChange={handleChange}
					onBlur={handleBlur}
					description={description}
					errorMessage={errorMessage}
				/>
			);
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
				</header>
			)}
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(formikProps) => (
					<form id={formId}>
						<div className='form__content'>
							{nodes.map((node: FormNodeType) => {
								switch (node.node) {
									case 'field':
										return renderInput(node, formikProps);
									case 'group':
										return renderGroup(node, formikProps);
									case 'set':
										return (
											<FieldSet key={node.id} title={node.title}>
												{node.items?.map((item) =>
													item.node === 'field'
														? renderInput(item, formikProps)
														: renderGroup(item, formikProps)
												)}
											</FieldSet>
										);
									default:
										return null;
								}
							})}
						</div>
					</form>
				)}
			</Formik>
			<footer className='form__footer'>
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
			</footer>
		</div>
	);
};
