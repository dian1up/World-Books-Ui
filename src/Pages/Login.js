import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux'
import {Userlogin} from '../Redux/Actions/Login'
import Swal from 'sweetalert2'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      userlogin: [],
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.state.userlogin.push({
      email: this.state.username,
      password: this.state.password
    })
    console.log("push email dan pass = ",this.state.userlogin);
    const datalogin = this.state.userlogin;
    this.props.dispatch(Userlogin(datalogin[0]))
      .then(()=>{
        const status = this.props.Userlogin.Userlogin.status
        const token = this.props.Userlogin.Userlogin.jwtToken
        if(status==200){
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Successful Login',
            showConfirmButton: false,
            timer: 2000
          }).then(()=>{
         window.localStorage.setItem('token',token)
         console.log('sukses',window.localStorage.getItem('token'))
         window.location='/' })
        }
        else{
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Failure To Login',
            showConfirmButton: false,
            timer: 2000
          }).then(()=>{
            window.location='/login' 
          })
          
        }
      })
      .catch(()=>{
        console.log('xxxxxxxxxxxxxxxxxx')
      })
    
    // // window.localStorage.clear()
    // // let data1=window.localStorage.getItem('jwt') || ''
    //   //   console.log("hasil = ",window.localStorage.length) ;
    // Axios.post('http://localhost:8080/api/login', {
    //   email: this.state.username,
    //   password: this.state.password
    // })
    //   .then(res => {
    //     console.log('username =', this.state.username);
    //     console.log(res.data);
    //     window.localStorage.setItem('jwt',res.data.jwtToken) 
    //     window.localStorage.setItem('email',res.data.email)
    //     window.localStorage.setItem('level',res.data.level)
    //     window.localStorage.setItem('user',res.data.user)
    //     window.localStorage.setItem('id',res.data.id)
    //     window.location = '/';
    //   })
    //   .catch(err => console.log('error =', err));
  };
  handleChangeName = e => {
    this.setState({ username: e.target.value });
  };
  handleChangePass = e => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <div>
        <div className='FormTitle'>
          <h2 className='FormTitle__Header'>Signin</h2>
          <p className='FormTitle__Text'>
            Welcome back, please Signin to your account
          </p>
        </div>
        <div className='FormCenter'>
          <form onSubmit={this.handleSubmit} className='FormFields'>
            <div className='FormField'>
              <label className='FormField__Label' htmlFor='username'>
                Email
              </label>
              <input
                type='text'
                id='username'
                className='FormField__Input'
                placeholder='Enter your email'
                name='username'
                onChange={this.handleChangeName}
              />
            </div>
            <div className='FormField'>
              <label className='FormField__Label' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='FormField__Input'
                placeholder='Enter your password'
                name='password'
                onChange={this.handleChangePass}
              />
            </div>

            <div className='FormField'>
              <button style={{cursor:'pointer'}} className='FormField__Button mr-20' type='submit'>
                SIGNIN
              </button>
              <span className='mx-4' />
              {/* <Link to='/Signup' className='FormField__Link'> */}
                Create an account
              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    Userlogin: state.login
  }
}
export default connect(mapStateToProps)(Login);
