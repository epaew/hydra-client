import { useState, FC, FormEventHandler } from 'react';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import { usePlayer } from '../contexts';

interface EntryGridProps {}

const EntryGrid: FC<EntryGridProps> = () => {
  const [playerName, setPlayerName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [player, setPlayer] = usePlayer();

  if (player) { return null; }

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (!(!!playerName && !!password)) { return; }

    setPlayer({ name: playerName, password });
  };

  return (
    <Grid item xs={5}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <TextField
            id="playername"
            name="playername"
            label="Player Name"
            type="text"
            required
            size="small"
            variant="standard"
            onChange={e => setPlayerName(e.target.value)}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            size="small"
            variant="standard"
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>Entry</Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export { EntryGrid };
