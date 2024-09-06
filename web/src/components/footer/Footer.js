import * as React  from 'react';
import * as styles from './Footer.module.css';

export const Footer = () => {

    const currentYear = new Date().getFullYear();




    return(

        <footer>

            <p className={`srcryTxt ${styles.copyright}`}>
                mketechmeetups.com &#169; 2022&#45;{ currentYear } All rights reserved.
            </p>

        </footer>
        
    );
}