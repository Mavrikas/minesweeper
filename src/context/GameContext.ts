import { createContext, useState } from 'react';
import { DIFFICULTIES } from '../constants';

// export const [diff, setDiff] = useState(DIFFICULTIES[0]);

export const GameContext = createContext({
	startedOn: Date.now(),
	setStartedOn: (d: any) => d,
});
