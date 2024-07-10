import * as React from "react"
import * as styles from './index.module.css';
import Grid from '@mui/material/Grid';
import OrganizationsPanel from "../components/OrganizationPanel"
import JSONData from "../data/combined.json"
import {Header} from "../components/Header";
import {graphql} from "gatsby";
import { PageLayout } from "../components/page-layout/page-layout";
import { Hero } from "../components/hero/Hero";
import { OrganizationCard } from "../components/organization-card/OrganizationCard";
import { Modal } from "../components/modal/modal";
import { EventList } from "../components/event-list/EventList";

export default function Home({data}) {
  const organizations = JSONData.sort((a, b) => a.name.localeCompare(b.name));
  const [modalToggle, setModalToggle] = React.useState(false);
  const [selectedEvents, setSelectedEvents] = React.useState([]);
  const toggleScrolling = (status)=>{
    if(status === 'stop'){ document.body.style.overflow = 'hidden';}
    if(status === 'start'){ document.body.style.overflow = 'scroll';}
  }

  console.log(organizations);

  return (
    <PageLayout data={data}>
      {
        modalToggle === true &&
        <Modal toggle={(value) => {setModalToggle(value); toggleScrolling('start')}}>
          <EventList data={selectedEvents} />
        </Modal>
      }
      <section className={styles.page}>
        <Hero />
        <section className={styles.contentContainer}>
          <article className={styles.contentList}>
            {
              organizations.map((item, index) =>{
                return(
                  <OrganizationCard
                    data={item}
                    selection={(events) => {setSelectedEvents(events); setModalToggle(true); toggleScrolling('stop')}}
                    key={index}
                  />

                )
              })
            }
          </article>
        </section>
      </section>
    </PageLayout>
    /*<Header data={data}>
      <Grid container spacing={2}>
        {
          organizations.map((organization, index) => {
            return <Grid item xs={12} md={6}>
              <OrganizationsPanel key={`org-${index}`} organization={organization} />
            </Grid>
          })
        }
      </Grid>
    </Header>*/
  );
}

export const query = graphql`{
  file(relativePath: {eq: "logo.png"}) {
    childImageSharp {
      gatsbyImageData(width: 532, height: 214, placeholder: BLURRED, layout: FIXED)
    }
  }
}`
