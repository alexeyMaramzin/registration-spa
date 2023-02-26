import React, {useState} from 'react';
import styles from './IPhone.module.scss';
import {UiButton, UiIcons, UiInput, UiTime} from "../UI";
import {NavLink} from "react-router-dom";
import IPhone from "../../images/IPhone.png";
import {ReactComponent as ArrowLeft} from "../../images/icons/arrowleft.svg";
import {ReactComponent as UserIcon} from "../../images/icons/user.svg";
import {ReactComponent as LockIcon} from "../../images/icons/lock.svg";
import {ReactComponent as GoogleIcon} from "../../images/icons/google.svg";
import {authorization} from "../../actions/user";
import {useDispatch} from "react-redux";
export const LoginForm = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    return (
        <div className={styles.login_form}>
            <div className={styles.login_form__flex}>
                <div className={styles.time}>
                    <UiTime color='#1F5460'/>
                </div>
                <div className={styles.icons}>
                    <UiIcons connection={styles.connection} wifi={styles.wifi} battery={styles.battery}/>
                </div>
            </div>
            <NavLink to='/'>
                <div className={styles.login_form__back}>
                    <ArrowLeft/>
                </div>
            </NavLink>
            <h1 className={styles.login_form__top}>
                Welcome back
            </h1>
            <p className={styles.login_form__bot}>
                Enter you credential to continue
            </p>
            <UiInput
                className={styles.login_form__login}
                type='text'
                placeholder='Enter your login'
                icon={<UserIcon/>}
                value={login}
                setValue={setLogin}
            />
            <UiInput
                className={styles.login_form__password}
                type='password'
                placeholder='Password'
                icon={<LockIcon/>}
                value={password}
                setValue={setPassword}
            />
            <UiButton
                className={styles.login_form__button}
                padding='16px 145px'
                name='Log in'
                color='#FFCA42'
                onClick={()=> {
                    dispatch(authorization(login, password, props.setUsername))
                }}
            />
            <UiButton
                className={styles.login_form__google}
                icon={<GoogleIcon/>}
                padding='16px 85px'
                name='Log in using Google'
                color='#F0F5F2'
            />
            <NavLink to='/signup'>
                <p className={styles.login_form__member}>
                    Don't have an account? <span style={{borderBottom: '1px solid #FFCA42'}}>Sign up</span>
                </p>
            </NavLink>
            <img
                alt="Downloading..."
                className={styles.iphone}
                src={IPhone}/>
        </div>
    );
}

