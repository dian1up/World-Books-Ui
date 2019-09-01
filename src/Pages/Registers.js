import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux'
import {Register} from '../Redux/Actions/Register'
import Swal from 'sweetalert2'

class Registers extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      register: [],
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.state.register.push({
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
    const dataregister = this.state.register;
    console.log("data regis = ",dataregister);
    this.props.dispatch(Register(dataregister[0]))
      .then(()=>{
        const status = this.props.Register.Register.status
        if(status==200){
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Register Successful',
            showConfirmButton: false,
            timer: 2000
          })
         window.location='/login' 
        }
        else{
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Register Fail',
            showConfirmButton: false,
            timer: 2000
          })
         window.location='/Register' 
        }
        
      })
    // Axios.post('http://localhost:8080/api/register', {
    //   name: this.state.username,
    //   email: this.state.email,
    //   password: this.state.password
    // })
    //   .then(res => {
    //     console.log('username =', this.state.username);
    //     window.location = '/login';
    //   })
    //   .catch(err => console.log('error =', err));
  };
  handleChangeName = e => {
    this.setState({ username: e.target.value });
  };
  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
  };
  handleChangePass = e => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <div>
        <div className='FormTitle'>
          <h2 className='FormTitle__Header'>Signup</h2>
          <p className='FormTitle__Text'>
            Welcome back, please Signup to create account
          </p>
        </div>

        <div className='FormCenter'>
          <form onSubmit={this.handleSubmit} className='FormFields'>
            <div className='FormField'>
              <label className='FormField__Label' htmlFor='username'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='FormField__Input'
                placeholder='Enter your username'
                name='username'
                onChange={this.handleChangeName}
              />
            </div>
            

            <div className='FormField'>
              <label className='FormField__Label' htmlFor='email'>
                E-Mail Address
              </label>
              <input
                type='email'
                id='email'
                className='FormField__Input'
                placeholder='Enter your email'
                name='email'
                onChange={this.handleChangeEmail}
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
                SIGNUP
              </button>
              <span className='mx-4' />
              <Link to='/login' className='FormField__Link'>
                I'm already a member
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    Register: state.Register
  }
}
export default connect(mapStateToProps)(Registers);
