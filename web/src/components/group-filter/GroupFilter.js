import * as React from 'react';
import * as styles from './GroupFilter.module.css';
import {AnimatePresence, motion} from 'framer-motion';
import { BreadCrumbs } from './breadcrumbs/BreadCrumbs';
import { NameContainer } from './name-container/NameContainer';
import { SearchBar } from './search-bar/SearchBar';

export const GroupFilter = ({nameList, resultList}) =>{

    const [filteredNames, setFilteredNames] = React.useState([]);
    const [selectedNames, setSelectedNames] = React.useState(['all']);
    const [filterToggle, setFilterToggle] = React.useState(false);

    React.useEffect(()=>{ setFilteredNames(nameList)}, [nameList]);
    
    const handleSelection = (name)=>{

        name === 'all' ? setSelectedNames(['all']) :
        selectedNames.indexOf('all') > -1 ? setSelectedNames([name]) :
        selectedNames.indexOf(name)  > -1 && selectedNames.length === 1 ? setSelectedNames(['all']) :
        selectedNames.indexOf(name)  > -1 ? setSelectedNames([...selectedNames.filter(a=> a !== name)]) :
        setSelectedNames([...selectedNames, name]);
    }

    const removeFromSelection = (name)=>{
        if(name !== 'all'){
            if(selectedNames.length === 1){setSelectedNames(['all']);}
            else{
                setSelectedNames([...selectedNames.filter(a=> a !== name)]);
            }
        }
    }

    const handleUserInput = (input)=>{
        
        const groups = nameList.filter(a=> a.toLowerCase().startsWith(input.toLowerCase()));

        setFilteredNames(groups);
        resultList(groups);
    }

    const handleSearch = (input) =>{
        setFilteredNames(nameList.filter(a=> a === input));
    }

    const handleFilterToggle= (state) =>{
        if(state){
            document.body.style.overflow = 'hidden';
            setFilterToggle(true);
        }
        else{
            document.body.style.overflow = 'scroll';
            setFilterToggle(false);
        }
    }

    return(
        <article className={styles.mainContainer}>
            <button
                type="button"
                className={`srcryTxt ${styles.filterButton}`}
                onClick={()=> handleFilterToggle(!filterToggle)}
            >
                filter events
            </button>

            <AnimatePresence>
                {
                    filterToggle &&(
                        <motion.article
                            className={styles.searchContainer}
                            initial={{transform: 'translateY(-100vh)'}}
                            animate={{transform: 'translateY(0)'}}
                            exit={{transform: 'translateY(-100vh)'}}
                        >
                            <svg
                                className={styles.closeButton}
                                viewBox="0 0 20 20"
                                onClick={()=>handleFilterToggle(false)}
                            >
                                <use href="#close_button" />
                            </svg>

                            <article className={styles.breadcrumbs}>
                                <BreadCrumbs
                                    crumbs={selectedNames}
                                    removeGroup={(value)=> removeFromSelection(value)}
                                />
                            </article>

                            <article className={styles.searchBar}>
                                <SearchBar
                                    userInput={handleUserInput}
                                    searchText={handleSearch}
                                />
                            </article>

                            <article className={styles.nameContainer}>
                                <NameContainer
                                    names={filteredNames}
                                    selectedGroups={selectedNames}
                                    filteredGroups={filteredNames}
                                    updateList={(name)=> handleSelection(name)}
                                />
                            </article>

                        </motion.article>
                )}

            </AnimatePresence>
            
        </article>
    );
}