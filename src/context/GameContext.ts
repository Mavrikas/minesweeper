import { createContext } from 'react';
import { GAME_STATE } from '../constants';

export const GameContext = createContext({
	startedOn: Date.now(),
	setStartedOn: (d: any) => d,
	gameState: GAME_STATE.PLAYING,
	setGameState: (d: any) => d,
});
