import React from 'react';
import Moment from 'react-moment';
import styles from './UiTime.module.scss';

export const UiTime = (props) => {
    return (
        <Moment
            className={styles.time}
            style={{color: props.color}}
            format="HH:mm"
            interval={1000}/>
    );
};

