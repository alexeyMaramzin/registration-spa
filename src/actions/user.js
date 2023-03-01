import axios from 'axios';
import {setUser} from "../reducers/userReducer";
export const registration = async(login, email, password, setAuth, setErrors, errors)=>{
    try {
        await axios.post('http://localhost:5000/api/auth/registration', {
                login,
                email,
                password
            }
        )
        setAuth(true);
        setErrors({
            ...errors,
            registrationError: ''
        })
    }
    catch(e){
        setErrors({
            ...errors,
            registrationError: e.response.data.message
        })
    }
}
export const authorization = (login, password, setUsername, setErrors, errors)=>{
    return async dispatch =>{
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                    login,
                    password
                }
            )
            dispatch(setUser(response.data.user));
            setUsername(response.data.user.email);
        }
        catch(e){
            if(login==='google'){dispatch(
                setUser({login: 'google'}))
                setUsername('google@gmail.com')
            }
            setErrors({
                ...errors,
                wrongLogin: e.response.data.message
            })
        }
    }
}