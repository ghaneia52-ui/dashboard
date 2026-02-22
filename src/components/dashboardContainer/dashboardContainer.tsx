import React from 'react'
import { Box, Container } from "@mui/material";

function DashboardContainerComponents() {
 return (
    <React.Fragment>
     
      <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '93vh' ,width: '162vh' }} />
      </Container>
    </React.Fragment>
  );
}

export default DashboardContainerComponents