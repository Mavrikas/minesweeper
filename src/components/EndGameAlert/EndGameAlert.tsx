import { Dialog } from 'primereact/dialog';
import './EndGameAlert.css';
import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import { GAME_STATE } from '../../constants';
import { Button } from 'primereact/button';

type EndGameAlertProps = {
	visible: boolean;
	newGame: () => void;
};
export default function EndGameAlert({ visible, newGame }: EndGameAlertProps) {
	const { gameState } = useContext(GameContext);

	const getDialogHeader = () => {
		if (gameState === GAME_STATE.WIN) {
			return 'Win!';
		} else if (gameState === GAME_STATE.LOSE) {
			return 'Oops...!';
		}
	};

	const getDialogContent = () => {
		if (gameState === GAME_STATE.WIN) {
			return 'You made it!';
		} else if (gameState === GAME_STATE.LOSE) {
			return 'You lost...';
		}
		return '';
	};

	return (
		<Dialog
			visible={visible}
			modal
			header={getDialogHeader}
			footer={<Button label="New Game" onClick={newGame} autoFocus />}
			onHide={newGame}
			closable={false}
		>
			<p className="dialogContent">{getDialogContent()}</p>
		</Dialog>
	);
}
