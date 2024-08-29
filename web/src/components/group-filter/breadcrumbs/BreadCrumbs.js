import * as React from 'react';
import * as styles from './BreadCrumbs.module.css';
import { Crumb } from './crumb/Crumb';
import { AnimatePresence, LayoutGroup, motion, useIsPresent } from 'framer-motion';

export const BreadCrumbs = ({crumbs, removeGroup}) => {

    const isPresent = useIsPresent();
    return(
        <article style={{width: '100%'}}>
            <AnimatePresence mode="popLayout">
                <LayoutGroup>
                {
                    crumbs.map((item, index)=>
                        <motion.div
                            className={styles.crumbAnimationContainer}
                            key={`crumb_${index}`}
                            layout="preserve-aspect"
                            initial={{ transform: 'translateX(120vw)' }}
                            animate={{ transform: 'translateX(0)' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {<Crumb
                                crumb={item}
                                deleteCrumb={(crumb)=> removeGroup(crumb)}
                            />}
                        </motion.div>
                    )
                }
                </LayoutGroup>
            </AnimatePresence>
        </article>
    )
        {/*<p className={styles.mainContainer}>
            <AnimatePresence>
                {
                    crumbs.map((item, index)=>{
                        <Crumb
                            key={`breadCrumb_${index}`}
                            crumb={item}
                            deleteCrumb={(crumb)=> removeGroup(crumb)}
                        />
                    })
                    
                }
            </AnimatePresence>
                {/*crumbs.map((item, index)=>
                    <Crumb
                        crumb={item}
                        key={`breadCrumb_${index}`}
                        deleteCrumb={(crumb)=> removeGroup(crumb)}
                    />
                )*}
            
        </p>*/}
    //);
}