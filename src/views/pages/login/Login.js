/*eslint-disable */
import React, { useState } from 'react'
import { styled } from 'styled-components'
import Loginlogo from '../../../assets/images/login/dummy-logo.webp'
import Form from 'react-bootstrap/Form'
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
      <Logincompo className="bg-login d-flex justify-content-center align-items-center ">
        <div className="login-border p-2">
          <div className="login-padding p-5 text-center">
            <div className="content w-75 mx-auto">
              <img src={Loginlogo} alt="logo" className="mb-5 pb-3 " />
              <h2 className="login-heading mb-5">Login Page</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3 d-flex align-items-start flex-column"
                  controlId="formBasicEmail"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="Email Id"
                >
                  <Form.Label className="inp-label">
                    Email address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter email" className="login-input" />
                </Form.Group>
                {emailError && <p className="error">{emailError}</p>}

                <Form.Group
                  className="mb-3 d-flex align-items-start flex-column"
                  controlId="formBasicPassword"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                >
                  <Form.Label className="inp-label">
                    Password <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="login-input"
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
                </Form.Group>
                {passwordError && <p className="error">{passwordError}</p>}

                <button className="login-btn my-3">Login</button>

                <div className="sign-in-suggetion">
                  <p>
                    New to our platform? <Link to="/register">Create an account</Link>
                  </p>
                  <p>
                    <Link>Forgot password?</Link>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Logincompo>
    </>
  )
}

const Logincompo = styled.div`
  color: black;
  width: 100%;
  min-height: 100vh;
  /* background-color: #363639; */
  background-color: #b2d4d0;
  .login-border {
    /* border: 3px solid #9ee7e3;
    border-radius: 20px; */
  }
  .email-password-icon {
    position: relative;
    top: -35px;
    left: 90%;
    @media (max-width: 576px) {
      left: 225px;
    }
  }
  .login-padding {
    background-color: white;
    border: none;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    min-width: 576px;
    @media (max-width: 576px) {
      min-width: auto;
    }
    &:hover {
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
      transform: translateY(-2px);
      transition: all 0.2s;
    }
    @media (max-width: 576px) {
      min-width: 450px;
    }
  }
  .login-heading {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 52px;
    letter-spacing: 0em;
  }
  .inp-label {
    font-size: 21px;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: center;
  }
  .login-input {
    min-height: 58px;
    border: 3px solid #9ee7e3;
    border-radius: 10px;
    &:focus {
      outline: #9ee7e3 solid 2px;
      transition: all 0.2s;
    }
  }
  .login-btn {
    min-height: 58px;
    border: none;
    border-radius: 10px;
    background-color: #9ee7e3;
    color: black;
    width: 100%;
    font-size: 21px;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: center;
    &:hover {
      background-color: black;
      transition: all 0.5s;
      color: white;
    }
  }
  .error{
    text-align: start;
    color: red;
  }
`

export default Login
