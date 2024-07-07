import * as React from 'react';
import * as styles from './OrganizationCard.module.css';

export const OrganizationCard = ({data}, key)=>{

    return(
        <article className={styles.mainContainer}>
            <img src={data.image} alt="Group Logo" className={styles.companyLogo} />
            <h3 className={`srcryTxt ${styles.companyName}`}>{data.name}</h3>
            {
                data.events.length < 1 &&
                <p className={`srcryTxt ${styles.noEventText}`}>
                    <i>no upcoming events at this time</i>
                </p>
            }
            {
                data.events.length > 0 &&
                <article className={styles.eventContainer}>
                    <p className={`srcryTxt ${styles.eventText}`}>
                        <span className={styles.eventCount}>{data.events.length}</span> upcoming event{data.events.length > 1 ? 's': ''}!!!
                    </p>

                    <button className={`srcryTxt ${styles.viewButton}`}>
                        view events
                    </button>
                </article>
            }
            <a className={`srcryTxt ${styles.visitButton}`} target="_blank" href={data.url}>
                learn more
            </a>
        </article>
    );
}