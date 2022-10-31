import { useEffect, useState, FC } from 'react';
import { CssBaseline } from '@mui/material';
import { AppBar, ControllerGrid, EntryGrid, FieldGrid, FlexBox, MainContainer } from './components';
import { useHTTPClient } from './contexts/http-client';

const App: FC = () => {
  const httpClient = useHTTPClient();
  const [world, setWorld] = useState<string>();

  useEffect(() => {
    (async () => {
      const res = await httpClient.get('/api/world.text', { headers: { Accept: 'text/plain' } });
      setWorld(await res.text());
    })();
  }, [httpClient]);

  return (
    <FlexBox>
      <CssBaseline />
      <AppBar />
      <MainContainer>
        <FieldGrid>{world}</FieldGrid>
        <ControllerGrid />
        <EntryGrid />
      </MainContainer>
    </FlexBox>
  );
};

export default App;
