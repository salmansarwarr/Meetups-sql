import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', width: "100%", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress sx={{height: "100%"}}/>
    </Box>
  );
}
