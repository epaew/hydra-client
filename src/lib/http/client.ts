import { HTTPError, ClientError, ServerError } from './errors';

class Client {
  #baseURL: string | undefined;
  #logger: Console;

  constructor(baseURL?: string, logger = console) {
    this.#baseURL = baseURL;
    this.#logger = logger;
  }

  async get(path: string, options: RequestInit = {}) {
    const method = 'GET';

    return this.request(path, { ...options, method });
  }

  async post(path: string, data: any, options: RequestInit = {}) {
    const method = 'POST';
    const body = data;

    return this.request(path, { ...options, method, body });
  }

  async request(path: string, options: RequestInit) {
    const request = new Request(new URL(path, this.#baseURL), options);
    this.#logger.debug(request);

    const response = await fetch(request);

    if (!response.ok) {
      this.#logger.error(response);
      await this.#throwHTTPError(response);
    }

    this.#logger.debug(response);
    return response;
  }

  async #throwHTTPError(response: Response): Promise<never> {
    const { url, status, headers } = response;
    const body = await response.text();

    switch (Math.floor(status / 100)) {
      case 4:
        throw new ClientError({ url, status, headers, body });
      case 5:
        throw new ServerError({ url, status, headers, body });
      default:
        throw new HTTPError({ url, status, headers, body });
    }
  }
}

export { Client };
