import React, {useState, useEffect} from 'react';
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
import {GoogleLogin} from "@react-oauth/google";
import clientId from '../../client_secret_152442300175-sq3vjlp8smqsqibm415d0i044k5gci1c.apps.googleusercontent.com.json';
export const LoginForm = (props) => {
    const [inputType, setInputType] = useState('password');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    useEffect(()=>{
        if(errors.incorrectLogin)
            if(login.length>4)
                errors.incorrectLogin=''
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login])
    useEffect(()=>{
        login.length<3&&login.length>1
            ?setErrors({...errors, incorrectLogin: 'Login must be longer than 3 '})
            :setErrors({...errors, incorrectLogin: ''})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login])
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
            {errors&&
                <div className={styles.login_form__login_failed}>
                    {errors.incorrectLogin}
                    {!errors.incorrectLogin&&errors.wrongLogin}
                </div>
            }
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
                type={inputType}
                setType={setInputType}
                format='password'
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
                    if(!errors.incorrectLogin)
                    dispatch(authorization(login, password, props.setUsername, setErrors, errors))
                }}
            />
            <div className={styles.login_form__google_button}>
                <GoogleLogin clientId={clientId.web.client_id}
                             width='350px'
                             onSuccess={credentialResponse => {
                                 console.log(credentialResponse);
                                 dispatch(authorization('google', 'google', props.setUsername, setErrors, errors))
                             }}
                             onError={() => {
                                 console.log('Login Failed');
                             }}
                             cookiePolicy={'single_host_origin'}
                />
            </div>
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





