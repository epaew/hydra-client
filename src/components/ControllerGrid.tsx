import { FC } from 'react';
import { Grid, IconButton, Paper } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from '@mui/icons-material';

interface ControllerGridProps {
}

const ControllerGrid: FC<ControllerGridProps> = () => {
  return (
    <Grid item xs={8}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Grid container columns={7}>
          <Grid item xs={3} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large'>
              <KeyboardArrowUp />
            </IconButton>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={2} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large'>
              <KeyboardArrowLeft />
            </IconButton>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large'>
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={3} />
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <IconButton color='primary' size='large'>
              <KeyboardArrowDown />
            </IconButton>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Paper>
    </Grid>
  );
};

export { ControllerGrid };
