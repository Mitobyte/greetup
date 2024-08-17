import * as React from 'react';
import * as styles from './GroupFilter.module.css';
import { NameButton } from './name-container/name-button/NameButton';
import { BreadCrumbs } from './breadcrumbs/BreadCrumbs';
import { NameContainer } from './name-container/NameContainer';
import { SearchBar } from './search-bar/SearchBar';

export const GroupFilter = ({nameList, resultList}) =>{

    const [filteredNames, setFilteredNames] = React.useState([]);
    const [selectedNames, setSelectedNames] = React.useState(['all']);

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

    return(
        <article className={styles.mainContainer}>
            <SearchBar
                userInput={handleUserInput}
                searchText={handleSearch}
            />

            <BreadCrumbs
                crumbs={selectedNames}
                removeGroup={(value)=> removeFromSelection(value)}
            />
            <NameContainer
                names={filteredNames}
                selected={selectedNames}
                updateList={(name)=> handleSelection(name)}
            />
            
        </article>
    );
}