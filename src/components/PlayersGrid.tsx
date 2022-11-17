import { FC } from 'react';
import { Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

import { usePlayer } from '../contexts';
import { World } from '../types';

const PlayersGrid: FC<{ players: World.Player[] }> = ({ players }) => {
  const [you,] = usePlayer();

  const listItems = players.map(player => {
    const isYou = player.id === you?.id;

    return (
      <ListItem>
        <ListItemText sx={{ color: player.color }}>
          {player.name}
          {isYou ? ' (you)' : null}
        </ListItemText>
      </ListItem>
    );
  });

  return (
    <Grid item xs={5}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography component="h2">Active Players</Typography>
        <List>{listItems}</List>
      </Paper>
    </Grid>
  );
};

export { PlayersGrid };
