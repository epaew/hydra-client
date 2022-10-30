import { FC } from 'react';
import { AppBar as MuiAppBar, Typography } from '@mui/material';

const AppBar: FC = () => {
  return (
    <MuiAppBar position="absolute">
      <Typography component="h1" align="center">Hydra Game</Typography>
    </MuiAppBar>
  );
};

export { AppBar };
