import * as React from 'react';
import * as styles from './EventList.module.css';
import {Location} from './location/Location';
import { DateComponent } from './date/DateComponent';

export const EventList = ({data, key}) =>{
    return(
        <ul className={styles.mainContainer}>
            {
                data.map((item, index)=>{
                    return(
                        <li className={styles.listItem}>
                            <h3 className={`srcryTxt ${styles.eventName}`}>{item.name}</h3>
                            <Location data={item.location} />
                            <DateComponent start={item.startDate} end={item.endDate} />
                            {/*
                                item.description &&
                                <article className={styles.descriptionContainer}>
                                    <h6 className={`srcryTxt ${styles.descriptionTitle}`}>Description</h6>
                                    <p className={`srcryTxt ${styles.descriptionText}`}>
                                        {item.description}
                                    </p>
                                </article>
                            */}
                            <a className={`srcryTxt ${styles.joinButton}`} href={item.url} target="_blank">
                                Join Event
                            </a>
                        </li>
                    );
                })
            }
        </ul>
    );
}