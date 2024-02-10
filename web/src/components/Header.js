import * as React from "react";
import {Link} from "gatsby";
import {GatsbyImage} from "gatsby-plugin-image";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

export const Header = ({data, children}) => {

  return (
    <Container>
      <CssBaseline />
      <header>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <GatsbyImage alt='organization image' image={data?.file?.childImageSharp?.gatsbyImageData} />
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
        <Grid item md={6}>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/calendar/'>Calendar</Link></li>
          </ul>
        </Grid>
      </Grid>
      {children}
    </Container>
  )
}
