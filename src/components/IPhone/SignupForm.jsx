import styles from "./IPhone.module.scss";
import IPhone from "../../images/IPhone.png";
import {UiIcons, UiTime, UiInput, UiButton} from "../UI";
import {ReactComponent as ArrowLeft} from "../../images/icons/arrowleft.svg";
import {ReactComponent as UserIcon} from "../../images/icons/user.svg";
import {ReactComponent as LockIcon} from "../../images/icons/lock.svg";
import {ReactComponent as GoogleIcon} from "../../images/icons/google.svg";
import {NavLink} from "react-router-dom";
import {useState, useEffect} from 'react';
import {authorization, registration} from "../../actions/user";
import {useDispatch} from "react-redux";
export const SignupForm = (props) => {
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(false);
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [inputType, setInputType] = useState('password');
    useEffect(()=>{if(auth) dispatch(authorization(login, password, props.setUsername))}, [auth])
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
            <UiInput
                className={styles.signup_form__login}
                type='text'
                placeholder='Login'
                icon={<UserIcon/>}
                value={login}
                setValue={setLogin}
                />
            <UiInput
                className={styles.signup_form__email}
                type='text'
                placeholder='Email'
                icon={<UserIcon/>}
                value={email}
                setValue={setEmail}
            />
            <UiInput
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
                        registration(login, email, password, setAuth);
                    }
                    else alert("Passwords error");
                }}
            />
            <UiButton
                className={styles.signup_form__google}
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

