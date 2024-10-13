import { createLazyFileRoute } from '@tanstack/react-router';
import BasicQuestionnaire from '../../components/basic-questionnaire';

export const Route = createLazyFileRoute('/forms/basic-questionnaire')({
	component: BasicQuestionnaire,
});
