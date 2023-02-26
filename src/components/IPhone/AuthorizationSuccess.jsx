import React from 'react';
import styles from "./IPhone.module.scss";
import {UiButton, UiIcons, UiTime} from "../UI";
import IPhone from "../../images/IPhone.png";
import {useDispatch} from "react-redux";
import {logOut} from "../../reducers/userReducer";
export const AuthorizationSuccess = ({username}) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.authorization_success}>
            <div className={styles.authorization_success__flex}>
                <div className={styles.time}>
                    <UiTime color='#1F5460'/>
                </div>
                <div className={styles.icons}>
                    <UiIcons connection={styles.connection} wifi={styles.wifi} battery={styles.battery}/>
                </div>
            </div>
            <h1 className={styles.authorization_success__top}>
                Authorization success
            </h1>
            <p className={styles.authorization_success__bot}>
                You logged in
            </p>
            <img
                alt="Downloading..."
                className={styles.iphone}
                src={IPhone}/>
            <p className={styles.authorization_success__email}>
                Your E-mail is: {username}
            </p>
            <UiButton
            onClick={()=>dispatch(logOut())}
            className={styles.authorization_success__button}
            padding='16px 142px'
            name='Log out'
            color='#FFCA42'/>
        </div>
    );
};

