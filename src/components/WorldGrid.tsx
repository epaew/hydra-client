import { FC, ReactNode } from 'react';
import { Box, Grid, Paper, ToggleButton } from '@mui/material';
import styled from '@emotion/styled';

import { World } from '../types';

interface WorldGridProps {
  autoRefresh: boolean;
  setAutoRefresh: (autoRefresh: boolean) => void;
  world: World;
}

const Table = styled.table({
  border: '1px solid black',
  borderCollapse: 'collapse',
  margin: '0 auto 12px'
});
const TableBody = styled.tbody();
const TableRow = styled.tr();
const TableData = styled.td<{ size: number }>(({ size }) => ({
  border: '0.1px dotted #EEEEEE',
  fontSize: size * 0.6,
  textAlign: 'center',
  padding: 0,
  minHeight: size,
  height: size,
  minWidth: size,
  width: size,
}));
const TableDataItem = styled.p<{ color?: string }>(({ color }) => ({
  color,
  margin: 0,
}));

const Field: FC<World> = ({ width, height, foods, players }) => {
  const tableDataSize = Math.floor(window.innerWidth / width) - 1;
  const data: ReactNode[][] = Array.from(new Array(height), () => new Array(width).fill(null));

  foods.forEach(food => {
    data[food.point.y][food.point.x] = <TableDataItem>{food.value}</TableDataItem>;
  });
  players.forEach(player => {
    const { color, head, bodies } = player;

    // head
    data[head.point.y][head.point.x] = (
      <TableDataItem color={color}>{head.value}</TableDataItem>
    );

    // bodies
    bodies.forEach((body, index) => {
      data[body.point.y][body.point.x] = (
        <TableDataItem color={color}>{body.value}</TableDataItem>
      );
    });
  });

  return (
    <Table>
      <TableBody>
        {data.map((row, ridx) => {
          return (
            <TableRow key={ridx}>
              {row.map((col, cidx) => {
                return <TableData key={`${ridx} ${cidx}`} size={tableDataSize} >{col}</TableData>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const WorldGrid: FC<WorldGridProps> = ({ autoRefresh, setAutoRefresh, world }) => {
  return (
    <Grid item sx={{ my: 1 }}>
      <Paper sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box>
          <ToggleButton
            value='autoRefresh'
            color='primary'
            selected={autoRefresh}
            onChange={() => setAutoRefresh(!autoRefresh)}
            sx={{ mb: 1 }}
          >
            {autoRefresh ? '自動更新：有効' : '自動更新：無効'}
          </ToggleButton>
        </Box>
        <Field {...world} />
      </Paper>
    </Grid>
  );
};

export { WorldGrid };
