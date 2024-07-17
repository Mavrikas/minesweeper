import { createContext } from 'react';
import { DIFFICULTIES } from '../constants';

export const DiffContext = createContext({
	diff: DIFFICULTIES[0],
	setDiff: (d: any) => d,
});
