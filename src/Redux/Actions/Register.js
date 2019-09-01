import Axios from 'axios'

export const Register = (data) => {
    console.log("data push logins = ",data);
    return{
        type:"REGISTER_USER",
        payload: Axios.post("http://localhost:8080/api/register", data)
    }
}