import { PromptParts, RenderTypes } from '../../utils/constants';
import { extractResponsePart } from '../../utils/extractResponsePart';
import { Block } from '../block/Block';

type RendererProps = {
	data: string;
	chapterName: string;
};

export const Renderer = ({ data, chapterName }: RendererProps) => {
	let renderType: string;

	switch (chapterName) {
		case PromptParts.RESUME:
			renderType = RenderTypes.PARAGRAPH;
			break;
		case PromptParts.RECOMMENDATIONS:
			renderType = RenderTypes.UNORDERED_LIST;
			break;
		case PromptParts.GROCERIES:
			renderType = RenderTypes.UNORDERED_LIST;
			break;
		default:
			renderType = RenderTypes.PARAGRAPH;
	}

	// Extract the content between the markers (***), and remove the markers from the title
	const content = extractResponsePart(data, chapterName, '***').trim();

	// Set the appropriate divider for content splitting based on render type
	const divider = renderType === RenderTypes.PARAGRAPH ? '. ' : '\n';

	// Remove the chapter title markers (***)
	const cleanChapterTitle = chapterName.replace(/\*\*\*/g, '');

	// Split content by divider and filter out empty lines
	const items = content.split(divider).filter((item) => item.trim() !== '');

	return (
		<div>
			<Block title={cleanChapterTitle}>
				{renderType === RenderTypes.PARAGRAPH && (
					<>
						{items.map((item, index) => (
							<p key={index}>{item}</p>
						))}
					</>
				)}

				{renderType === RenderTypes.UNORDERED_LIST && (
					<ul>
						{items.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				)}
			</Block>
		</div>
	);
};
