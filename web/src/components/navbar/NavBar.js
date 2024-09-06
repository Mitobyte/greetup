import * as React  from 'react';
import * as styles from './NavBar.module.css';
import {Link}      from 'gatsby';







export const NavBar = () => {

    

    return(


        <nav className={ `srcryBox ${styles.navComponent} ${ styles.navBar }` }>

            <svg className={ styles.icon } viewBox="0 0 195.899414 181.036621" >

                <use href="#m_icon" />

            </svg>



            <ul className={ styles.linkList }>

                <li className={ styles.linkContainer }>

                    <Link className={ styles.link } to="/" activeClassName={ styles.active }>
                        Home
                    </Link>

                </li>


                <li className={ styles.linkContainer }>

                    <Link className={ styles.link } to="/calendar" activeClassName={ styles.active }>
                        Calendar
                    </Link>

                </li>

            </ul>

        </nav>


    )
}