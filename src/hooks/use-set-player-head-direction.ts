import { useHydraAPIClient, usePlayer } from '../contexts';
import { HeadDirection } from '../types';

interface SetPlayerHeadDirection {
  (headDirection: HeadDirection): void;
}
interface UseSetPlayerHeadDirection {
  (): SetPlayerHeadDirection;
}

const useSetPlayerHeadDirection: UseSetPlayerHeadDirection = () => {
  const hydraAPIClient = useHydraAPIClient();
  const { player } = usePlayer();

  const setPlayerHeadDirection = (headDirection: HeadDirection) => {
    if (!player) { throw new Error(); }

    hydraAPIClient.setPlayerHeadDirection({
      playerId: player.id,
      password: player.password,
      headDirection,
    });
  };

  return setPlayerHeadDirection;
};

export { useSetPlayerHeadDirection };
export type { SetPlayerHeadDirection, UseSetPlayerHeadDirection };
