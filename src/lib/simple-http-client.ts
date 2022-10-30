interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

class SimpleHTTPClient {
  #baseURL: string | undefined;

  constructor(baseURL?: string) {
    this.#baseURL = baseURL;
  }

  async get(path: string, options: RequestOptions = {}) {
    const method = 'GET';
    const headers = {
      Accept: 'application/json',
      ...(options.headers ?? {}),
    };

    return this.request(path, { ...options, method, headers });
  }

  async post(path: string, data: any, options: RequestOptions = {}) {
    const method = 'POST';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    };
    const body = data;

    return this.request(path, { ...options, method, headers, body });
  }

  async request(path: string, options: RequestOptions) {
    const request = new Request(new URL(path, this.#baseURL), options);
    console.info(request);

    const response = await fetch(request);
    console.info(response);

    return response;
  }
}

export { SimpleHTTPClient };
