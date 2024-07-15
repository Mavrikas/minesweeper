import { useContext } from 'react';
import Difficulties from '../Difficulties/Difficulties';
import './Menu.css';
import { GameContext } from '../../context/GameContext';
import { GAME_STATE } from '../../constants';

function Menu() {
	const { setStartedOn, setGameState } = useContext(GameContext);

	const handleClick = () => {
		setStartedOn(Date.now());
		setGameState(GAME_STATE.PLAYING);
	};

	return (
		<div className="menu__container">
			<Difficulties />
			<button onClick={handleClick}>New Game</button>
		</div>
	);
}

export default Menu;
