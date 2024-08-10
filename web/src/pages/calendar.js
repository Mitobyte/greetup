import React, {useEffect, useState} from "react"
import * as styles from './calendar.module.css';
import {graphql} from "gatsby";
import Grid from '@mui/material/Grid';
import Popover from "@mui/material/Popover";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import JSONData from "../data/combined.json";
import {Header} from "../components/Header";
import OrganizationFilter from "../components/OrganizationFilter";
import { PageLayout } from "../components/page-layout/page-layout";
import { StylesContext } from "@mui/styles";
import { Modal } from "../components/modal/modal";
import { EventList } from "../components/event-list/EventList";
import { GroupFilter } from "../components/group-filter/GroupFilter";

export default function CalendarPage({data}) {
  const [organizations, setOrganizations] = useState([]);
  const [events, setEvents] = useState([]);
  const [popoverAnchor, setPopoverAnchor] = useState(undefined);
  const [currentEvent, setCurrentEvent] = useState(undefined);



  //  For storing events after sorting by the day
  const [sortedByDays, setSortedByDays] = useState([]);

  //  Stores list of events when user clicks on a date
  const [selectedEvents, setSelectedEvents] = useState([]);

  //  Toggle modal on and off
  const [modalToggle, setModalToggle] = useState(false);



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
    
    const tmpEvents = sortEventsByDays(organizations);

    setSortedByDays(tmpEvents);
    setEvents(createCalendarData(tmpEvents));


    //const tmpEvents = getEvents(organizations);
    //setEvents(tmpEvents);
    //sortEventsByDays(organizations);
  }, [organizations]);



  const handleSelectedOrganizationsChanged = (selectedOrganizations) => {
    const tmpEvents = getEvents(selectedOrganizations);
    setEvents(tmpEvents);
  }



  const handleEventClick = (clickInfo) => {
    const listIndex = clickInfo.event._def.extendedProps.index;

    setSelectedEvents(sortedByDays[listIndex]);
    setModalToggle(true);
    toggleScrolling('stop');
    
    /*const {event} = clickInfo;
    if (event.url !== '') {
      window.open(event.url);
    }

    clickInfo.jsEvent.preventDefault();*/
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
    const events = eventInfo.event._def.extendedProps.events;

    return (
      <article className={styles.eventCell}>
        <h3 className={styles.eventCount}>{events}</h3>
        <i className={styles.eventText}>event{events > 1 ? 's' : ''}</i>
      </article>
    )
  }



  //  checks whether or not two dates are the same
  const compareDates = (dayA, dayB)=>{
    const day01 = new Date(dayA);
    const day02 = new Date(dayB);
    let same = false;
    
    day01.getFullYear() === day02.getFullYear() &&
    day01.getMonth()    === day02.getMonth()    &&
    day01.getDate()      === day02.getDate()      ?
    same = true : same = false;
    return same;
  }



  //  Sorts events into arrays for each day there's one or more events 
  const sortEventsByDays = (companies)=>{
    const sortedEvents = [];

    companies.forEach(a=> {
      a.events.forEach(b =>{
        if(sortedEvents.length === 0){ sortedEvents.push([b]);  }
        else{
          let counter = 0;
          let dayFound = false;
          let index = 0;

          while(counter <= sortedEvents.length - 1 && !dayFound){
            const comparison = compareDates(sortedEvents[index][0].startDate, b.startDate);

            if(comparison){ dayFound = true; }
            else{ counter++; index++; }
          }

          if(dayFound){sortedEvents[index].push(b);}
          else{ sortedEvents.push([b]); }
        }
      });
    });
    
    return sortedEvents;
  }



  //  Creates data to be passed into the calendar
  const createCalendarData= (eventData)=>{
    const calendarData = [];
    let indexLocation = 0;

    eventData.forEach(a=>{
      calendarData.push({
        date: a[0].startDate,
        events: a.length,
        index: indexLocation,
        backgroundColor: 'hsl(var(--blue-50), 1)',
        borderColor: 'hsl(var(--blue-50), 1)',
      });
      indexLocation++;
    });
    return calendarData;
  }

  //  Disables and enables website scrolling when modal open and closes
  const toggleScrolling = (status)=>{
    if(status === 'stop'){ document.body.style.overflow = 'hidden';}
    if(status === 'start'){ document.body.style.overflow = 'scroll';}
  }

  //  Creates a list of company names for group filter
  const createGroupList = (groups) =>{
    const names = [];

    groups.forEach(a=>{ names.push(a.name); });

    return names;
  }



  const open = Boolean(popoverAnchor);
  const id = open ? 'simple-popover' : undefined;

  return (
    <PageLayout data={data}>

      {
        modalToggle === true &&
        <Modal toggle={(value) => {setModalToggle(value); toggleScrolling('start')}}>
          <EventList data={selectedEvents} />
        </Modal>
      }
      <GroupFilter />

      <section className={styles.pageContainer}>
        <section className={`srcryBox ${styles.calPage} ${styles.calContainer}`}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              start: 'dayGridMonth timeGridWeek timeGridDay',
              center: 'prev title next',
              end: ''
            }}
            handleWindowResize={true}
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
        </section>
      </section>

    </PageLayout>
    /*<Header data={data}>
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
    </Header>*/
  );
}

/*export const query = graphql`{
  file(relativePath: {eq: "logo.png"}) {
    childImageSharp {
      gatsbyImageData(width: 532, height: 214, placeholder: BLURRED, layout: FIXED)
    }
  }
}`*/
