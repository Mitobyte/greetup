import * as React from 'react';
import * as styles from './GroupFilter.module.css';
import { NameButton } from './name-button/NameButton';

export const GroupFilter = ({nameList, resultList}) =>{

    return(
        <article>
            <p>
                {
                    nameList.map((name, index)=>
                        <NameButton
                            id={`company_name_btn_${index}`}
                            name={name}
                        />
                    )
                }
            </p>
        </article>
    );
}