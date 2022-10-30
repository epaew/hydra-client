import { createContext, createElement, useContext, FC, ReactNode } from 'react';
import { SimpleHTTPClient } from '../lib/simple-http-client';

interface HTTPClientProviderProps {
  baseURL: string | undefined;
  children: ReactNode;
}

const context = createContext<SimpleHTTPClient>(new SimpleHTTPClient());
context.displayName = 'HTTPClientContext';

const HTTPClientProvider: FC<HTTPClientProviderProps> = ({ baseURL, children }) => {
  return createElement(context.Provider, { value: new SimpleHTTPClient(baseURL) }, children);
};

const useHTTPClient = () => useContext(context);

export { HTTPClientProvider, useHTTPClient };
