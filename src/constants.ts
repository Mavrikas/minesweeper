import { DIFFS, MINES } from './types';

export const DIFFICULTIES = [
	{
		mines: MINES.EASY,
		name: DIFFS.EASY,
		width: 9,
		height: 9,
	},
	{
		mines: MINES.MEDIUM,
		name: DIFFS.MEDIUM,
		width: 16,
		height: 16,
	},
	{
		mines: MINES.HARD,
		name: DIFFS.HARD,
		width: 30,
		height: 16,
	},
];

export const NAMES = {
	MINE: 'has-mine',
	HAS_NEAR: 'has_near',
	EMPTY: 'empty',
};
