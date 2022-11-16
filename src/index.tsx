import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { HTTPClientProvider, HydraAPIClientProvider, PlayerProvider } from './contexts';
import { apiHost } from './lib/config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <HTTPClientProvider baseURL={apiHost}>
      <HydraAPIClientProvider baseURL={apiHost}>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </HydraAPIClientProvider>
    </HTTPClientProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
