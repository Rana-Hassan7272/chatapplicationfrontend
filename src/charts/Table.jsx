import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Paper, Typography } from '@mui/material';

const Table = ({ rows, columns, heading, rowHeight }) => {
  return (
    <Container sx={{ height: '100vh' }}>
      <Paper sx={{ padding: 2 }}>
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ textTransform: 'uppercase', marginBottom: 2 }}
        >
          {heading}
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid 
            rows={rows}
            columns={columns}
            rowHeight={rowHeight}
            getRowId={(row) => row._id}
            sx={{
              '& .MuiDataGrid-columnHeader': {
                bgcolor: '#333', // Change this to the color you want for the header
                color: 'white',
              },
              '& .MuiDataGrid-cell': {
                bgcolor: '#f5f5f5', // Optional: Change the background color of cells
              },
            }}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default Table;
