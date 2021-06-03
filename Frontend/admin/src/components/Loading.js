import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" margin="1rem">
      <CircularProgress />
    </Box>
  );
};

export default Loading;
