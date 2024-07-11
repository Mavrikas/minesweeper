import { useContext, useState } from 'react';
import './Difficulties.css';
import { Dropdown } from 'primereact/dropdown';
import { DIFFICULTIES } from '../../constants';
import { DiffContext } from '../../context/DiffContext';

function Difficulties() {
	const { diff, setDiff } = useContext(DiffContext);

	return (
		<div className="diffs__container">
			<label className="diffs__label">Difficulty:</label>
			<Dropdown
				value={diff}
				onChange={(e) => setDiff(e.value)}
				options={DIFFICULTIES}
				optionLabel="name"
				placeholder="Select Difficulty"
				className="w-full md:w-14rem"
			/>
		</div>
	);
}

export default Difficulties;
