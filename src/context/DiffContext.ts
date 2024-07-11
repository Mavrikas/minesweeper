import { createContext, useState } from 'react';
import { DIFFICULTIES } from '../constants';

// export const [diff, setDiff] = useState(DIFFICULTIES[0]);

export const DiffContext = createContext({
	diff: DIFFICULTIES[0],
	setDiff: (d: any) => d,
});
