import * as React                  from "react"
import * as styles                 from './index.module.css';
import JSONData                    from "../data/combined.json"
import { PageLayout }              from "../components/page-layout/page-layout";
import { Hero }                    from "../components/hero/Hero";
import { OrganizationCard }        from "../components/organization-card/OrganizationCard";
import { Modal }                   from "../components/modal/modal";
import { EventList }               from "../components/event-list/EventList";
import { AnimatePresence, motion } from "framer-motion";
import { modalAnimation }          from "../utils/shared-animations";







export default function Home( { data } ) {

    //  Root data for all organizations --->
  const [ organizations, setOrganizations ]   = React.useState( [] );



    //  For toggling the modal on and off --->
  const [ modalToggle, setModalToggle ]       = React.useState( false );



    //  Stores a selected organization's up coming
    //  events to display in the modal ---> 
  const [ selectedEvents, setSelectedEvents ] = React.useState( [] );

  
  


  
  
    //  Imports root organization data --->
  React.useEffect( () => {

    setOrganizations( JSONData.sort( ( a, b ) => a.name.localeCompare( b.name ) ) );

  }, [ organizations ] );

  





    //  Toggles scrolling and modal when user clicks on a "view events"
    //  button or "close" button in the modal --->
  const toggleScrolling = ( status ) => {

    status ? document.body.style.overflowY = 'hidden' :
             document.body.style.overflowY = 'scroll';

    setModalToggle(status);

  }








  return (

    <PageLayout>


      <AnimatePresence>
        { modalToggle && (

          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration : 0.3 }}
            variants={ modalAnimation }
          >

            <Modal toggle={ ( value ) => { toggleScrolling( value ) } }>
              <EventList data={ selectedEvents } />
            </Modal>

          </motion.div>
        )}


      </AnimatePresence>



      <section className={ styles.page }>

        <Hero />

        <section className={ styles.contentContainer }>

          <article className={ styles.contentList }>

            {
              organizations.map( ( item, index ) => {

                return(
                  <OrganizationCard
                    data={ item }
                    selection={ ( events ) => { setSelectedEvents( events ); toggleScrolling( true ) } }
                    key={ `organization_ ${ index }` }
                  />

                )
              })
            }
            
          </article>

        </section>

      </section>

    </PageLayout>
    
  );
}