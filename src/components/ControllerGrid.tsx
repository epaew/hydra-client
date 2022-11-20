import { useEffect, FC } from 'react';
import { Alert, Grid, IconButton, Paper, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from '@mui/icons-material';
import { useSetPlayerHeadDirection, SetPlayerHeadDirection } from '../hooks';

interface ControllerGridProps {}

const useOnKeyDown = (setPlayerHeadDirection: SetPlayerHeadDirection) => {
  const keyMap = new Map<string, () => void>([
    ['ArrowLeft',  () => setPlayerHeadDirection('West')],
    ['ArrowDown',  () => setPlayerHeadDirection('South')],
    ['ArrowUp',    () => setPlayerHeadDirection('North')],
    ['ArrowRight', () => setPlayerHeadDirection('East')],
    ['h',          () => setPlayerHeadDirection('West')],
    ['j',          () => setPlayerHeadDirection('South')],
    ['k',          () => setPlayerHeadDirection('North')],
    ['l',          () => setPlayerHeadDirection('East')],
    ['w',          () => setPlayerHeadDirection('North')],
    ['a',          () => setPlayerHeadDirection('West')],
    ['s',          () => setPlayerHeadDirection('South')],
    ['d',          () => setPlayerHeadDirection('East')],
  ]);

  return (e: KeyboardEvent) => {
    e.preventDefault();

    const onKeyDown = keyMap.get(e.key);
    onKeyDown && onKeyDown();
  };
};

const ControllerGrid: FC<ControllerGridProps> = () => {
  const { setPlayerHeadDirection, error } = useSetPlayerHeadDirection();
  const onKeyDown = useOnKeyDown(setPlayerHeadDirection);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <Grid item xs={5}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {error && <Alert severity="error">{error.message}</Alert>}
        <Grid container columns={7}>
          <Grid item xs={3} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large' onClick={() => setPlayerHeadDirection('North')}>
              <KeyboardArrowUp />
            </IconButton>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={2} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large' onClick={() => setPlayerHeadDirection('West')}>
              <KeyboardArrowLeft />
            </IconButton>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large' onClick={() => setPlayerHeadDirection('East')}>
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={3} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large' onClick={() => setPlayerHeadDirection('South')}>
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
