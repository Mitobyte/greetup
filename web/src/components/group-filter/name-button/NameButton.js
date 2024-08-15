import * as React from 'react';
import * as styles from './NameButton.module.css';

export const NameButton = ({name, selected, active})=>{
    return(
        <span className={`srcryBox ${styles.nameButton}`}>
            {name}
            <div className={styles.indicator}></div>
        </span>
    );
}