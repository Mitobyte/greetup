import * as React from 'react';
import * as styles from './page-layout.module.css';
import { SvgSymbols } from '../svg_symbols/SvgSymbols';
import { NavBar } from '../navbar/NavBar';

export const PageLayout = ({data, children})=>{
    return(
        <section className={styles.pageContainer}>
            <SvgSymbols />
            <article className={styles.navBar}>
                <NavBar />
            </article>
            <main>
                {children}
            </main>
            {/*<svg style={{width: 'var(--small-1-3)'}}>
                <use href="#full_logo" style={{'--color01': 'hsl(var(--yellow-200), 1)', '--color02': 'hsl(var(--blue-900), 1)'}} width="100%" />
            </svg>
            <p className="paragraph" style={{fontSize: 'var(--text-title-3)'}}>
                lorem ipsum blahblahblahblah
            </p>*/}
        </section>
    );
}