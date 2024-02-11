import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Copyright from "@/components/Copyright";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

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
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Welcome !!!
        </Typography>
        <Link href="/dashboard" color="secondary" component={NextLink}>
          Login to visit the dashboard page
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
}
