import React, {useState} from 'react';
import styles from './IPhone.module.scss';
import {StartForm, SignupForm, LoginForm, AuthorizationSuccess} from '.';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useSelector} from "react-redux";
export const Container = () => {
    const isAuth = useSelector(state=>state.user.isAuth);
    const [username, setUsername] = useState();
    return (
        <div className={styles.container}>
            {!isAuth &&
                <Router>
                    <Routes>
                        <Route path='/' element={<StartForm/>}/>
                        <Route path='login' element={<LoginForm setUsername={setUsername}/>}/>
                        <Route path='signup' element={<SignupForm setUsername={setUsername}/>}/>
                    </Routes>
                </Router>
            }
            {isAuth&&
            <AuthorizationSuccess username={username}/>
            }
        </div>
    );
};

