import * as React from 'react';
import * as styles from './Crumb.module.css';

export const Crumb = ({crumb, deleteCrumb}) => {
    return(
        <span>{crumb}</span>
    );
}