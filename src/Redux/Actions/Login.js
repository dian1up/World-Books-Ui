import Axios from 'axios'

export const Userlogin = (data) => {
    console.log("data push logins = ",data);
    return{
        type:"LOGIN_USER",
        payload: Axios.post("http://localhost:8080/api/login", data)
    }
}