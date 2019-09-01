import Axios from 'axios'

export const Userlogin = (data) => {
    console.log("data push logins = ",data);
    return{
        type:"LOGIN_USER",
        payload: Axios.post("https://salty-lake-72952.herokuapp.com/api/login", data)
    }
}