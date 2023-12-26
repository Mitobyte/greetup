import * as React from "react"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

export default function OrganizationPanel({ organization }) {
  return (
    <Card className='mb-3 p-4' style={{background:'#101C79'}}>
      <CardActionArea className='bg-blue-900'>
        <CardMedia
          component="img"
          height="200"
          image={organization.image}
          alt={`${organization.name} image`}
        />
      <CardContent>
          <Typography
            variant="h4"
            align="center"
            color="#FFC52F"
            gutterBottom
          >
            {organization.name}
          </Typography>
      </CardContent>
      <CardActions>
          <a href={organization.url} className="text-sm">
            <Typography
              variant="h4"
              align="Left"
              color="#FFC52F"
            >
              Visit Site
            </Typography>
          </a>
      </CardActions>
      </CardActionArea>
    </Card>
  )
}