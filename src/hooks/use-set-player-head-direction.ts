import { useState } from 'react';

import { useHydraAPIClient, usePlayer } from '../contexts';
import { Direction } from '../types';

interface SetPlayerHeadDirection {
  (direction: Direction): void;
}
interface UseSetPlayerHeadDirection {
  (): {
    setPlayerHeadDirection: SetPlayerHeadDirection,
    error: Error | null;
  };
}

const useSetPlayerHeadDirection: UseSetPlayerHeadDirection = () => {
  const [error, setError] = useState<Error | null>(null);
  const hydraAPIClient = useHydraAPIClient();
  const { player } = usePlayer();

  const setPlayerHeadDirection = async (direction: Direction) => {
    setError(null);
    try {
      if (!player) { throw new Error('Player not found'); }

      await hydraAPIClient.setPlayerHeadDirection({
        playerId: player.id,
        password: player.password,
        direction,
      });
    } catch (e) {
      setError(e as Error);
    }
  };

  return { setPlayerHeadDirection, error };
};

export { useSetPlayerHeadDirection };
export type { SetPlayerHeadDirection, UseSetPlayerHeadDirection };
