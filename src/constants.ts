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

export const enum NAMES {
	MINE = 'a',
	HAS_NEAR = 'b',
	EMPTY = 'c',
}

export const enum GAME_STATE {
	PLAYING = 0,
	WIN = 1,
	LOSE = 2,
}
