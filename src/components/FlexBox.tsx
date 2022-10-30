import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

interface FlexBoxProps {
  children: ReactNode;
}

const FlexBox: FC<FlexBoxProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {children}
    </Box>
  );
};

export { FlexBox };
