import * as React from "react"
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OrganizationsPanel from "../components/OrganizationPanel"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default function Home({data}) {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <header>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Img fixed={data.file.childImageSharp.fixed} />
          </Grid>
          <Grid item className='pt-4' md={6}>
            <Typography  variant="h4" align="center" color="primary" gutterBottom>
              Milwaukee is home to a vibrant tech community. Here are some of the
              organizations that help make it great. <br/> Click on an organization to start!
            </Typography>
          </Grid>
        </Grid>
      </header>
      <Grid container spacing={2}>
    {
      data.allCombinedJson.edges.map((organization, index) => {
        return <Grid item xs={6}>
          <OrganizationsPanel key={`org-${index}`} organization={organization.node} />
        </Grid>
      })
    }
      </Grid>
    </Container>
  )
}

export const query = graphql`
  query {
    allCombinedJson {
      edges {
        node {
          id
          name
          image
          url
          events {
            description
            endDate
            image
            location {
              name
              address {
                streetAddress
              }
            }
            name
            startDate
            url
          }
        }
      }
    },
    file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 532, height: 214 ) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
  `