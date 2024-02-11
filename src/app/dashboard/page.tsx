import * as React from 'react'
import Box from '@mui/material/Box'

import { getSession } from '@auth0/nextjs-auth0'
import { Container, Typography } from '@mui/material';
import Copyright from '@/components/Copyright';

async function Dashboard() {
  const session = await getSession();
  const items: any[] = [];

  return (
     <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Welcome {session?.user.email} to the dashboard
        </Typography>

        <Box>
          {items.map((item, i) => (
             <Typography key={i} variant="h5" sx={{ mb: 2 }}>
               {item.name}
             </Typography>)
          )}
        </Box>
        <Copyright />
      </Box>
    </Container>
  )
}
export default Dashboard
