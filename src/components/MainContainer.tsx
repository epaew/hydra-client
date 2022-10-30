import { FC, ReactNode } from 'react';
import { Box, Container, Grid } from '@mui/material';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {children}
        </Grid>
      </Container>
    </Box>
  );
};

export { MainContainer };
