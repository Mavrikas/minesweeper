export enum DIFFS {
	EASY = 'Easy',
	MEDIUM = 'Medium',
	HARD = 'Hard',
}

export enum MINES {
	EASY = 10,
	MEDIUM = 40,
	HARD = 99,
}

export type MapType = {
	row: number;
	column: number;
	name: string;
}[];
