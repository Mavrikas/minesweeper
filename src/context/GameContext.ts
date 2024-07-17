import { createContext } from 'react';
import { GAME_STATE } from '../constants';
import { MapType } from '../types';

type GameContextType = {
	startedOn: number;
	setStartedOn: (d: any) => void;
	gameState: GAME_STATE;
	setGameState: (d: any) => void;
	map: MapType;
	setMap: (d: any) => void;
};
export const GameContext = createContext<GameContextType>({
	startedOn: Date.now(),
	setStartedOn: (d: any) => d,
	gameState: GAME_STATE.PLAYING,
	setGameState: (d: any) => d,
	map: [],
	setMap: (d: any) => d,
});
