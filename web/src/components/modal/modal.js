import * as React from 'react';
import * as styles from './modal.module.css';

export const Modal = ({ children, toggle }) => {
  //  children : component to display inside markup.
  //  toggle   : passes boolean value up to parent to close modal.

  return (
    <section className={styles.mainContainer}>
      <article className={`srcryBox ${styles.contentContainer}`}>
        <svg
          className={`srcryBox ${styles.closeButton}`}
          viewBox="0 0 20 20"
          onClick={() => toggle(false)}
        >
          <use href="#close_button" />
        </svg>

        <article className={styles.projectionContainer}>{children}</article>
      </article>
    </section>
  );
};
