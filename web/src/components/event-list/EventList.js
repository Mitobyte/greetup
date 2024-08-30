import * as React from 'react';
import * as styles from './EventList.module.css';
import {Location} from './location/Location';
import { DateComponent } from './date/DateComponent';



export const EventList = ( { data, key } ) => {

    return(
        
        <ul className={ styles.mainContainer }>
            {
                data.map( ( item, index ) => {

                    return(
                        <li className={ styles.listItem } key={ `event_${ index }` }>

                            <h3 className={ `srcryTxt ${ styles.eventName }` }>{ item.name }</h3>

                            <Location data={ item.location } />

                            <DateComponent start={ item.startDate } end={ item.endDate } />

                            <a
                                className={ `srcryTxt ${ styles.joinButton }`}
                                href={ item.url }
                                target="_blank"
                            >
                                Join Event
                            </a>

                        </li>
                    );
                })
            }
        </ul>
    );
}