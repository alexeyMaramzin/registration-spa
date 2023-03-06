import React from 'react';
import styles from "./IPhone.module.scss";
import {UiTime, UiIcons} from "..";
import {UiButton} from "..";
import IPhone from "../../images/IPhone.png";
import Logo from "../../images/Logo.jpg";
import {NavLink} from 'react-router-dom';
import {GoogleLogin} from "@react-oauth/google";
import {ReactComponent as GoogleIcon} from "../../images/icons/google.svg";
import clientId
    from "../../client_secret_152442300175-sq3vjlp8smqsqibm415d0i044k5gci1c.apps.googleusercontent.com.json";
import {authorization} from "../../actions/user";
import {useDispatch} from "react-redux";
export const StartForm = (props) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.start_form}>
            <div className={styles.start_form__flex}>
                <div className={styles.time}>
                    <UiTime color='white'/>
                </div>
                <div className={styles.icons}>
                    <UiIcons/>
                </div>
            </div>
            <h1 className={styles.start_form__head}>
                Let's
                <br/>
                get started
            </h1>
            <p className={styles.start_form__bot}>
                Everything's start from here
            </p>
            <img
                alt="Downloading..."
                className={styles.iphone}
                src={IPhone}/>
            <img
                alt="Downloading..."
                className={styles.logo}
                src={Logo}/>
            <NavLink to='login'>
                <UiButton
                    onClick={()=>console.log("log")}
                    className={styles.iphone_login}
                    padding='16px 146px'
                    name='Log in'
                    color='#FFCA42'/>
            </NavLink>
            <div className={styles.start_form__google_button}>
                <GoogleLogin clientId={clientId.web.client_id}
                             width='350px'
                             onSuccess={credentialResponse => {
                                 console.log(credentialResponse);
                                 dispatch(authorization('google', 'google', props.setUsername))
                             }}
                             onError={() => {
                                 console.log('Login Failed');
                             }}
                             cookiePolicy={'single_host_origin'}
                />
            </div>
            <UiButton
                className={styles.start_form__google}
                icon={<GoogleIcon/>}
                padding='16px 85px'
                name='Log in using Google'
                color='#F0F5F2'
            />
            <NavLink to='/signup'>
                <UiButton
                    onClick={()=>console.log("sign")}
                    className={styles.iphone_signup}
                    padding='16px 140px'
                    name='Sign up'
                    color='#D5E7D4'/>
            </NavLink>
        </div>
    );
};

