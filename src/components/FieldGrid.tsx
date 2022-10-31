import { FC } from 'react';
import { Grid, Paper } from '@mui/material';
import styled from '@emotion/styled';

interface FieldGridProps {
  children: string | undefined;
}

const Field = styled.pre({
  fontFamily: 'Monaco, monospace',
});

const FieldGrid: FC<FieldGridProps> = ({ children }) => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Field>{children}</Field>
      </Paper>
    </Grid>
  );
};

export { FieldGrid };
