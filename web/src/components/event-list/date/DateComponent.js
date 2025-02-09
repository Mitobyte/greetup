import * as React from 'react';
import * as styles from './DateComponent.module.css';
import * as DateHelpers from '../../../utils/date-helpers';

export const DateComponent = ({ start, end }) => {
  //  start : the day an event begins.
  //  end   : the day an event ends.

  //  Date the event starts --->
  const startDate = new Date(start);

  //  Date the event ends --->
  const endDate = new Date(end);

  //  Name of the day of the week --->
  const weekDay = DateHelpers.getWeekDay(startDate.getDay());

  //  Name of the month --->
  const month = DateHelpers.getMonth(startDate.getMonth());

  //  Number date --->
  const day = DateHelpers.getDay(startDate.getDay());

  //  Time the event starts --->
  const startTime = DateHelpers.getTime(
    startDate.getHours(),
    startDate.getMinutes()
  );

  //  Time the event ends --->
  const endTime = DateHelpers.getTime(endDate.getHours(), endDate.getMinutes());

  return (
    <section className={styles.mainContainer}>
      <h6 className={`srcryTxt ${styles.title}`}>Date</h6>

      <p className={`srcryTxt ${styles.dateText}`}>
        {weekDay} {month} {day}, {startDate.getFullYear()}
        <br />
        <b>
          {startTime} - {endTime}
        </b>
      </p>
    </section>
  );
};
