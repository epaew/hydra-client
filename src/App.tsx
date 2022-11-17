import { FC, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { AppBar, ControllerGrid, EntryGrid, FlexBox, MainContainer, PlayersGrid, ReentryGrid, WorldGrid } from './components';
import { usePlayer } from './contexts';
import { useWorld } from './hooks';

const App: FC = () => {
  const [player] = usePlayer();
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const world = useWorld({ autoRefresh });

  const isGameOver = ():boolean => {
    return !!player && !world.players.some(wp => wp.id === player.id);
  };

  return (
    <FlexBox>
      <CssBaseline />
      <AppBar />
      <MainContainer>
        <WorldGrid autoRefresh={autoRefresh} setAutoRefresh={setAutoRefresh} world={world} />
        <PlayersGrid players={world.players} />
        {
          (() => {
            if (!player) { return <EntryGrid /> }
            if (!isGameOver()) { return <ControllerGrid /> }
            return <ReentryGrid />;
          })()
        }
      </MainContainer>
    </FlexBox>
  );
};

export default App;
