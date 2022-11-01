import { useCallback, useEffect, FC } from 'react';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from '@mui/icons-material';
import { useHTTPClient, usePlayer } from '../contexts';

type Direction = 'North' | 'East' | 'South' | 'West';
interface ControllerGridProps {
}

const createOnKeyPress = (setPlayerDirection: (direction: Direction) => void) => {
  return (e: KeyboardEvent) => {
    e.preventDefault();

    switch (e.key) {
      case 'a':
      case 'h':
      case 'ArrowLeft':
        setPlayerDirection('West');
        break;
      case 's':
      case 'j':
      case 'ArrowDown':
        setPlayerDirection('South');
        break;
      case 'w':
      case 'k':
      case 'ArrowUp':
        setPlayerDirection('North');
        break;
      case 'd':
      case 'l':
      case 'ArrowRight':
        setPlayerDirection('East');
        break;
    }
  };
};

const ControllerGrid: FC<ControllerGridProps> = () => {
  const httpClient = useHTTPClient();
  const [player] = usePlayer();

  const setPlayerDirection = useCallback((direction: Direction) => {
    if (!player) { return; }

    httpClient.post(`/api/player/${player.id}/move`, JSON.stringify({ direction, password: player.password }))
  }, [httpClient, player]);
  const onKeyPress = createOnKeyPress(setPlayerDirection);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);

    return () => document.removeEventListener('keydown', onKeyPress);
  }, [onKeyPress]);

  return (
    <Grid item xs={8}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Grid container columns={7}>
          <Grid item xs={3} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large' onClick={() => setPlayerDirection('North')}>
              <KeyboardArrowUp />
            </IconButton>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={2} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large' onClick={() => setPlayerDirection('West')}>
              <KeyboardArrowLeft />
            </IconButton>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large' onClick={() => setPlayerDirection('East')}>
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={3} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large' onClick={() => setPlayerDirection('South')}>
              <KeyboardArrowDown />
            </IconButton>
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <Typography component="h3" align="center">wasd / hjkl / 矢印キーでも操作できます</Typography>
      </Paper>
    </Grid>
  );
};

export { ControllerGrid };
