import * as React     from 'react';
import * as styles    from './404.module.css';
import { PageLayout } from '../components/page-layout/page-layout';







export default function custom404Page() {



    return(
        <PageLayout>
            <section className={styles.mainContainer}>


                <article className={styles.messageContainer}>

                    <h1 className={styles.title}>Oops&#33;&#33;&#33;</h1>
                    
                    <p className={styles.errorText}>error &#58; 404</p>

                    <p className={styles.text}>
                        It appears the page you&#39;re looking for doesn&#39;t exist&#46;
                    </p>

                </article>


            </section>
        </PageLayout>
    );
}