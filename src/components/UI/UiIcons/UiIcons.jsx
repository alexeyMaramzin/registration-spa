import React from 'react';
import {ReactComponent as Battery} from "../../../images/icons/battery.svg";
import {ReactComponent as Connection} from "../../../images/icons/connection.svg";
import {ReactComponent as Wifi} from "../../../images/icons/wifi.svg";
import styles from './UiIcons.module.scss';
import cn from 'classnames';

export const UiIcons = (props) => {
    return (
        <div className={styles.icons}>
            <Battery className={cn(props.battery)}/>
            <Connection className={cn(props.connection)}/>
            <Wifi className={cn(styles.wifi, props.wifi)}/>
        </div>
    );
};

