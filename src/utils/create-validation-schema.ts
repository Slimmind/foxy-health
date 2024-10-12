import * as Yup from 'yup';

// Type definition for field configuration
type FieldConfig = {
	type: 'string' | 'number';
	required: boolean;
	positive?: boolean;
	integer?: boolean;
	message?: string | { [key: string]: string };
};

type FormConfig = Record<string, FieldConfig>;

// Function to create Yup schema from the config
export const createValidationSchema = (config: FormConfig) => {
	const schema: Record<string, Yup.AnySchema> = {};

	// Iterate over each field in the config
	Object.entries(config).forEach(([field, fieldConfig]) => {
		const { type, required, positive, integer, message } = fieldConfig;

		// Initialize the validator based on the field type
		let validator: Yup.StringSchema | Yup.NumberSchema;

		if (type === 'string') {
			validator = Yup.string() as Yup.StringSchema;
		} else if (type === 'number') {
			validator = Yup.number() as Yup.NumberSchema;

			// Apply number-specific validation rules
			if (positive) {
				const positiveMsg =
					typeof message !== 'string' ? message?.positive : undefined;
				validator = (validator as Yup.NumberSchema).positive(positiveMsg);
			}
			if (integer) {
				const integerMsg =
					typeof message !== 'string' ? message?.integer : undefined;
				validator = (validator as Yup.NumberSchema).integer(integerMsg);
			}
		} else {
			throw new Error(`Unsupported field type: ${type}`);
		}

		// Add required check if applicable
		if (required) {
			const requiredMsg =
				typeof message === 'string' ? message : message?.required;
			validator = validator.required(requiredMsg);
		}

		// Assign the validator to the schema
		schema[field] = validator;
	});

	// Return the Yup validation schema
	return Yup.object(schema);
};
