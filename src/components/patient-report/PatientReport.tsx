import { PromptParts } from '../../utils/constants';
import Renderer from '../renderer';
import './patient-report.styles.css';

type PatientReportProps = {
	reportData: string;
};

export const PatientReport = ({ reportData }: PatientReportProps) => {
	return <>
    <Renderer data={reportData} chapterName={PromptParts.RESUME} />
    <Renderer data={reportData} chapterName={PromptParts.RECOMMENDATIONS} />
    <Renderer data={reportData} chapterName={PromptParts.GROCERIES} />
    <Renderer data={reportData} chapterName={PromptParts.SUMMARY} />
  </>;
};
