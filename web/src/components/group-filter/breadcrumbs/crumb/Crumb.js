import * as React from 'react';
import * as styles from './Crumb.module.css';

export const Crumb = ({crumb, deleteCrumb}) => {
    return(
        <span className={styles.crumbContainer}>
            {crumb}
            <svg className={styles.closeButton} viewBox="0 0 20 20" width="50%" onClick={()=> deleteCrumb(crumb)}>
                <use href={'#close_button'} />
            </svg>
        </span>
    );
}