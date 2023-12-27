import * as React from "react"
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OrganizationsPanel from "../components/OrganizationPanel"
import { GatsbyImage } from "gatsby-plugin-image";
import JSONData from "../data/combined.json"
import {graphql} from "gatsby";

export default function Home({data}) {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <header>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <GatsbyImage alt='organization image' image={data.file.childImageSharp.gatsbyImageData} />
          </Grid>
          <Grid item className='pt-4' md={6}>
            <Typography  variant="h4" align="center" color="primary" gutterBottom>
              Milwaukee is home to a vibrant tech community. Here are some of the
              organizations that help make it great. <br/>
              <span>
                 <Typography  variant="h4" align="center" color="secondary" gutterBottom>
                    Click on an organization to start!
                 </Typography>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </header>
      <Grid container spacing={2}>
    {
      JSONData.map((organization, index) => {
        return <Grid item xs={6}>
          <OrganizationsPanel key={`org-${index}`} organization={organization} />
        </Grid>
      })
    }
      </Grid>
    </Container>
  );
}

export const query = graphql`{
  file(relativePath: {eq: "logo.png"}) {
    childImageSharp {
      gatsbyImageData(width: 532, height: 214, placeholder: BLURRED, layout: FIXED)
    }
  }
}`