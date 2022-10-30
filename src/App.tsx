import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { AppBar, ControllerGrid, EntryGrid, FieldGrid, FlexBox, MainContainer } from './components';

const App: FC = () => {
  return (
    <FlexBox>
      <CssBaseline />
      <AppBar />
      <MainContainer>
        <FieldGrid>
          console.log("Hello MUI World!");
        </FieldGrid>
        <ControllerGrid />
        <EntryGrid />
      </MainContainer>
    </FlexBox>
  );
};

export default App;
