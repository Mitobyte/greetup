import * as React from 'react';
import './page-layout.css';
import { SvgSymbols } from '../svg_symbols/SvgSymbols';
import { NavBar } from '../navbar/NavBar';
import { Footer } from '../footer/Footer';

export const PageLayout = ({data, children})=>{
    return(
        <section>
            <SvgSymbols />

            <article className="navBarContainer">
                <NavBar />
            </article>

            <main className="main">
                {children}
            </main>

            <Footer />
        </section>
    );
}