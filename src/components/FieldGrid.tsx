import { FC } from 'react';
import { Grid, Paper } from '@mui/material';

interface FieldGridProps {
  children: string | undefined;
}

const FieldGrid: FC<FieldGridProps> = ({ children }) => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <pre>
          <code>{children}</code>
        </pre>
      </Paper>
    </Grid>
  );
};

export { FieldGrid };
