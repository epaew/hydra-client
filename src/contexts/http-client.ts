import { createContext, createElement, useContext, useMemo, FC, ReactNode } from 'react';
import { SimpleHTTPClient } from '../lib/simple-http-client';

interface HTTPClient {
  get(path: string, options?: object): Promise<Response>;
  post(path: string, data: any, options?: object): Promise<Response>;
  request(path: string, options?: object): Promise<Response>;
}

interface HTTPClientProviderProps {
  baseURL: string | undefined;
  children: ReactNode;
}

const context = createContext<HTTPClient>(new SimpleHTTPClient());
context.displayName = 'HTTPClientContext';

const HTTPClientProvider: FC<HTTPClientProviderProps> = ({ baseURL, children }) => {
  const httpClient = useMemo(() => new SimpleHTTPClient(baseURL), [baseURL]);

  return createElement(context.Provider, { value: httpClient }, children);
};

const useHTTPClient = () => useContext(context);

export { HTTPClientProvider, useHTTPClient };
export type { HTTPClient };
