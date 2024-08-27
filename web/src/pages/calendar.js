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
import { getTime } from "../utils/date-helpers";
import { AnimatePresence, motion } from "framer-motion";



export default function CalendarPage({data}) {

    //  Root data for all organizations --->
  const [ organizations, setOrganizations ]   = useState( [] );

    //  Event data that gets passed
    //  into the calendar --->
  const [ events, setEvents ]                 = useState( [] );  
  
    //  Organizations filtered by
    //  user --->
  const [ filteredGroups, setFilteredGroups ] = useState( [] );
  
    //  Stores events sorted by day --->
  const [ sortedByDays, setSortedByDays ]     = useState( [] );
  
    //  Stores events of a particular
    //  day when user clicks a
    //  date on the calendar --->
  const [ selectedEvents, setSelectedEvents ] = useState( [] );
  
    //  Toggle modal on and off --->
  const [ modalToggle, setModalToggle ]       = useState( false );

    //  Toggles event filter on and off --->
  const [filterToggle,  setFilterToggle ] = React.useState(false);
  


  const [ popoverAnchor, setPopoverAnchor ]   = useState( undefined );
  const [ currentEvent, setCurrentEvent ]     = useState( undefined );

  const open = Boolean(popoverAnchor);
  const id = open ? 'simple-popover' : undefined;







    //  Sets root organization data --->
  useEffect( () => {
    const organizationData = JSONData.sort( (a, b) => a.name.localeCompare( b.name ) );

    setOrganizations( organizationData );
    setFilteredGroups( organizationData );
    sortEventsByDays( organizationData );

  }, [ organizations ]);



    //  Updates UI when user filters groups --->
  useEffect( () => {
    const groups    = filteredGroups;
    const tmpEvents = getEvents( groups );

    setEvents( tmpEvents );
    
  }, [ filteredGroups ]);







    //  Creates event data for calendar --->
  const getEvents = (inputOrganizations) => {
    
    return inputOrganizations.map( (organization) => {
      
      return organization.events.map( (event) => {
        const url = event.url || event.location?.url || '';

        return {
          title    : event.name,
          start    : new Date(event.startDate),
          end      : new Date(event.endDate),
          allDay   : false,
          url,
          resource : organization.name,
          day      : event.startDate
        }

      })}).flat();
  }



const handleSelectedOrganizationsChanged = (selectedOrganizations) => {
    const tmpEvents = getEvents(selectedOrganizations);
    setEvents(tmpEvents);
  }



    //  Updates selectedEvents state and opens modal
    //  when user clicks a date on the calendar --->
  const handleEventClick = (clickInfo) => {

    const date   = new Date( clickInfo.event._def.extendedProps.day );
    const groups = sortedByDays.findIndex( a => compareDates( new Date( a[0].startDate ), new Date( date ) ) );

    clickInfo.jsEvent.preventDefault();
    setSelectedEvents( sortedByDays[groups] );
    setModalToggle( true );
    toggleScrolling( 'stop' );

  }

  const handleMouseEnter = (eventInfo) => {
    setPopoverAnchor(eventInfo.el);
    setCurrentEvent(eventInfo.event);
  }

  const handleMouseLeave = (eventInfo) => {
    setPopoverAnchor(undefined);
    setCurrentEvent(undefined);
  }



    //  Used by calendar to render markup for event data --->
  const renderEventContent = (eventInfo) => {
    
    return(
      <article className={ styles.eventListing }>

        <p className={ styles.eventText }>
          { eventInfo.event._def.extendedProps.resource }
        </p>

        <p className={ styles.eventText }>
          <b>
            {
              getTime( eventInfo.event.start.getHours(), eventInfo.event.start.getMinutes() )
            } - {
              getTime( eventInfo.event.end.getHours(), eventInfo.event.end.getMinutes() )
            }
          </b>
        </p>

      </article>
    );
  }



    //  Checks whether or not two dates are the same --->
  const compareDates = (dayA, dayB) => {
    
    const day01    = new Date( dayA );
    const day02    = new Date( dayB );
    let   sameDay  = false;
    
    day01.getFullYear() === day02.getFullYear() &&
    day01.getMonth()    === day02.getMonth()    &&
    day01.getDate()     === day02.getDate()      ?

    sameDay = true : sameDay = false;


    return sameDay;
  }

   
  
    //  Sorts events by day and saves to sortedByDays state ---> 
  const sortEventsByDays = (companies) => {

    const sortedEvents = [];


    companies.forEach( a => {

      a.events.forEach( b => {

        if( sortedEvents.length === 0 ){ sortedEvents.push( [b] ); }
        else{

          let counter  = 0,
              dayFound = false,
              index    = 0;


          while( counter <= sortedEvents.length - 1 && !dayFound ){

            const comparison = compareDates( sortedEvents[ index ][ 0 ].startDate, b.startDate );

            if( comparison ){ dayFound = true; }
            else{ counter++; index++; }

          }

          if( dayFound ){ sortedEvents[ index ].push(b); }
          else{ sortedEvents.push( [b] ); }
        }

      });
    });
    
    setSortedByDays( sortedEvents );
  }



  //  Creates data to be passed into the calendar
  /*const createCalendarData= (eventData)=>{
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
  }*/



    //  Disables and enables scrolling on <body> when modal open and closes --->
  const toggleScrolling = (status) => {

    if( status === 'stop'  ){ document.body.style.overflow = 'hidden'; }
    if( status === 'start' ){ document.body.style.overflow = 'scroll'; }

  }



    //  Creates a list of all company names for group filter --->
  const createGroupList = (groups) => {

    const names = [];

    groups.forEach( a => names.push( a.name ) );
    
    return names;

  }



    //  Gets data for organizations filtered by user then
    //  updates filteredGroups state --->
  const filterGroups = (groups) => {

    let selectedGroups = [];

    if( groups[0] === 'all' ){ selectedGroups = organizations; }
    else{

      groups.forEach( a => {
        const groupSearch = organizations.findIndex( b => a === b.name );

        selectedGroups.push( organizations[ groupSearch ] );
      });
    }
    
    setFilteredGroups( selectedGroups );
    sortEventsByDays( selectedGroups );
  }



    //  Toggles filterToggle state when user clicks filter button --->
  const handleFilterToggle = (state) => {
    if(state){
        toggleScrolling('stop');
        setFilterToggle(true);
    }
    else{
        toggleScrolling('start');
        setFilterToggle(false);
    }
}



  

  return (
    <PageLayout data={data}>

      {
        modalToggle &&
        <Modal toggle={ (value) => { setModalToggle( value ); toggleScrolling( 'start' ) } }>

          <EventList data={ selectedEvents } />

        </Modal>
      }

      <section className={ styles.pageContainer }>



        <AnimatePresence>

          { filterToggle && (
            <motion.article
              key="groupFilter"
              className={ styles.filterContainer }
              initial={{ transform: 'perspective(100px) translateZ(-10000px) rotateX(70deg)' }}
              animate={{
                transform: [
                  'perspective(100px) translateZ(-10000px) rotateX(70deg)',
                  'perspective(100px) translateZ(-8334px)  rotateX(70deg)',
                  'perspective(100px) translateZ(-6668px)  rotateX(70deg)',
                  'perspective(100px) translateZ(-5002px)  rotateX(70deg)',
                  'perspective(100px) translateZ(-3336px)  rotateX(70deg)',
                  'perspective(100px) translateZ(-1670px)  rotateX(70deg)',
                  'perspective(100px) translateZ(0)        rotateX(0)'
                  
                ]

              }}
              exit={{
                transform: [
                  'perspective(100px) translateZ(0)        rotateX(0)',
                  'perspective(100px) translateZ(-1670px)  rotateX(-70deg)',
                  'perspective(100px) translateZ(-3336px)  rotateX(-70deg)',
                  'perspective(100px) translateZ(-5002px)  rotateX(-70deg)',
                  'perspective(100px) translateZ(-6668px)  rotateX(-70deg)',
                  'perspective(100px) translateZ(-8334px)  rotateX(-70deg)',
                  'perspective(100px) translateZ(-10000px) rotateX(-70deg)'

                ]

              }}
              transition={{ duration: 0.3 }}
            >
              <GroupFilter
                nameList={ createGroupList( organizations ) }
                toggle={ (value) => handleFilterToggle( value ) }
                resultList={ filterGroups }
                />
              
            </motion.article>
          )}

        </AnimatePresence>

        <article className={ styles.buttonContainer }>
  
          <button
            type="button"
            className={ `srcryBox srcryTxt ${ styles.calPage } ${ styles.calendarButton } ${ styles.filterButton }` }
            onClick={ () => handleFilterToggle( !filterToggle ) }
          >
            filter events
          </button>

          <a
            className={ `srcryBox srcryTxt ${ styles.calPage } ${ styles.calendarButton } ${ styles.downloadButton }` }
            href="/mke_tech_events.ics"
            download="calendar.ics"
          >
            download ics file
          </a>
  
        </article>

        <section className={ `srcryBox ${ styles.calPage } ${ styles.calContainer }` }>

          <FullCalendar
            plugins={ [dayGridPlugin, timeGridPlugin, interactionPlugin] }
            headerToolbar={{
              start  : 'dayGridMonth timeGridWeek timeGridDay',
              center : 'prev title next',
              end    : ''
            }}
            handleWindowResize={ true }
            initialView='dayGridMonth'
            eventColor='green'
            eventDisplay='block'
            selectable={ true }
            selectMirror={ true }
            dayMaxEvents={ true }
            weekends={ true }
            events={ events }
            eventClick={ handleEventClick }
            eventContent={ renderEventContent }
            width="100%"
            height="100%"
            contentHeight="auto"
            expandRows="true"
            aspectRatio="unset"
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
