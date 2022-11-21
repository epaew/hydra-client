import { createContext, createElement, useContext, useState, FC, ReactNode } from 'react';
import { useHydraAPIClient } from './hydra-api-client';
import { Player } from '../types';

interface PlayerForm {
  name: string;
  password: string;
}
interface SetPlayer {
  (player: PlayerForm): void;
}

interface PlayerProviderProps {
  children: ReactNode;
}

interface PlayerContext {
  player: Player | null;
  setPlayer: SetPlayer;
  error: Error | null;
}

const context = createContext<PlayerContext>({ player: null, setPlayer: () => {}, error: null });
context.displayName = 'PlayerContext';

const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const hydraAPIClient = useHydraAPIClient();
  const [player, setPlayer] = useState<Player | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const setPlayerFromForm = async (form: PlayerForm) => {
    setError(null);

    try {
      setPlayer(await hydraAPIClient.join(form));
    } catch (e) {
      setError(e as Error);
    }
  };

  return createElement(
    context.Provider,
    { value: { player, setPlayer: setPlayerFromForm, error } },
    children,
  );
};
const usePlayer = () => useContext(context);

export { PlayerProvider, usePlayer };
export type { Player };
