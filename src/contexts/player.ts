import { createContext, createElement, useContext, useState, FC, ReactNode } from 'react';
import { useHTTPClient } from './http-client';
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

const context = createContext<[Player | undefined, SetPlayer]>([undefined, () => {}]);
context.displayName = 'PlayerContext';

const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const httpClient = useHTTPClient();
  const [player, setPlayer] = useState<Player>();

  const setPlayerFromForm = async (form: PlayerForm) => {
    const response = await httpClient.post('/api/player', JSON.stringify(form));
    const result: { id: number, mark: string } = await response.json();

    setPlayer({ id: result.id, name: form.name, password: form.password, mark: result.mark });
  };

  return createElement(context.Provider, { value: [player, setPlayerFromForm] }, children);
};
const usePlayer = () => useContext(context);

export { PlayerProvider, usePlayer };
export type { Player };
