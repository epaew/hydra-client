import { createContext, createElement, useContext, useState, FC, ReactNode } from 'react';

interface Player {
  id: string;
  name: string;
  password: string;
}
interface SetPlayer {
  (player: Player): void;
}

interface PlayerProviderProps {
  children: ReactNode;
}

const context = createContext<[Player | undefined, SetPlayer]>([undefined, () => {}]);
context.displayName = 'PlayerContext';

const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [player, setPlayer] = useState<Player>();

  return createElement(context.Provider, { value: [player, setPlayer] }, children);
};
const usePlayer = () => useContext(context);

export { PlayerProvider, usePlayer };
