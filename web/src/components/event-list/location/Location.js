import * as React from 'react';
import * as styles from './Location.module.css';

export const Location = ({data})=>{
    return(
        <section className={styles.mainContainer}>
            <h6 className={`srcryTxt ${styles.title}`}>Location</h6>
            {data['@type'] === 'VirtualLocation' &&
                <p className={`srcryTxt ${styles.locationText}`}>Online</p>
            }
            {
                data['@type'] === 'Place' &&
                <p className={`srcryTxt ${styles.locationText}`}>
                    <b>{data.name}</b> {data.address.streetAddress}
                </p>
            }
        </section>
    )
}