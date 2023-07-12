/* eslint-disable */
import React, { useState } from 'react'
// import '../../../assets/css/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Inside the validateForm function:

  const validateForm = () => {
    let valid = true
    if (!email) {
      setEmailError('Please enter the email')

      valid = false
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email')
      valid = false
    } else {
      setEmailError('')
    }
    if (!password) {
      setPasswordError('Please enter the password')
      valid = false
    } else {
      setPasswordError('')
    }
    return valid
  }

  // console.log(setEmailError)
  // console.log(emailError)

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   await axios
  //     .post('http://localhost:5000/user/login', { email, password })
  //     .then((res) =>  console.log(res.data),
  //       toast.success('Successfully LoggedIn !', {
  //         position: toast.POSITION.TOP_CENTER,

  //       }),
  //     )
  //     .then(() => {
  //       navigate('/dashboard')
  //     })
  //     .catch((err) =>
  //         toast.error('Invalid Email And Password  !', {
  //           position: toast.POSITION.TOP_CENTER,
  //         }),
  //     )
  // }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://localhost:5000/user/login',
          { email, password },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const { status } = response.data
        console.log(response.data.status)
        localStorage.setItem('status', status)

        if (status === 0) {
          console.log('user logged in')
          // navigate('/login')
          navigate('/dashboard')
          toast.success('Successfully Login!', {
            // position: toast.POSITION.TOP_CENTER,
          })
        } else if (status === 1) {
          console.log('Admin logged in')
          navigate('/dashboard')
          toast.success('Successfully Login!', {
            // position: toast.POSITION.TOP_CENTER,
          })
        } else if (status === 2) {
          console.log('Master Admin logged in')
          navigate('/dashboard')
          toast.success('Successfully Login!', {
            // position: toast.POSITION.TOP_CENTER,
          })
        }

        const userdata = response.data
      
        localStorage.setItem('token', userdata.Token)
     
      } catch (error) {
        toast.error('Invalid Email And Password!', {
          // position: toast.POSITION.TOP_CENTER,
        })
      }
    }
  }

  return (
    <>
      <div className="parent-container">
        <div className="centered-div">
          <div className="content">
            <div className="logo">
              <img className="logo-img" src={'Group 1000007161.svg'} alt="" />
              <p className="p">BEDS OF FINE QUALITY</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group-">
                <div className="fieldd">
                  <input
                    className={`input ${emailError && 'error-field'}`}
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    placeholder="Email Id"
                    required
                  />
                  <i className="fa-solid fa-envelope email-password-icon"></i>
                  {emailError && <p className="error ">{emailError}</p>}
                </div>
                <div className="fieldd">
                  <input
                    className={`input ${passwordError && 'error-field'}`}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <i
                      className="fa-solid fa-eye email-password-icon "
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  ) : (
                    <i
                      className="  fa-solid fa-eye-slash email-password-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  )}
                  {passwordError && <p className="error">{passwordError}</p>}
                </div>
              </div>
              <div className="f-parent">
                <Link className="forgot">Forgot password?</Link>{' '}
              </div>
              {/* <ToastContainer position="top-center" style={{ maxHeight: '50px', width: '400px' }} /> */}
              <button className="login-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login













