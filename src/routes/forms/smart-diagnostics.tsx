import { createFileRoute } from '@tanstack/react-router';
import SmartDiagnostics from '../../components/forms/smart-diagnostics';

export const Route = createFileRoute('/forms/smart-diagnostics')({
	component: SmartDiagnostics,
});
