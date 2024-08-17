import * as React from 'react';
import * as styles from './SearchBar.module.css';

export const SearchBar = ({userInput, searchText})=>{
    const [searchForText, setSearchForText] = React.useState('');

    const handleKeyStrokes = (value)=>{
        setSearchForText(value);
        userInput(value);
    }

    const handleSearch = ()=>{
        searchText(searchForText);
    }

    return(
        <article className={styles.mainContainer}>
            <label for="searchBar" className={`srcryBox ${styles.searchLabel}`}>
                <input
                    id="searchBar"
                    type="search"
                    className={styles.searchBar}
                    placeholder="search for groups"
                    onChange={(event)=> handleKeyStrokes(event.target.value)}
                />
                <button
                    type="button"
                    className={styles.searchButton}
                    onClick={handleSearch}
                >
                    search
                </button>
            </label>
        </article>
    );
}