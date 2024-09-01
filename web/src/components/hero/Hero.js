import * as React  from 'react';
import * as styles from './Hero.module.css';

export const Hero = () => {

    return(

        <header className={ styles.mainContainer }>


            <div className={ styles.backgroundPhoto }></div>
            <div className={ styles.backgroundFilter }></div>
            <div className={ styles.backgroundGradient }></div>

            <article className={ styles.contentContainer }>

                <svg className={ styles.logo }>
                    <use
                        href="#full_logo"
                        style={{
                            '--color01' : 'hsl( var( --yellow-200 ), 1 )',
                            '--color02' : 'hsl( var( --blue-900 ), 1 )'
                        }}
                        width="100%"
                        height="100%"
                    />
                </svg>

                <p className={ `srcryTxt ${ styles.introText }` }>
                    Milwaukee is home to a vibrant and thriving tech community. This website is dedicated to showcasing upcoming events so you can stay informed and get involved. 
                </p>

            </article>


        </header>

    );
}