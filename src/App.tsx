import { createContext, useContext, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Menu from './components/Menu/Menu';
import { PrimeReactProvider } from 'primereact/api';
import Field from './components/Field/Field';
import { DIFFICULTIES } from './constants';
import { DiffContext } from './context/DiffContext';
import { GameContext } from './context/GameContext';

// export const DiffContext = createContext(DIFFICULTIES[0]);

function App() {
	const [diff, setDiff] = useState(DIFFICULTIES[0]);
	const [startedOn, setStartedOn] = useState(Date.now());
	const value = { diff, setDiff };
	const gameValue = { startedOn, setStartedOn };
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
