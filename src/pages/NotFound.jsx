import React from "react";
import { Error as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Box sx={{ p: 4, border: "1px solid #e0e0e0", borderRadius: 2, boxShadow: 3 }}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <ErrorIcon color="error" sx={{ fontSize: 80 }} />
          <Typography variant="h2" color="text.primary">
            404
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Sorry, the page you're looking for doesn't exist.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Go Back Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default NotFound;
