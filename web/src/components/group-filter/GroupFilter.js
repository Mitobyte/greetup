import * as React from 'react';
import * as styles from './GroupFilter.module.css';
import { NameButton } from './name-button/NameButton';

export const GroupFilter = ({nameList, resultList}) =>{

    const [filteredNames, setFilteredNames] = React.useState([]);
    const [selectedNames, setSelectedNames] = React.useState(['all']);

    React.useEffect(()=>{ setFilteredNames(nameList)}, [nameList]);
    
    const handleSelection = (name)=>{

        name === 'all' ? setSelectedNames(['all']) :
        selectedNames.indexOf('all') > -1 ? setSelectedNames([name]) :
        selectedNames.indexOf(name) > -1 && selectedNames.length === 1 ? setSelectedNames(['all']) :
        selectedNames.indexOf(name) > -1 ? setSelectedNames([...selectedNames.filter(a=> a !== name)]) :
        setSelectedNames([...selectedNames, name]);
    }

    return(
        <article className={styles.mainContainer}>
            <p>
                {
                    selectedNames.map((name)=> <span>{name}</span>)
                }
            </p>
            <p className={styles.nameContainer}>
                <NameButton
                    name={'all'}
                    active={selectedNames.indexOf('all') > -1 ? true : false}
                    selected={(a)=> handleSelection(a)}
                />
                {
                    filteredNames.map((name, index)=>
                        <NameButton
                            key={`company_name_btn_${index}`}
                            name={name}
                            active={selectedNames.indexOf(name) > -1 ? true : false}
                            selected={(a)=> handleSelection(a)}
                        />
                    )
                }
            </p>
        </article>
    );
}