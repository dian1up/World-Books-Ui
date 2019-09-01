import Axios from 'axios'

export const Register = (data) => {
    console.log("data push logins = ",data);
    return{
        type:"REGISTER_USER",
        payload: Axios.post("https://salty-lake-72952.herokuapp.com/api/register", data)
    }
}