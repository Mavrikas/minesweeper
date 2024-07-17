import { useState } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import { PrimeReactProvider } from 'primereact/api';
import Field from './components/Field/Field';
import { DIFFICULTIES, GAME_STATE } from './constants';
import { DiffContext } from './context/DiffContext';
import { GameContext } from './context/GameContext';

function App() {
	const [diff, setDiff] = useState(DIFFICULTIES[0]);
	const [startedOn, setStartedOn] = useState(Date.now());
	const [gameState, setGameState] = useState(GAME_STATE.PLAYING);
	const [map, setMap] = useState([]);
	const value = { diff, setDiff };
	const gameValue = {
		startedOn,
		setStartedOn,
		gameState,
		setGameState,
		map,
		setMap,
	};

	return (
		<PrimeReactProvider>
			<GameContext.Provider value={gameValue}>
				<DiffContext.Provider value={value}>
					<Menu />
					<Field />
				</DiffContext.Provider>
			</GameContext.Provider>
		</PrimeReactProvider>
	);
}

export default App;
