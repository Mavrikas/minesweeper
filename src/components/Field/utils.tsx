import { NAMES } from '../../constants';
import Mine from '../Mine/Mine';

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
	i: number,
	column: number,
	row: number,
	width: number,
	height: number,
) => {
	const neighborCells = [];

	const right = Number(column) === width ? null : i + 1;
	const left = Number(column) === 1 ? null : i - 1;
	const up = Number(row) === 1 ? null : i - width;
	const down = Number(row) === height ? null : i + width;
	const upRight =
		Number(row) === 1 || Number(column) === width ? null : i + 1 - width;
	const upLeft =
		Number(row) === 1 || Number(column) === 1 ? null : i - 1 - width;
	const downRight =
		Number(row) === height || Number(column) === width ? null : i + 1 + width;
	const downLeft =
		Number(row) === height || Number(column) === 1 ? null : i - 1 + width;

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
	i: number,
	column: number,
	row: number,
	width: number,
	height: number,
	minePositions: number[],
) => {
	return getNeighborCells(i, column, row, width, height).reduce(
		(sum, current) => sum + Number(minePositions.includes(current)),
		0,
	);
};

export const getCellName = (
	i: number,
	column: number,
	row: number,
	width: number,
	height: number,
	minePositions: number[],
) => {
	let minesNear = getNumOfMinesNear(
		i,
		column,
		row,
		width,
		height,
		minePositions,
	);
	if (minePositions.includes(i)) {
		return NAMES.MINE;
	} else if (minesNear) {
		return `${NAMES.HAS_NEAR}--${minesNear}`;
	}
	return NAMES.EMPTY;
};

export const getCellView = (
	i: number,
	column: number,
	row: number,
	width: number,
	height: number,
	minePositions: number[],
) => {
	const numOfNearMines = getNumOfMinesNear(
		i,
		column,
		row,
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
	column: number,
	row: number,
	width: number,
	height: number,
	minePositions: number[],
) => {
	if (isOpenend) {
		return getCellView(i, column, row, width, height, minePositions);
	}
	return '';
};

export const findFreeNeighbors = (
	pos: number,
	column: number,
	row: number,
	width: number,
	height: number,
	opened: number[],
	flaggedCells: number[],
) => {
	let checked = [pos];
	let free: number[][] = [];
	const isFreeNearMe = (posi: number, col: number, rw: number): number[] => {
		let temp = [];
		for (let cellNear of getNeighborCells(posi, col, rw, width, height)) {
			if (
				checked.includes(cellNear) ||
				opened.includes(cellNear) ||
				flaggedCells.includes(cellNear) ||
				free.flat().includes(cellNear)
			) {
				continue;
			}
			checked.push(cellNear);
			const name = (document.querySelector(`#i${cellNear}`) as HTMLElement)
				.dataset.name;
			const curCol = (document.querySelector(`#i${cellNear}`) as HTMLElement)
				.dataset.column;
			const curRow = (document.querySelector(`#i${cellNear}`) as HTMLElement)
				.dataset.row;
			if (name !== NAMES.MINE) {
				if (name!.includes(NAMES.HAS_NEAR)) {
					free.push([cellNear]);
					continue;
				}
				temp.push(cellNear);
				free.push(isFreeNearMe(cellNear, Number(curCol), Number(curRow)));
			}
		}
		return temp;
	};

	free.push(isFreeNearMe(pos, column, row));
	return free.flat();
};
