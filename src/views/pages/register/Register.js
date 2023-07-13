// eslint-disable
import React, { useState } from 'react'
import { styled } from 'styled-components'
import Loginlogo from '../../../assets/images/login/dummy-logo.webp'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

  const validateForm = () => {
    let valid = true

    if (!email) {
      setEmailError('Please enter an email')
      valid = false
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email')
      valid = false
    } else {
      setEmailError('')
    }

    if (!password) {
      setPasswordError('Please enter a password')
      valid = false
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long',
      )
      valid = false
    } else {
      setPasswordError('')
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm the password')
      valid = false
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      valid = false
    } else {
      setConfirmPasswordError('')
    }

    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        // Send the registration request
        const response = await axios.post(
          'http://localhost:5000/user/register',
          { email, password },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        // Process the response
        const { status } = response.data
        console.log(response.data.status)
        localStorage.setItem('status', status)

        if (status === 0) {
          console.log('user registered')
          navigate('/dashboard')
          toast.success('Successfully registered!', {
            // position: toast.POSITION.TOP_CENTER,
          })
          // } else if (status === 1) {
          //   console.log('Admin registered')
          //   navigate('/dashboard')
          //   toast.success('Successfully registered!', {
          //     // position: toast.POSITION.TOP_CENTER,
          //   })
          // } else if (status === 2) {
          //   console.log('Master Admin registered')
          //   navigate('/dashboard')
          //   toast.success('Successfully registered!', {
          //     // position: toast.POSITION.TOP_CENTER,
          //   })
        }

        const userdata = response.data

        localStorage.setItem('token', userdata.Token)
      } catch (error) {
        toast.error('Registration failed!', {
          // position: toast.POSITION.TOP_CENTER,
        })
      }
    }
  }

  return (
    <>
      <Registercompo className="bg-register d-flex justify-content-center align-items-center ">
        <div className="register-border p-2 my-5">
          <div className="register-padding p-5 text-center">
            <div className="content w-75 mx-auto">
              <img src={Loginlogo} alt="logo" className="mb-5 pb-3 " />
              <h2 className="register-heading mb-5">Register Page</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className=" d-flex align-items-start flex-column"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="inp-label mt-3">
                    Email address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    className="register-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                {emailError && <p className="error">{emailError}</p>}

                <Form.Group
                  className=" d-flex align-items-start flex-column"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="inp-label mt-3">
                    Password <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="register-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                <Form.Group
                  className=" d-flex align-items-start flex-column"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label className="inp-label mt-3">
                    Confirm Password <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    className="register-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {showConfirmPassword ? (
                    <i
                      className="fa-solid fa-eye email-password-icon "
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></i>
                  ) : (
                    <i
                      className="  fa-solid fa-eye-slash email-password-icon"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></i>
                  )}
                </Form.Group>
                {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}

                <Form.Group
                  className=" d-flex align-items-start flex-column"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="inp-label mt-3">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    className="register-input"
                  />
                </Form.Group>

                <Form.Group
                  className=" d-flex align-items-start flex-column"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="inp-label mt-3">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    className="register-input"
                  />
                </Form.Group>

                <Form.Group
                  className=" d-flex align-items-start flex-column"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="inp-label mt-3">Organization Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Organization Name "
                    className="register-input"
                  />
                </Form.Group>

                <button className="register-btn mb-3 mt-4">Register</button>

                <div className="sign-in-suggetion">
                  <p>
                    By signing up, you agree to our <Link>Terms of Service</Link> and the storing of
                    your data as per our <Link> Privacy Policy.</Link>
                  </p>
                  <p>
                    Already have an account?<Link to="/login"> Sign in instead</Link>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Registercompo>
    </>
  )
}

const Registercompo = styled.div`
  color: black;
  width: 100%;
  min-height: 100vh;
  /* background-color: #363639; */
  background-color: #b2d4d0;
  .register-border {
    /* border: 3px solid #9ee7e3;
    border-radius: 20px; */
  }
  .email-password-icon {
    position: relative;
    margin-bottom: -15px;
    top: -35px;
    left: 90%;
    @media (max-width: 576px) {
      left: 225px;
    }
  }
  .register-padding {
    background-color: white;
    border: none;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    /* min-width: 574px; */
    &:hover {
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
      transform: translateY(-2px);
      transition: all 0.2s;
    }
    @media (max-width: 576px) {
      min-width: 450px;
    }
  }
  .register-heading {
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
  .register-input {
    min-height: 58px;
    border: 3px solid #9ee7e3;
    border-radius: 10px;
    &:focus {
      outline: #9ee7e3 solid 2px;
      transition: all 0.2s;
    }
  }
  .register-btn {
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
  .error {
    text-align: start;
    color: red;
    max-width: 400px;
    margin: 0px;
  }
`

export default Register
