import axios from 'axios';
import {setUser} from "../reducers/userReducer";
export const registration = async(login, email, password, setAuth)=>{
    try {
        const response = await axios.post('http://localhost:5000/api/auth/registration', {
                login,
                email,
                password
            }
        )
        alert(response.data.message);
        setAuth(true);
    }
    catch(e){
        alert(e.response.data.message);
    }

}
export const authorization = (login, password, setUsername)=>{
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
            alert(e.response.data.message);
        }
    }

}