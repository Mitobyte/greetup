import * as React from 'react';
import * as styles from './NameContainer.module.css';
import { NameButton } from './name-button/NameButton';

export const NameContainer = ({names, selected, updateList}) =>{
    return(
        <p className={styles.nameContainer}>
                <NameButton
                    name={'all'}
                    active={selected.indexOf('all') > -1 ? true : false}
                    selected={(a)=> updateList(a)}
                />
                {
                    names.map((name, index)=>
                        <NameButton
                            key={`company_name_btn_${index}`}
                            name={name}
                            active={selected.indexOf(name) > -1 ? true : false}
                            selected={(a)=> updateList(a)}
                        />
                    )
                }
            </p>
    );
}