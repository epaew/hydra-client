import { World } from './types';

import { Client as HTTPClient } from '../http';

type JoinProps = {
  name: string;
  password: string;
};
type JoinResult = {
  id: number;
  mark: string;
};

type GetWorldResult = World;

type SetPlayerHeadDirectionProps = {
  playerId: number;
  password: string;
  headDirection: World.Player.HeadDirection;
}

class Client {
  #httpClient: HTTPClient;

  constructor(baseURL?: string) {
    this.#httpClient = new HTTPClient(baseURL);
  }

  async join(props: JoinProps): Promise<JoinResult> {
    const { name, password } = props;
    const response = await this.#httpClient.post(
      `/api/player`,
      JSON.stringify({ name, password }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.json();
  }

  async getWorld(): Promise<GetWorldResult> {
    const response =
      await this.#httpClient.get(`/api/world.json`, { headers: { Accept: 'application/json' } });
    return response.json();
  }

  async setPlayerHeadDirection(props: SetPlayerHeadDirectionProps): Promise<void> {
    const { playerId, password, headDirection: direction } = props;
    await this.#httpClient.post(
      `/api/player/${playerId}/move`,
      JSON.stringify({ direction, password }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export { Client };
