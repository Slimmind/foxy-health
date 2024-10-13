import * as Yup from 'yup';
import { ValidationRule } from './constants';

export const createValidationSchema = (
	validationRules: Record<string, ValidationRule>
) => {
	const schema: Record<string, Yup.AnySchema> = {};

	Object.entries(validationRules).forEach(([field, fieldConfig]) => {
		const { type, required, positive, integer, min, max, message } =
			fieldConfig;

		let validator: Yup.StringSchema | Yup.NumberSchema | undefined;

		// Define the base validator based on the field type
		switch (type) {
			case 'string':
				validator = Yup.string();
				break;

			case 'number':
				validator = Yup.number();

				// Add number-specific validations
				if (positive) {
					const positiveMsg = message?.positive || 'Must be a positive number';
					validator = validator.positive(positiveMsg);
				}

				if (integer) {
					const integerMsg = message?.integer || 'Must be an integer';
					validator = validator.integer(integerMsg);
				}

				if (min !== undefined) {
					const minMsg = message?.min || `Minimum value is ${min}`;
					validator = validator.min(min, minMsg);
				}

				if (max !== undefined) {
					const maxMsg = message?.max || `Maximum value is ${max}`;
					validator = validator.max(max, maxMsg);
				}
				break;

			default:
				throw new Error(`Unsupported field type: ${type}`);
		}

		// Apply required validation if the field is required
		if (required) {
			const requiredMsg = message?.required || 'This field is required';
			validator = validator.required(requiredMsg);
		}

		// Ensure the validator exists before assigning it to the schema
		if (validator) {
			schema[field] = validator;
		}
	});
	// Return a Yup object schema
	return Yup.object().shape(schema);
};
