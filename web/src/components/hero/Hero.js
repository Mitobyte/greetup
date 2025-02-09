import * as React from 'react';
import * as styles from './Hero.module.css';

export const Hero = () => {
  return (
    <header className={styles.mainContainer}>
      <div className={styles.photoContainer}>
        <picture className={styles.backgroundPhoto}>
          <source
            srcSet="images/skyline-400w-800h.webp"
            media="(min-width: 1px) and (orientation: portrait)"
            alt=""
            width="100%"
            height="100%"
          />
          <source
            srcSet="images/skyline-500w-1000h.webp"
            media="(min-width: 400px) and (orientation: portrait)"
            alt=""
            width="100%"
            height="100%"
          />
          <source
            srcSet="images/skyline-800w-16000h.webp"
            media="(min-width: 700px) and (orientation: portrait)"
            alt=""
            width="100%"
            height="100%"
          />
          <source
            srcSet="images/skyline-1000w-500h.webp"
            media="(min-width: 900px) and (orientation: landscape)"
            alt=""
            width="100%"
            height="100%"
          />
          <source
            srcSet="images/skyline-1200w-2400h.webp"
            media="(min-width: 1000px) and (orientation: portrait)"
            alt=""
            width="100%"
            height="100%"
          />
          <source
            srcSet="images/skyline-1600w-800h.webp"
            media="(min-width: 1200px) and (orientation: landscape)"
            alt=""
            width="100%"
            height="100%"
          />
          <source
            srcSet="images/skyline-2400w-1200h.webp"
            media="(min-width: 1800px) and (orientation: landscape)"
            alt=""
            width="100%"
            height="100%"
          />

          <img src="images/skyline.jpg" width="100%" height="100%" alt="" />
        </picture>
      </div>

      <div className={styles.backgroundFilter}></div>
      <div className={styles.backgroundGradient}></div>

      <article className={styles.contentContainer}>
        <svg className={styles.logo}>
          <use
            href="#full_logo"
            style={{
              '--color01': 'hsl( var( --yellow-200 ), 1 )',
              '--color02': 'hsl( var( --blue-900 ), 1 )',
            }}
            width="100%"
            height="100%"
          />
        </svg>

        <p className={`srcryTxt ${styles.introText}`}>
          Milwaukee is home to a vibrant and thriving tech community. This
          website is dedicated to showcasing upcoming events so you can stay
          informed and get involved.
        </p>
      </article>
    </header>
  );
};
