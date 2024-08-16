import * as React from 'react';
import * as styles from './BreadCrumbs.module.css';
import { Crumb } from './crumb/Crumb';

export const BreadCrumbs = ({crumbs, removeGroup}) => {
    return(
        <p className={styles.mainContainer}>
            {
                crumbs.map((item, index)=>
                    <Crumb
                        crumb={item}
                        key={`breadCrumb_${index}`}
                        deleteCrumb={(crumb)=> removeGroup(crumb)}
                    />
                )
            }
        </p>
    );
}