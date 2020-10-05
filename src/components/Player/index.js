import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Close, Container, Inner, Overlay } from './styles/player';

export const PlayerContext = createContext();

const Player = ({ children, ...restProps }) => {
	const [showPlayer, setShowPlayer] = useState(false);
	return (
		<PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
			<Container {...restProps}>{children}</Container>
		</PlayerContext.Provider>
	);
};

Player.Button = function PlayerButton({ ...restProps }) {
	const { showPlayer, setShowPlayer } = useContext(PlayerContext);
	return (
		<Button {...restProps} onClick={() => setShowPlayer(() => !showPlayer)}>
			Play
		</Button>
	);
};

Player.Video = function PlayerVideo({ src, ...restProps }) {
	const { showPlayer, setShowPlayer } = useContext(PlayerContext);
	return showPlayer
		? createPortal(
				<Overlay onClick={() => setShowPlayer(false)}>
					<Inner>
						<video id='netflix-player' controls>
							<source src={src} type='video/mp4' />
						</video>
						<Close />
					</Inner>
				</Overlay>,
				document.body
		  )
		: null;
};

export default Player;
