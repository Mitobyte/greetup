import React, { useEffect, useState } from "react"
import * as styles                    from './calendar.module.css';
import FullCalendar                   from '@fullcalendar/react'
import dayGridPlugin                  from '@fullcalendar/daygrid'
import timeGridPlugin                 from '@fullcalendar/timegrid'
import interactionPlugin              from '@fullcalendar/interaction'
import JSONData                       from "../data/combined.json";
import { PageLayout }                 from "../components/page-layout/page-layout";
import { Modal }                      from "../components/modal/modal";
import { EventList }                  from "../components/event-list/EventList";
import { GroupFilter }                from "../components/group-filter/GroupFilter";
import { getTime }                    from "../utils/date-helpers";
import { AnimatePresence, motion }    from "framer-motion";
import { modalAnimation }             from "../utils/shared-animations";







export const Head = () => {
  
  return(
    <>
      <title>
        Milwaukee Tech Meetups
      </title>
      <meta
        name="description"
        content="A calendar showcaseing upcoming tech events in the greater Milwaukee area."
      />
    </>
  );
}







export default function CalendarPage() {

    //  Root data for all organizations --->
  const [ organizations, setOrganizations ]   = useState( [] );



    //  Event data that gets passed
    //  into the calendar --->
  const [ events, setEvents ]                 = useState( [] );


  
    //  Organizations filtered by
    //  user --->
  const [ filteredGroups, setFilteredGroups ] = useState( [] );



    //  List of organization names
    //  selected by user --->
  const [ filteredNames, setFilteredNames ]   = useState( [] );


  
    //  Stores events sorted by day --->
  const [ sortedByDays, setSortedByDays ]     = useState( [] );


  
    //  Stores events of a particular
    //  day when user clicks a
    //  date on the calendar --->
  const [ selectedEvents, setSelectedEvents ] = useState( [] );


  
    //  Toggle modal on and off --->
  const [ modalToggle, setModalToggle ]       = useState( false );



    //  Toggles event filter on and off --->
  const [filterToggle, setFilterToggle ]      = useState( false );







    //  Sets root organization data --->
  useEffect( () => {
    const organizationData = JSONData.sort( (a, b) => a.name.localeCompare( b.name ) );

    setOrganizations(  organizationData );
    setFilteredGroups( organizationData );
    sortEventsByDays(  organizationData );

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
          start    : new Date( event.startDate ),
          end      : new Date( event.endDate ),
          allDay   : false,
          url,
          resource : organization.name,
          day      : event.startDate
        }

      })}).flat();
  }



    //  Updates selectedEvents state and opens modal
    //  when user clicks a date on the calendar --->
  const handleEventClick = ( clickInfo ) => {

    const date   = new Date( clickInfo.event._def.extendedProps.day );
    const groups = sortedByDays.findIndex( a => compareDates( new Date( a[0].startDate ), new Date( date ) ) );

    clickInfo.jsEvent.preventDefault();
    setSelectedEvents( sortedByDays[ groups ] );
    setModalToggle( true );
    toggleScrolling( 'stop' );

  }



    //  Used by calendar to render markup for event data --->
  const renderEventContent = ( eventInfo ) => {
    
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

        if( sortedEvents.length === 0 ){ sortedEvents.push( [ b ] ); }
        else{

          let counter  = 0,
              dayFound = false,
              index    = 0;


          while( counter <= sortedEvents.length - 1 && !dayFound ){

            const comparison = compareDates( sortedEvents[ index ][ 0 ].startDate, b.startDate );

            if( comparison ){ dayFound = true; }
            else{ counter++; index++; }

          }

          if( dayFound ){ sortedEvents[ index ].push( b ); }
          else{ sortedEvents.push( [ b ] ); }
        }

      });
    });
    
    setSortedByDays( sortedEvents );
  }



    //  Disables and enables scrolling on <body> when modal open and closes --->
  const toggleScrolling = (status) => {

    if( status === 'stop'  ){ document.body.style.overflowY = 'hidden'; }
    if( status === 'start' ){ document.body.style.overflowY = 'scroll'; }

  }



    //  Creates a list of all company names for group filter --->
  const createGroupList = ( groups ) => {

    const names = [];

    groups.forEach( a => names.push( a.name ) );
    
    return names;

  }



    //  Gets data for organizations filtered by user then
    //  updates filteredGroups state --->
  const filterGroups = ( groups ) => {

    let selectedGroups = [];

    if( groups[0] === 'all' ){ selectedGroups = organizations; }
    else{

      groups.forEach( a => {
        const groupSearch = organizations.findIndex( b => a === b.name );

        selectedGroups.push( organizations[ groupSearch ] );
      });
    }
    
    setFilteredNames( groups );
    setFilteredGroups( selectedGroups );
    sortEventsByDays( selectedGroups );
  }



    //  Toggles filterToggle state when user clicks filter button --->
  const handleFilterToggle = ( state ) => {
    if( state ){
        toggleScrolling( 'stop' );
        setFilterToggle( true );
    }
    else{
        toggleScrolling( 'start' );
        setFilterToggle( false );
    }
}



  

 

return (

    <PageLayout>

      <AnimatePresence>
        {
          modalToggle && (

            <motion.div
              key="calendarModal"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalAnimation}
              transition={{ duration : 0.3 }}
            >
              <Modal toggle={ (value) => { setModalToggle( value ); toggleScrolling( 'start' ) } }>

                <EventList data={ selectedEvents } />

              </Modal>
            </motion.div>

        )}
      </AnimatePresence>


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
                selected={ filteredNames }
                toggle={ ( value ) => handleFilterToggle( value ) }
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
            plugins={ [ dayGridPlugin, timeGridPlugin, interactionPlugin ] }
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
  );
}