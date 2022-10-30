import { FC, FormEventHandler } from 'react';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';

interface EntryGridProps {
}

const EntryGrid: FC<EntryGridProps> = () => {
  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Grid item xs={8}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            id="playername"
            name="playername"
            label="Player Name"
            type="text"
            required
            size="small"
            variant="standard"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            size="small"
            variant="standard"
          />
          <Button type="submit" variant="contained" sx={{ ml: 1 }}>Entry</Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export { EntryGrid };
