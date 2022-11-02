import { useHTTPClient, usePlayer } from '../contexts';
import { World } from '../types';

type HeadDirection = World.Player.HeadDirection;

interface SetPlayerHeadDirection {
  (headDirection: HeadDirection): void;
}
interface UseSetPlayerHeadDirection {
  (): SetPlayerHeadDirection;
}

const useSetPlayerHeadDirection: UseSetPlayerHeadDirection = () => {
  const httpClient = useHTTPClient();
  const [player] = usePlayer();

  const setPlayerHeadDirection = (headDirection: HeadDirection) => {
    if (!player) { throw new Error(); }

    httpClient.post(
      `/api/player/${player.id}/move`,
      JSON.stringify({ direction: headDirection, password: player.password }),
    );
  };

  return setPlayerHeadDirection;
};

export { useSetPlayerHeadDirection };
export type { SetPlayerHeadDirection, UseSetPlayerHeadDirection };
