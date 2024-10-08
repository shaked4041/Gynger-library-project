import React from 'react';
import { PropagateLoader } from 'react-spinners';
import styles from './style.module.scss'


const LoadingSpinner: React.FC = () => {
    return (
        <div className={styles.spinnerContainer}>
            <PropagateLoader color="#ffffff" />
        </div>
    );
};

export default LoadingSpinner;
