import * as React from 'react';
import * as styles from './SearchBar.module.css';

export const SearchBar = ({userInput, searchText})=>{
    const [userText, setUserText] = React.useState('');

    const detectEnterKey = (event)=>{
        
        if(event.key === 'Enter'){
            handleSearch(userText);
        }
    }

    const handleKeyStrokes = (value)=>{

        setUserText(value);
        userInput(value);

    }

    const handleSearch = ()=>{
        searchText(userText);
    }

    return(
        <article className={styles.mainContainer}>
            <label for="searchBar" className={`srcryBox ${styles.searchLabel}`}>
                <input
                    id="searchBar"
                    type="search"
                    className={styles.searchBar}
                    placeholder="search for groups"
                    onKeyUp={(event)=> detectEnterKey(event)}
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