import styles from "./IPhone.module.scss";
import IPhone from "../../images/IPhone.png";
import {UiIcons, UiTime, UiInput, UiButton} from "../UI";
import {ReactComponent as ArrowLeft} from "../../images/icons/arrowleft.svg";
import {ReactComponent as UserIcon} from "../../images/icons/user.svg";
import {ReactComponent as LockIcon} from "../../images/icons/lock.svg";
import {ReactComponent as GoogleIcon} from "../../images/icons/google.svg";
import {ReactComponent as MailIcon} from "../../images/icons/mail.svg";
import {NavLink} from "react-router-dom";
import {useState, useEffect} from 'react';
import {authorization, registration} from "../../actions/user";
import {useDispatch} from "react-redux";
import {GoogleLogin} from "@react-oauth/google";
import clientId
    from "../../client_secret_152442300175-sq3vjlp8smqsqibm415d0i044k5gci1c.apps.googleusercontent.com.json";
import {EMAIL_REGEXP, LOGIN_REGEXP} from "../../regexps";
export const SignupForm = (props) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [auth, setAuth] = useState(false);
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [inputType, setInputType] = useState('password');

    useEffect(()=>{
        ((password!==confirm)&&(confirm.length>3))
            ?setErrors({...errors, passwordMismatch: 'Passwords mismatch'})
            :setErrors({...errors, passwordMismatch: ''});
    }, [password, confirm])
    useEffect(()=>{
        if(login.length<5)
            setErrors({...errors, incorrectLogin: 'Login must be longer than 4'})
            else if(!LOGIN_REGEXP.test(login)&&(login.length>3))
            setErrors({...errors, incorrectLogin: 'Incorrect login, do not use special symbols'})
                else setErrors({...errors, incorrectLogin: ''})
    }, [login])
    useEffect(()=>{
        (password.length<5&&password.length>1)
            ?setErrors({...errors, incorrectPassword: 'Password must be longer than 5'})
            :(password.length>20)
                ?setErrors({...errors, incorrectPassword: 'Password must be shorter than 20'})
                :setErrors({...errors, incorrectPassword:''});
    }, [password])
    //Email validation
    useEffect(()=>{
        (email.length>1)&&(!EMAIL_REGEXP.test(email))
            ?setErrors({...errors, incorrectEmail: 'Email is incorrect'})
            :setErrors({...errors, incorrectEmail: ''})
    }, [email])
    useEffect(()=>{
        if(auth) dispatch(authorization(login, password, props.setUsername))},
        [auth])
    return (
        <div className={styles.signup_form}>
            <div className={styles.signup_form__flex}>
                <div className={styles.time}>
                    <UiTime color='#1F5460'/>
                </div>
                <div className={styles.icons}>
                    <UiIcons connection={styles.connection} wifi={styles.wifi} battery={styles.battery}/>
                </div>
            </div>
            <NavLink to='/'>
                <div className={styles.signup_form__back}>
                    <ArrowLeft/>
                </div>
            </NavLink>
            <h1 className={styles.signup_form__top}>
                Create account
            </h1>
            <p className={styles.signup_form__bot}>
                Sign up to get started!
            </p>
            <div className={styles.signup_form__registration_failed}>
                {errors.registrationError}
            </div>
            <UiInput
                error={errors.incorrectLogin}
                className={styles.signup_form__login}
                type='text'
                placeholder='Login'
                icon={<UserIcon/>}
                value={login}
                setValue={setLogin}
                />
            <UiInput
                error={errors.incorrectEmail}
                className={styles.signup_form__email}
                type='text'
                placeholder='Email'
                icon={<MailIcon/>}
                value={email}
                setValue={setEmail}
            />
            <UiInput
                error={errors.incorrectPassword}
                className={styles.signup_form__password}
                type={inputType}
                setType={setInputType}
                format='password'
                placeholder='Password'
                icon={<LockIcon/>}
                value={password}
                setValue={setPassword}
                />
            <UiInput
                error={errors.passwordMismatch}
                className={styles.signup_form__confirm}
                type={inputType}
                setType={setInputType}
                format='password'
                placeholder='Confirm password'
                icon={<LockIcon/>}
                value={confirm}
                setValue={setConfirm}
            />
            <UiButton
                className={styles.signup_form__button}
                padding='16px 142px'
                name='Sign up'
                color='#FFCA42'
                onClick={()=> {
                    if(password===confirm){
                        if(!errors.incorrectLogin)
                        registration(login, email, password, setAuth, setErrors, errors).then();
                    }
                }}
            />
            <div className={styles.signup_form__google_button}>
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
                className={styles.signup_form__google}
                disable={!errors?1:0}
                icon={<GoogleIcon/>}
                padding='16px 82px'
                name='Sign up using Google'
                color='#F0F5F2'
            />
            <NavLink to='/login'>
                <p className={styles.signup_form__member}>
                    Already member? <span style={{borderBottom: '1px solid #FFCA42'}}>Log in</span>
                </p>
            </NavLink>
            <img
                alt="Downloading..."
                className={styles.iphone}
                src={IPhone}/>
        </div>
    );
};

