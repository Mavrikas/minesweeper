import { useContext, useEffect, useState } from 'react';
import './Fiels.css';
import { DiffContext } from '../../context/DiffContext';
import { GAME_STATE, NAMES } from '../../constants';
import { GameContext } from '../../context/GameContext';
import Flag from '../Flag/Flag';
import {
	findFreeNeighbors,
	getCellContent,
	getCellName,
	getMinePositions,
} from './utils';
import EndGameAlert from '../EndGameAlert/EndGameAlert';

function Field() {
	const { diff } = useContext(DiffContext);
	const { startedOn, setStartedOn, gameState, setGameState, map, setMap } =
		useContext(GameContext);
	const {
		mines: conMines,
		width: conWidth,
		height: conHeight,
		name: conName,
	} = diff;
	const field: any = [];
	const [opened, setOpened] = useState<Array<number>>([]);
	const [minePositions, setMinePositions] = useState<Array<number>>([]);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [mines, setMines] = useState(0);
	const [name, setName] = useState('');
	const [size, setSize] = useState(0);
	const [flaggedCells, setFlaggedCells] = useState<Array<number>>([]);
	const [visible, setVisible] = useState(false);

	const reset = () => {
		setOpened([]);
		setWidth(conWidth);
		setHeight(conHeight);
		setMines(conMines);
		setName(conName);
		setSize(conWidth * conHeight);
		setFlaggedCells([]);
	};

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

	const handleClick = (event: any) => {
		const pos = Number(event.target.id.replace('i', ''));
		setOpened((prev) => [...prev, Number(pos)]);
		const column = map[pos].column;
		const row = map[pos].row;
		const name = map[pos].name;
		if (name === NAMES.MINE) {
			setGameState(GAME_STATE.LOSE);
		} else if (!name.includes(NAMES.HAS_NEAR)) {
			setOpened((prev) => [
				...prev,
				...findFreeNeighbors(
					column,
					row,
					width,
					height,
					opened,
					flaggedCells,
					map,
				),
			]);
		}
	};
	const createMap = () => {
		let temp = [];
		for (let i = 0; i < size; i++) {
			const column = (i % width) + 1 === 0 ? width : (i % width) + 1;
			const row = Math.floor(i / width) + 1;
			temp.push(getCellName(column, row, width, height, minePositions));
		}
		setMap(temp);
	};
	const printField = () => {
		for (let i = 0; i < size; i++) {
			const isOpenend = opened.includes(i);
			const isFlagged = flaggedCells.includes(i);
			field.push(
				<div
					key={'cel' + i}
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
						getCellContent(isOpenend, i, width, height, minePositions, map)
					)}
				</div>,
			);
		}

		return field;
	};

	const newGame = () => {
		setVisible(false);
		setStartedOn(Date.now());
		setGameState(GAME_STATE.PLAYING);
	};

	useEffect(() => {
		if (mines) setMinePositions(getMinePositions(size, mines));
	}, [mines, startedOn]);

	useEffect(() => {
		if (minePositions.length > 0) createMap();
	}, [minePositions]);

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

	return (
		<div className={`container container--${name}`}>
			<EndGameAlert visible={visible} newGame={newGame} />
			{printField()}
		</div>
	);
}

export default Field;
