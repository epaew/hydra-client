import { useState, FC } from 'react';
import { Box, Grid, Paper, TextField, ToggleButton } from '@mui/material';
import styled from '@emotion/styled';

import { useTextWorld } from '../hooks';

interface WorldGridProps {
  refreshInterval: number;
}

const Field = styled.pre({
  fontFamily: 'Monaco, monospace',
});

const WorldGrid: FC<WorldGridProps> = () => {
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(1.0);
  const world = useTextWorld({ autoRefresh, refreshInterval });

  return (
    <Grid item xs={12}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Field>{world}</Field>
        <Box>
          <TextField
            id="refreshInterval"
            name="refreshInterval"
            label="更新間隔（秒）"
            type="number"
            size="small"
            variant="standard"
            inputProps={{ step: 0.1, min: 0.1 }}
            defaultValue={refreshInterval}
            onChange={e => {
              e.target.checkValidity() && setRefreshInterval(parseFloat(e.target.value) || 0);
            }}
          />
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
