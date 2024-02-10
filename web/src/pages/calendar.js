import * as React from "react"
import {graphql} from "gatsby";
import Grid from '@mui/material/Grid';
import {Header} from "../components/Header";
import JSONData from "../data/combined.json";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function CalendarPage({data}) {

  const events = JSONData.map((organization) => {
    return organization.events.map((event) => {
      return {
        title: event.name,
        start: Date.parse(event.startDate),
        end: Date.parse(event.endDate),
        allDay: false,
        resource: organization.name,
        color: "purple",
      }
    })
  }).flat();

  const handleEventClick = (clickInfo) => {
    alert('Event: ' + clickInfo.event.title);
  }

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <b>{eventInfo.startTime}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    )
  }

  return (
    <Header data={data}>
      <Grid container>
        <Grid item xs={12}>
         <a href='/mke_tech_events.ics' download='calendar.ics'>Download ics file</a>
        </Grid>

        <Grid item xs={12}>
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
          />
        </Grid>
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
