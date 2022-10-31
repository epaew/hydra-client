import { useEffect, useState, FC } from 'react';
import { Grid, Paper } from '@mui/material';
import styled from '@emotion/styled';

import { useHTTPClient, HTTPClient } from '../contexts';

interface WorldProps {
  refreshInterval: number
}
interface WorldGridProps {
  refreshInterval: number
}

const getCurrentWorld = async (httpClient: HTTPClient): Promise<string> => {
  const res = await httpClient.get('/api/world.text', { headers: { Accept: 'text/plain' } });
  return res.text();
};
const Field = styled.pre({
  fontFamily: 'Monaco, monospace',
});

const World: FC<WorldProps> = ({ refreshInterval }) => {
  const httpClient = useHTTPClient();
  const [world, setWorld] = useState<string>();

  useEffect(() => {
    const timer = setInterval(
      async () => {
        setWorld(await getCurrentWorld(httpClient));
      },
      refreshInterval * 1000,
    )
    return () => clearInterval(timer);
  }, [httpClient, refreshInterval]);

  return <Field>{world}</Field>;
};

const WorldGrid: FC<WorldGridProps> = ({ refreshInterval }) => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <World refreshInterval={refreshInterval} />
      </Paper>
    </Grid>
  );
};

export { WorldGrid };
