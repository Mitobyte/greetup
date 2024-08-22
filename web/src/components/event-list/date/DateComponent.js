import * as React from 'react';
import * as styles from './DateComponent.module.css';
import * as DateHelpers from '../../../utils/date-helpers';

export const DateComponent = ({start, end})=>{

    const startDate = new Date(start);
    const endDate   = new Date(end);
    const weekDay   = DateHelpers.getWeekDay(startDate.getDay());
    const month     = DateHelpers.getMonth(startDate.getMonth());
    const day       = DateHelpers.getDay(startDate.getDay());
    const startTime = DateHelpers.getTime(startDate.getHours(), startDate.getMinutes());
    const endTime   = DateHelpers.getTime(endDate.getHours(), endDate.getMinutes());
    
    return(
        <section className={styles.mainContainer}>
            <h6 className={`srcryTxt ${styles.title}`}>Date</h6>
            <p className={`srcryTxt ${styles.dateText}`}>
                {weekDay} {month} {day}, {startDate.getFullYear()}<br />
                <b>{startTime} - {endTime}</b>
            </p>
        </section>
    );
}