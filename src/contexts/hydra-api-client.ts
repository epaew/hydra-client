import { createContext, createElement, useContext, useMemo, FC, ReactNode } from 'react';
import { Client as HydraAPIClient } from '../lib/hydra-api';

interface HydraAPIClientProviderProps {
  baseURL: string | undefined;
  children: ReactNode;
}

const context = createContext<HydraAPIClient>(new HydraAPIClient());
context.displayName = 'APIClientContext';

const HydraAPIClientProvider: FC<HydraAPIClientProviderProps> = ({ baseURL, children }) => {
  const httpClient = useMemo(() => new HydraAPIClient(baseURL), [baseURL]);

  return createElement(context.Provider, { value: httpClient }, children);
};

const useHydraAPIClient = () => useContext(context);

export { HydraAPIClientProvider, useHydraAPIClient };
export type { HydraAPIClient };
