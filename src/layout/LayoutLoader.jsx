import React from 'react';
import { Grid, Skeleton, Stack } from '@mui/material';
import { Dot } from '../components/VisualHidden';

export default function LayoutLoader() {
  return (
    <>
      <Grid container style={{ height: "calc(100vh - 4rem)" }}>
        <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Skeleton variant="rectangular" height="100%" />
        </Grid>
        <Grid item xs={12} sm={8} lg={6} md={5}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height="5rem" sx={{ marginBottom: '1rem' }} />
          ))}
        </Grid>
        <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Skeleton variant="rectangular" height="100%" />
        </Grid>
      </Grid>
    </>
  );
}
const TypingLoader=()=> {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot variant="circular" />
      <Dot variant="circular" />
      <Dot variant="circular" />
    </Stack>
  );
}
export {TypingLoader}