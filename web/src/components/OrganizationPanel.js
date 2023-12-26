import React, {useState} from "react"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import MeetingsDialog from "./MeetingsDialog";

export default function OrganizationPanel({ organization }) {
  const [selectedOrganization, setSelectedOrganization] = useState();

  const closeDialog = () => {
    setSelectedOrganization(undefined);
  }

  return (
    <>
      <Card className='mb-3 p-4' style={{background:'#101C79'}} onClick={() => setSelectedOrganization(organization)}>
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
              <a href={organization.url} target='_blank' className="text-sm">
                <Typography
                  variant="h4"
                  align="Left"
                  color="#FFC52F"
                >
                 <u>Visit Site</u>
                </Typography>
              </a>
          </CardActions>
        </CardActionArea>
      </Card>

      <MeetingsDialog
        organization={selectedOrganization}
        handleCloseClicked={() => closeDialog()}
      />
    </>
  )
}