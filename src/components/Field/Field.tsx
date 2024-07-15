import { useContext, useEffect, useState } from 'react';
import './Fiels.css';
import { DiffContext } from '../../context/DiffContext';
import { GAME_STATE, NAMES } from '../../constants';
import { GameContext } from '../../context/GameContext';
import Mine from '../Mine/Mine';
import Flag from '../Flag/Flag';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

function Field() {
	const { diff } = useContext(DiffContext);
	const { startedOn, setStartedOn, gameState, setGameState } =
		useContext(GameContext);
	const {
		mines: conMines,
		width: conWidth,
		height: conHeight,
		name: conName,
	} = diff;
	const field: any = [];
	const [opened, setOpened] = useState<Array<string | number>>([]);
	const [minePositions, setMinePositions] = useState<Array<number>>([]);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [mines, setMines] = useState(0);
	const [name, setName] = useState('');
	const [size, setSize] = useState(0);
	const [flaggedCells, setFlaggedCells] = useState<Array<number>>([]);
	const [visible, setVisible] = useState(false);

	const getMinePositions = () => {
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

	const reset = () => {
		setOpened([]);
		setWidth(conWidth);
		setHeight(conHeight);
		setMines(conMines);
		setName(conName);
		setSize(conWidth * conHeight);
		setFlaggedCells([]);
	};

	useEffect(() => {
		if (mines) setMinePositions(getMinePositions());
	}, [mines, startedOn]);

	useEffect(() => {
		reset();
	}, [startedOn]);

	useEffect(() => {
		setVisible(gameState !== GAME_STATE.PLAYING);
	}, [gameState]);

	useEffect(() => {
		if (size > 0 && opened.length + flaggedCells.length === size) {
			setGameState(GAME_STATE.WIN);
		}
	}, [opened, flaggedCells]);

	const handleRightClick = (event: any) => {
		event.preventDefault();
		let elId = event.target!.id;

		if (elId.includes('i')) {
			elId = event.target!.id.replace('i', '');
		} else if (elId.includes('f')) {
			elId = event.target!.id.replace('i', '');
		} else {
			elId = event.target.parentElement.id.replace('i', '');
		}

		const cellIndex = Number(elId);
		const tempFlagged = [...flaggedCells];

		if (tempFlagged.includes(cellIndex)) {
			tempFlagged.splice(tempFlagged.indexOf(cellIndex), 1);
		} else {
			tempFlagged.push(cellIndex);
		}

		setFlaggedCells(tempFlagged);
	};

	const getNeighborCells = (i: number, column: number, row: number) => {
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

	const getNumOfMinesNear = (i: number, column: number, row: number) => {
		return getNeighborCells(i, column, row).reduce(
			(sum, current) => sum + Number(minePositions.includes(current)),
			0,
		);
	};

	const getCellName = (i: number, column: number, row: number) => {
		let minesNear = getNumOfMinesNear(i, column, row);
		if (minePositions.includes(i)) {
			return NAMES.MINE;
		} else if (minesNear) {
			return `${NAMES.HAS_NEAR}--${minesNear}`;
		}
		return NAMES.EMPTY;
	};

	const getCellView = (i: number, column: number, row: number) => {
		const numOfNearMines = getNumOfMinesNear(i, column, row);
		if (minePositions.includes(i)) {
			return <Mine />;
		} else if (numOfNearMines) {
			return numOfNearMines;
		}
		return '';
	};

	const findFreeNeighbors = (pos: number, column: number, row: number) => {
		let checked = [pos];
		let free: number[][] = [];
		const isFreeNearMe = (posi: number, col: number, rw: number): number[] => {
			let temp = [];
			for (let cellNear of getNeighborCells(posi, col, rw)) {
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
		setOpened((prev) => [...prev, ...free.flat()]);
	};

	const handleClick = (event: any) => {
		const pos = Number(event.target.id.replace('i', ''));
		setOpened((prev) => [...prev, Number(pos)]);
		const name = event.target.dataset.name;
		const column = event.target.dataset.column;
		const row = event.target.dataset.row;
		if (name === NAMES.MINE) {
			setGameState(GAME_STATE.LOSE);
		} else if (!name.includes(NAMES.HAS_NEAR)) {
			findFreeNeighbors(pos, column, row);
		} /*else {
			console.log('open many');
			findFreeNeighbors(pos, column, row);
		}*/
	};

	const getCellContent = (
		isOpenend: boolean,
		i: number,
		column: number,
		row: number,
	) => {
		if (isOpenend) {
			return getCellView(i, column, row);
		}
		return '';
	};
	const printField = () => {
		for (let i = 0; i < size; i++) {
			const column = (i % width) + 1 === 0 ? width : (i % width) + 1;
			const row = Math.floor(i / width) + 1;
			const isOpenend = opened.includes(i);
			const isFlagged = flaggedCells.includes(i);

			field.push(
				<div
					key={'cel' + i}
					data-name={getCellName(i, column, row)}
					data-column={column}
					data-row={row}
					id={`i${i}`}
					className={`cell ${isOpenend ? 'open' : 'closed'}`}
					onClick={isFlagged ? () => null : handleClick}
					onContextMenu={
						isOpenend ? (e) => e.preventDefault() : handleRightClick
					}
				>
					{isFlagged ? (
						<Flag id={`i${i}`} />
					) : (
						getCellContent(isOpenend, i, column, row)
					)}
				</div>,
			);
		}

		return field;
	};

	const getDialogHeader = () => {
		if (gameState === GAME_STATE.WIN) {
			return 'Win!';
		} else if (gameState === GAME_STATE.LOSE) {
			return 'Oops...!';
		}
	};

	const getDialogContent = () => {
		if (gameState === GAME_STATE.WIN) {
			return 'You made it!';
		} else if (gameState === GAME_STATE.LOSE) {
			return 'You lost...';
		}
		return '';
	};
	const newGame = () => {
		setVisible(false);
		setStartedOn(Date.now());
		setGameState(GAME_STATE.PLAYING);
	};

	return (
		<div className={`container container--${name}`}>
			<Dialog
				visible={visible}
				modal
				header={getDialogHeader}
				footer={<Button label="New Game" onClick={newGame} autoFocus />}
				onHide={newGame}
				closable={false}
			>
				<p className="dialogContent">{getDialogContent()}</p>
			</Dialog>
			{printField()}
		</div>
	);
}

export default Field;
