import * as React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

const EventCard = ({ event }) => {
  const {location, name, url, image, startDate, endDate} = event;
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);

  return (
    <Card className='mb-3 p-4' style={{marginTop: 5, background:'#101C79'}}>
      <CardActionArea>
        {image && (
          <CardMedia
            component="img"
            height="270"
            image={image}
            alt={`${event.name} image`}
          />
        )}
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            color="#FFC52F"
            gutterBottom
          >
            {name}
          </Typography>

          <Typography
            variant="h6"
            align="center"
            color="#FFC52F"
            gutterBottom
          >
            {location.place}
          </Typography>

          <Typography
            variant="h6"
            align="center"
            color="#FFC52F"
            gutterBottom
          >
            {location?.address?.streetAddress}
          </Typography>

          <Typography
            variant="h6"
            align="center"
            color="#FFC52F"
            gutterBottom
          >
            {formattedStartDate.toLocaleString()} until {formattedEndDate.toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <a href={url} target='_blank'>
            <Typography
              variant="h6"
              align="Left"
              color="#FFC52F"
            >
              <u>Register for Event</u>
            </Typography>
          </a>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default EventCard;
