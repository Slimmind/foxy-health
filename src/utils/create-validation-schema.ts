import * as Yup from 'yup';
import { ValidationRule } from './constants';

export const createValidationSchema = (
	validationRules: Record<string, ValidationRule>
) => {
	const schema: Record<string, Yup.AnySchema> = {};

	Object.entries(validationRules).forEach(([field, fieldConfig]) => {
		const { kind, required, positive, integer, min, max, message } =
			fieldConfig;

		let validator: Yup.StringSchema | Yup.NumberSchema;

		switch (kind) {
			case 'string':
				validator = Yup.string();
				break;
			case 'number':
				validator = Yup.number();

				if (positive) {
					const positiveMsg =
						typeof message === 'string' ? message : message?.positive;
					validator = validator.positive(positiveMsg);
				}

				if (integer) {
					const integerMsg =
						typeof message === 'string' ? message : message?.integer;
					validator = validator.integer(integerMsg);
				}

				if (min !== undefined) {
					const minMsg = typeof message === 'string' ? message : message?.min;
					validator = validator.min(min, minMsg);
				}

				if (max !== undefined) {
					const maxMsg = typeof message === 'string' ? message : message?.max;
					validator = validator.max(max, maxMsg);
				}
				break;
			default:
				throw new Error(`Unsupported field kind: ${kind}`);
		}

		if (required) {
			const requiredMsg = message?.required || 'This field is required';
			validator = validator.required(requiredMsg);
		}

		schema[field] = validator;
	});

	return Yup.object(schema);
};
