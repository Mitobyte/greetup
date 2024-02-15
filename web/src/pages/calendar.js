import React, {useEffect, useState} from "react"
import {graphql} from "gatsby";
import Grid from '@mui/material/Grid';
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import JSONData from "../data/combined.json";
import {Header} from "../components/Header";
import OrganizationFilter from "../components/OrganizationFilter";

export default function CalendarPage({data}) {
  const [organizations, setOrganizations] = useState([]);
  const [events, setEvents] = useState([]);
  const [popoverAnchor, setPopoverAnchor] = useState(undefined);
  const [currentEvent, setCurrentEvent] = useState(undefined);

  const getEvents = (inputOrganizations) => {
    return inputOrganizations.map((organization) => {
      return organization.events.map((event) => {
        const url = event.url || event.location?.url || '';
        return {
          title: event.name,
          start: Date.parse(event.startDate),
          end: Date.parse(event.endDate),
          allDay: false,
          url,
          resource: organization.name,
          color: "purple",
        }
      })
    }).flat();
  }

  useEffect(() => {
    setOrganizations(JSONData.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  useEffect(() => {
    const tmpEvents = getEvents(organizations);
    setEvents(tmpEvents);
  }, [organizations]);

  const handleSelectedOrganizationsChanged = (selectedOrganizations) => {
    const tmpEvents = getEvents(selectedOrganizations);
    setEvents(tmpEvents);
  }

  const handleEventClick = (clickInfo) => {
    const {event} = clickInfo;
    if (event.url !== '') {
      window.open(event.url);
    }

    clickInfo.jsEvent.preventDefault();
  }

  const handleMouseEnter = (eventInfo) => {
    setPopoverAnchor(eventInfo.el);
    setCurrentEvent(eventInfo.event);
  }

  const handleMouseLeave = (eventInfo) => {
    setPopoverAnchor(undefined);
    setCurrentEvent(undefined);
  }

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    )
  }

  const open = Boolean(popoverAnchor);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Header data={data}>
      <Grid container>
        <Grid item xs={12}>
         <a href='/mke_tech_events.ics' download='calendar.ics'>Download ics file</a>
        </Grid>

        <Grid item xs={4}>
          <OrganizationFilter
            organizations={organizations}
            selectedOrganizationsChanged={handleSelectedOrganizationsChanged}
          />
        </Grid>

        <Grid item xs={8}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            eventColor='green'
            eventDisplay='block'
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            eventMouseEnter={handleMouseEnter}
          />
        </Grid>
      </Grid>

      <Popover
        id={id}
        open={open}
        anchorEl={popoverAnchor}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
          <b>{currentEvent?.extendedProps.resource}</b><br/>
          {currentEvent?.title}<br/>
          <a href={currentEvent?.url} target='_blank'>More Info</a>
      </Popover>
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
