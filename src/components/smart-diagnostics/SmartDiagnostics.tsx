import { lazy } from 'react';
import { createPrompt } from '../../utils/create-prompt';
import * as config from './config.json';
import { FormConfigType, InitialValuesType } from '../../utils/constants';
import './smart-diagnostics.styles.css';

const FormRenderer = lazy(() => import('../form-renderer'));

const formConfig: FormConfigType = config as FormConfigType; // Type assertion

export const SmartDiagnostics = () => {
	// Function to call OpenAI API
	const callOpenAiApi = async (prompt: string) => {
		console.log('PROMPT: ', prompt);
		try {
			// const response = await fetch('https://api.openai.com/v1/chat/completions', {
			//   method: 'POST',
			//   headers: {
			//     'Content-Type': 'application/json',
			//     Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
			//   },
			//   body: JSON.stringify({
			//     model: 'gpt-3.5-turbo',
			//     messages: [{ role: 'user', content: prompt }],
			//     max_tokens: 3000,
			//     temperature: 0.7,
			//   }),
			// });
			// if (!response.ok) {
			//   throw new Error(`API request failed with status ${response.status}`);
			// }
			// const data = await response.json();
			// return data.choices[0]?.message?.content;
		} catch (error) {
			console.error('Error calling ChatGPT API:', error);
			throw error;
		}
	};

	// Form submission handler
	const handleSubmit = async (values: InitialValuesType) => {
		const prompt = createPrompt(values);

		try {
			const chatGptResponse = await callOpenAiApi(prompt);
			console.log('ChatGPT Response:', chatGptResponse);
		} catch (error) {
			console.error('Error during form submission:', error);
		}
	};

	return (
		<>
			<FormRenderer config={formConfig} submitHandler={handleSubmit} />
		</>
	);
};
