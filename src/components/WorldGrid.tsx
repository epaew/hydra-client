import { useState, FC } from 'react';
import { Box, Grid, Paper, ToggleButton } from '@mui/material';
import styled from '@emotion/styled';

import { useTextWorld } from '../hooks';

interface WorldGridProps {
}

const Field = styled.pre({
  fontFamily: 'Monaco, monospace',
});

const WorldGrid: FC<WorldGridProps> = () => {
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const world = useTextWorld({ autoRefresh });

  return (
    <Grid item xs={12}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Field>{world}</Field>
        <Box>
          <ToggleButton
            value='autoRefresh'
            color='primary'
            selected={autoRefresh}
            onChange={() => setAutoRefresh(!autoRefresh)}
            sx={{ ml: 1 }}
          >
            {autoRefresh ? '自動更新：有効' : '自動更新：無効'}
          </ToggleButton>
        </Box>
      </Paper>
    </Grid>
  );
};

export { WorldGrid };
