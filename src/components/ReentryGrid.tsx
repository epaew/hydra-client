import { FC, FormEventHandler } from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import { usePlayer } from '../contexts';

interface ReentryGridProps {}

const ReentryGrid: FC<ReentryGridProps> = () => {
  const [player, setPlayer] = usePlayer();

  if (!player) { return null; }

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setPlayer({ name: player.name, password: player.password });
  };

  return (
    <Grid item xs={5}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
          <Button type="submit" variant="contained" sx={{ ml: 1 }}>Reentry</Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export { ReentryGrid };
