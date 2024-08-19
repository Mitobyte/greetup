import * as React from 'react';
import * as styles from './NameContainer.module.css';
import { NameButton } from './name-button/NameButton';

export const NameContainer = ({names, selectedGroups, filteredGroups, updateList}) =>{
    return(
        <article className={styles.mainContainer}>

        <p className={styles.nameContainer}>
                <NameButton
                    name={'all'}
                    active={selectedGroups.indexOf('all') > -1 ? true : false}
                    selected={(a)=> updateList(a)}
                />
                { filteredGroups.filter(a => a !== 'all').length > 0 ?
                    names.map((name, index)=>
                        <NameButton
                            key={`company_name_btn_${index}`}
                            name={name}
                            active={selectedGroups.indexOf(name) > -1 ? true : false}
                            selected={(a)=> updateList(a)}
                        />
                    )
                    :
                    <span className={styles.noResultText}>(no results)</span>
                    
                }
            </p>
        </article>
    );
}