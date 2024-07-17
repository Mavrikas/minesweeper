import { NAMES } from '../../constants';
import Mine from '../Mine/Mine';
import { MapType } from './types';

export const getPositionFromCoords = (
	column: number,
	row: number,
	width: number,
) => {
	return (row - 1) * width + column - 1;
};

export const getMinePositions = (size: number, mines: number) => {
	let positions: number[] = [];

	const getPos = () => {
		let pos = Math.floor(Math.random() * size);
		if (positions.includes(pos)) {
			return getPos();
		} else if (positions.length < mines) {
			positions.push(pos);
			return getPos();
		}
	};
	getPos();
	return positions;
};

export const getNeighborCells = (
	column: number,
	row: number,
	width: number,
	height: number,
) => {
	const neighborCells = [];
	const position = getPositionFromCoords(column, row, width);

	const right = Number(column) === width ? null : position + 1;
	const left = Number(column) === 1 ? null : position - 1;
	const up = Number(row) === 1 ? null : position - width;
	const down = Number(row) === height ? null : position + width;
	const upRight =
		Number(row) === 1 || Number(column) === width ? null : position + 1 - width;
	const upLeft =
		Number(row) === 1 || Number(column) === 1 ? null : position - 1 - width;
	const downRight =
		Number(row) === height || Number(column) === width
			? null
			: position + 1 + width;
	const downLeft =
		Number(row) === height || Number(column) === 1
			? null
			: position - 1 + width;

	right !== null && neighborCells.push(right);
	left !== null && neighborCells.push(left);
	up !== null && neighborCells.push(up);
	down !== null && neighborCells.push(down);
	upRight !== null && neighborCells.push(upRight);
	upLeft !== null && neighborCells.push(upLeft);
	downRight !== null && neighborCells.push(downRight);
	downLeft !== null && neighborCells.push(downLeft);

	return neighborCells;
};

export const getNumOfMinesNear = (
	column: number,
	row: number,
	width: number,
	height: number,
	minePositions: number[],
) => {
	return getNeighborCells(column, row, width, height).reduce(
		(sum, current) => sum + Number(minePositions.includes(current)),
		0,
	);
};

export const getCellName = (
	column: number,
	row: number,
	width: number,
	height: number,
	minePositions: number[],
) => {
	const minesNear = getNumOfMinesNear(
		column,
		row,
		width,
		height,
		minePositions,
	);
	const position = getPositionFromCoords(column, row, width);

	if (minePositions.includes(position)) {
		return { column, row, name: NAMES.MINE };
	} else if (minesNear) {
		return { column, row, name: `${NAMES.HAS_NEAR}--${minesNear}` };
	}
	return { column, row, name: NAMES.EMPTY };
};

export const getCellView = (
	i: number,
	width: number,
	height: number,
	minePositions: number[],
	map: MapType,
) => {
	const numOfNearMines = getNumOfMinesNear(
		map[i].column,
		map[i].row,
		width,
		height,
		minePositions,
	);

	if (minePositions.includes(i)) {
		return <Mine />;
	} else if (numOfNearMines) {
		return numOfNearMines;
	}
	return '';
};

export const getCellContent = (
	isOpenend: boolean,
	i: number,
	width: number,
	height: number,
	minePositions: number[],
	map: MapType,
) => {
	if (isOpenend) {
		return getCellView(i, width, height, minePositions, map);
	}
	return '';
};

export const findFreeNeighbors = (
	column: number,
	row: number,
	width: number,
	height: number,
	opened: number[],
	flaggedCells: number[],
	map: MapType,
) => {
	const position = getPositionFromCoords(column, row, width);
	let checked = [position];
	let free: number[][] = [];
	const isFreeNearMe = (col: number, rw: number): number[] => {
		let temp = [];
		for (let cellNear of getNeighborCells(col, rw, width, height)) {
			if (
				checked.includes(cellNear) ||
				opened.includes(cellNear) ||
				flaggedCells.includes(cellNear) ||
				free.flat().includes(cellNear)
			) {
				continue;
			}
			checked.push(cellNear);

			const name = map[cellNear].name;
			const curCol = map[cellNear].column;
			const curRow = map[cellNear].row;

			if (name !== NAMES.MINE) {
				if (name!.includes(NAMES.HAS_NEAR)) {
					free.push([cellNear]);
					continue;
				}
				temp.push(cellNear);
				free.push(isFreeNearMe(Number(curCol), Number(curRow)));
			}
		}
		return temp;
	};

	free.push(isFreeNearMe(column, row));
	return free.flat();
};
