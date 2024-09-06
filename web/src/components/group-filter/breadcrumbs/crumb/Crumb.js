import * as React  from 'react';
import * as styles from './Crumb.module.css';







export const Crumb = ( { crumb, deleteCrumb } ) => {
    //  crumb       : the name to be displayed.
    //  deleteCrumb : passes name up to parent to remove from list of selected organizations.

    
    
    return(

        <span className={ `srcryBox ${ styles.crumbContainer }` }>

            { crumb }

            <svg
                className={ styles.closeButton }
                viewBox="0 0 20 20"
                width="50%"
                onClick={ () => deleteCrumb( crumb ) }
            >

                <use href={ '#close_button' } />

            </svg>

        </span>

    );
}