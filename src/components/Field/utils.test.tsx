import { describe, it, expect } from 'vitest';
import {
	findFreeNeighbors,
	getCellContent,
	getCellName,
	getCellView,
	getMinePositions,
	getNeighborCells,
	getNumOfMinesNear,
	getPositionFromCoords,
} from './utils';
import Mine from '../Mine/Mine';
import { mockMap } from './mockData';

describe('Field utils', () => {
	it('getMinePositions', () => {
		const size = 81;
		const mines = 10;
		expect(getMinePositions(size, mines)).toHaveLength(10);
	});

	it('getPositionFromCoords', () => {
		expect(getPositionFromCoords(7, 3, 9)).toBe(24);
	});

	it.each([
		['middle', 2, 2, [11, 9, 1, 19, 2, 0, 20, 18]],
		['upper left corner', 1, 1, [1, 9, 10]],
		['first row mid', 3, 1, [3, 1, 11, 12, 10]],
		['upper right corner', 9, 1, [7, 17, 16]],
		['first column second row', 1, 2, [10, 0, 18, 1, 19]],
		['last column second row', 9, 2, [16, 8, 26, 7, 25]],
		['lower left corner', 1, 9, [73, 63, 64]],
		['lower right corner', 9, 9, [79, 71, 70]],
		['last row mid', 4, 9, [76, 74, 66, 67, 65]],
	])('getNeighborCells for %s', (name, col, row, expected) => {
		const width = 9;
		expect(getNeighborCells(col, row, width, width)).toEqual(expected);
	});

	it('getNumOfMinesNear', () => {
		const width = 9;
		expect(getNumOfMinesNear(6, 1, width, width, [4, 6, 12, 24, 32])).toBe(2);
	});

	it('getCellName', () => {
		const width = 9;
		expect(getCellName(6, 1, width, width, [4, 6, 12, 24, 32])).toEqual({
			column: 6,
			row: 1,
			name: 'b--2',
		});

		expect(getCellName(6, 1, width, width, [5, 6, 12, 24, 32])).toEqual({
			column: 6,
			row: 1,
			name: 'a',
		});

		expect(getCellName(6, 1, width, width, [12, 24, 32])).toEqual({
			column: 6,
			row: 1,
			name: 'c',
		});
	});

	it('getCellView', () => {
		const width = 9;
		expect(getCellView(5, width, width, [4, 6, 12, 24, 32], mockMap)).toBe(2);

		expect(getCellView(5, width, width, [5, 6, 12, 24, 32], mockMap)).toEqual(
			<Mine />,
		);

		expect(getCellView(5, width, width, [12, 24, 32], mockMap)).toBe('');
	});

	it('getCellContent', () => {
		const width = 9;
		expect(
			getCellContent(true, 5, width, width, [4, 6, 12, 24, 32], mockMap),
		).toBe(2);

		expect(getCellContent(false, 5, width, width, [12, 24, 32], mockMap)).toBe(
			'',
		);
	});

	it('findFreeNeighbors', () => {
		const width = 9;
		expect(
			findFreeNeighbors(
				6,
				1,
				width,
				width,
				[4, 6, 12, 24, 32],
				[22, 70],
				mockMap,
			),
		).toEqual([
			14, 9, 10, 11, 0, 1, 2, 23, 20, 35, 52, 61, 71, 62, 34, 53, 25, 51, 44,
			33, 50, 43, 48, 59, 57, 67, 68, 66, 39, 58, 42, 49, 41, 40, 29, 38, 31,
			30, 3, 21, 13,
		]);
	});
});
