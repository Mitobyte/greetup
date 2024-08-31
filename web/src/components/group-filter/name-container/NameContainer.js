import * as React     from 'react';
import * as styles    from './NameContainer.module.css';
import { NameButton } from './name-button/NameButton';







export const NameContainer = ( { names, selectedGroups, filteredGroups, updateList } ) => {
    // names          : list of group names to iterate into buttons
    // selectedGroups : list of groups currently selected by the user
    // filteredGroups : list of groups filtered by search bar to narrow down matches
    // updateList     : passes selected group name to parent component

    return(

        <article className={ styles.mainContainer }>



            <p className={ styles.nameContainer }>

                <NameButton
                    name={ 'all' }
                    active={ selectedGroups.indexOf( 'all' ) > -1 ? true : false }
                    selected={ ( a ) => updateList( a ) }
                />

                {
                    filteredGroups.filter(a => a !== 'all').length > 0 ?

                    names.map( ( name, index ) =>

                        <NameButton
                            key={ `company_name_btn_${ index }` }
                            name={ name }
                            active={ selectedGroups.indexOf( name ) > -1 ? true : false }
                            selected={ ( a ) => updateList( a ) }
                        />

                    )

                    :

                    <span className={ styles.noResultText }>
                        &#40;no results&#41;
                    </span>
                        
                }

            </p>



        </article>
    );
}