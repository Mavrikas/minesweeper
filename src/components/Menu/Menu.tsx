import { useContext } from 'react';
import Difficulties from '../Difficulties/Difficulties';
import './Menu.css';
import { GameContext } from '../../context/GameContext';

function Menu() {
	const { setStartedOn } = useContext(GameContext);

	return (
		<div className="menu__container">
			<Difficulties />
			<button onClick={() => setStartedOn(Date.now())}>New Game</button>
		</div>
	);
}

export default Menu;
