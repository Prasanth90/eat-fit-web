import * as React from 'react'
import Box from '@mui/material/Box'

import { getAccessToken, getSession } from '@auth0/nextjs-auth0'
import { Container, Typography } from '@mui/material'
import Copyright from '@/components/Copyright'

const getItemsFromAPI = async (): Promise<any[]> => {
  const { accessToken } = await getAccessToken()
  const response = await fetch('https://eat-fit-api.onrender.com/nearby/1000', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
  const items = await response.json()
  return items
}

async function Dashboard() {
  const session = await getSession()
  const restaurants: any[] = await getItemsFromAPI()
  const foodItems = restaurants
    .map(r => {
      return r.foodItems.map((f: any) => {
        return {
          ...f,
          restaurantName: r.name,
        }
      })
    })
    .flat()

  return (
    <Container maxWidth='xl'>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant='h5' sx={{ mb: 2 }}>
          Welcome {session?.user.email} to the dashboard
        </Typography>

        <Box>
          {foodItems.map((foodItem, i) => (
            <Box key={i} display='flex' gap={4}>
              <Typography key={i} variant='h5' sx={{ mb: 2, minWidth: 200 }}>
                {foodItem.name}
              </Typography>
              <Typography key={i} variant='h5' sx={{ mb: 2 }}>
                {foodItem.calories} Calories
              </Typography>
              <Typography key={i} variant='h5' sx={{ mb: 2 }}>
                Protein {foodItem.protein}g
              </Typography>
              <Typography key={i} variant='h5' sx={{ mb: 2 }}>
                Carbs {foodItem.carbohydrate}g
              </Typography>
              <Typography key={i} variant='h5' sx={{ mb: 2 }}>
                Fat {foodItem.fat}g
              </Typography>
              <Typography key={i} variant='h5' sx={{ mb: 2, minWidth: 150 }}>
                Price {foodItem.price}$
              </Typography>
              <Typography key={i} variant='h5' sx={{ mb: 2 }}>
                {foodItem.restaurantName}
              </Typography>
            </Box>
          ))}
        </Box>
        <Copyright />
      </Box>
    </Container>
  )
}
export default Dashboard
