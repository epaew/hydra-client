import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { AppBar, ControllerGrid, EntryGrid, FlexBox, MainContainer, WorldGrid } from './components';
import { usePlayer } from './contexts';

const App: FC = () => {
  const [player] = usePlayer();

  return (
    <FlexBox>
      <CssBaseline />
      <AppBar />
      <MainContainer>
        <WorldGrid />
        {player ? <ControllerGrid /> : <EntryGrid />}
      </MainContainer>
    </FlexBox>
  );
};

export default App;
