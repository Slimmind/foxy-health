import { createFileRoute } from '@tanstack/react-router';
import SmartDiagnostics from '../../components/smart-diagnostics';

export const Route = createFileRoute('/forms/smart-diagnostics')({
	component: SmartDiagnostics,
});
