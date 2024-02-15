import * as React from "react"
import Grid from '@mui/material/Grid';
import OrganizationsPanel from "../components/OrganizationPanel"
import JSONData from "../data/combined.json"
import {Header} from "../components/Header";
import {graphql} from "gatsby";

export default function Home({data}) {
  const organizations = JSONData.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Header data={data}>
      <Grid container spacing={2}>
        {
          organizations.map((organization, index) => {
            return <Grid item xs={12} md={6}>
              <OrganizationsPanel key={`org-${index}`} organization={organization} />
            </Grid>
          })
        }
      </Grid>
    </Header>
  );
}

export const query = graphql`{
  file(relativePath: {eq: "logo.png"}) {
    childImageSharp {
      gatsbyImageData(width: 532, height: 214, placeholder: BLURRED, layout: FIXED)
    }
  }
}`
