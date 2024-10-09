export const extractResponsePart = (
	data: string,
	startMarker: string,
	endMarker: string
): string => {
	const startIndex = data.indexOf(startMarker) + startMarker.length;
	const endIndex = endMarker
		? data.indexOf(endMarker, startIndex)
		: data.length;
	return data.slice(startIndex, endIndex).trim();
};
