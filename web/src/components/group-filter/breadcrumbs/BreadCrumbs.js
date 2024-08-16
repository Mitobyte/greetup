import * as React from 'react';
import * as styles from './BreadCrumbs.module.css';

export const BreadCrumbs = ({crumbs, removeGroup}) => {
    return(
        <p>
            {
                crumbs.map((item, index)=> <span>{item}</span>)
            }
        </p>
    );
}