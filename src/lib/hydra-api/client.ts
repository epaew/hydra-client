import { World } from './types';

import { SimpleHTTPClient } from '../simple-http-client';

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
  #httpClient: SimpleHTTPClient;

  constructor(baseURL?: string) {
    this.#httpClient = new SimpleHTTPClient(baseURL);
  }

  async join(props: JoinProps): Promise<JoinResult> {
    const { name, password } = props;
    const response = await this.#httpClient.post(
      `/api/player`,
      JSON.stringify({ name, password }),
    );
    return response.json();
  }

  async getWorld(): Promise<GetWorldResult> {
    const response = await this.#httpClient.get(`/api/world.json`);
    return response.json();
  }

  async setPlayerHeadDirection(props: SetPlayerHeadDirectionProps): Promise<void> {
    const { playerId, password, headDirection: direction } = props;
    await this.#httpClient.post(
      `/api/player/${playerId}/move`,
      JSON.stringify({ direction, password }),
    );
  }
}

export { Client };
