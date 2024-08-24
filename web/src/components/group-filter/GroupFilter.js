import * as React from 'react';
import * as styles from './GroupFilter.module.css';
import {AnimatePresence, motion} from 'framer-motion';
import { BreadCrumbs } from './breadcrumbs/BreadCrumbs';
import { NameContainer } from './name-container/NameContainer';
import { SearchBar } from './search-bar/SearchBar';

export const GroupFilter = ({nameList, toggle, resultList}) =>{
    // nameList   : list of all organization names for matching search results
    // resultList : passes list of selected names to parent for filtering organization data for calendar

    const [filteredNames, setFilteredNames] = React.useState([]);
    const [selectedNames, setSelectedNames] = React.useState(['all']);

    React.useEffect(() => setFilteredNames(nameList), [nameList]);

    React.useEffect(() => resultList(selectedNames),  [selectedNames]);
    
    const handleSelection = (name) => {

        name === 'all' ? setSelectedNames(['all']) :
        selectedNames.indexOf('all') > -1 ? setSelectedNames([name]) :
        selectedNames.indexOf(name)  > -1 && selectedNames.length === 1 ? setSelectedNames(['all']) :
        selectedNames.indexOf(name)  > -1 ? setSelectedNames([...selectedNames.filter(a=> a !== name)]) :
        setSelectedNames([...selectedNames, name]);
    }

    const removeFromSelection = (name) => {
        if(name !== 'all'){
            if(selectedNames.length === 1) { setSelectedNames(['all']); }
            else{ setSelectedNames([...selectedNames.filter(a=> a !== name)]); }
        }
    }

    const handleUserInput = (input) => {
        
        const groups = nameList.filter(a=> a.toLowerCase().startsWith(input.toLowerCase()));

        setFilteredNames(groups);
    }

    const handleSearch = (input) => {
        setFilteredNames(nameList.filter(a=> a === input));
    }

    

    
    
    return(

        <article className={ styles.mainContainer }>

            <svg
                className={ styles.closeButton }
                viewBox="0 0 20 20"
                onClick={ () => toggle( false ) }
            >

                <use href="#close_button" />

            </svg>



            <article className={ styles.breadcrumbs }>

                <BreadCrumbs
                    crumbs={ selectedNames }
                    removeGroup={ (value) => removeFromSelection( value ) }
                />

            </article>



            <article className={ styles.searchBar }>

                <SearchBar
                    userInput={ handleUserInput }
                    searchText={ handleSearch }
                />

            </article>



            <article className={ styles.nameContainer }>

                <NameContainer
                    names={ filteredNames }
                    selectedGroups={ selectedNames }
                    filteredGroups={ filteredNames }
                    updateList={ (name) => handleSelection( name ) }
                />

            </article>
            
        </article>

    );
}