import * as React from 'react';
import * as styles from './SearchBar.module.css';

export const SearchBar = ({searchText})=>{
    return(
        <article className={styles.mainContainer}>
            <label for="searchBar" className={`srcryBox ${styles.searchLabel}`}>
                <input
                    id="searchBar"
                    type="search"
                    className={styles.searchBar}
                    placeholder="search for groups"
                />
                <button type="button" className={styles.searchButton}>search</button>
            </label>
        </article>
    );
}