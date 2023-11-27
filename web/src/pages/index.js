import * as React from "react"
import { Container, CssBaseline, Typography } from '@mui/material';
import OrganizationsPanel from "../components/organizationPanel"
import JSONData from "../../../data/combined.json"

export default function Home() {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <header>
        <Typography variant="h2" align="center" color="primary" gutterBottom>
          Milwaukee Meetups
        </Typography>
      </header>
      <div className="p-4">
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Milwaukee is home to a vibrant tech community. Here are some of the
          organizations that help make it great.
        </Typography>
      </div>
      <div className="flex flex-wrap justify-around">
      {
        JSONData.map((organization, index) => {
          return <OrganizationsPanel key={`org-${index}`} organization={organization} />
        })
      }
      </div>
    </Container>
  )
}
