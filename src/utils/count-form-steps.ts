import { FormNodeType } from './constants';

export const countFormSteps = (nodes: FormNodeType[]) => {
	return nodes.reduce((count: number, node: FormNodeType): number => {
		if (node.node === 'set') {
			count++;
		}
		return count;
	}, 0);
};
