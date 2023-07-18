// eslint-disable
// import React, { useState } from 'react'
// import { styled } from 'styled-components'
// import Loginlogo from '../../../assets/images/login/dummy-logo.webp'
// import Form from 'react-bootstrap/Form'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const Register = () => {
//   const navigate = useNavigate()
//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [mobileNumber, setMobileNumber] = useState('')
//   const [Department, setDepartment] = useState('')
//   const [Position, setPosition] = useState('')
//   const [emailError, setEmailError] = useState('')
//   const [passwordError, setPasswordError] = useState('')
//   const [confirmPasswordError, setConfirmPasswordError] = useState('')

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

//   const validateForm = () => {
//     let valid = true

//     if (!email) {
//       setEmailError('Please enter an email')
//       valid = false
//     } else if (!emailRegex.test(email)) {
//       setEmailError('Please enter a valid email')
//       valid = false
//     } else {
//       setEmailError('')
//     }

//     if (!password) {
//       setPasswordError('Please enter a password')
//       valid = false
//     } else if (!passwordRegex.test(password)) {
//       setPasswordError(
//         'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long',
//       )
//       valid = false
//     } else {
//       setPasswordError('')
//     }

//     if (!confirmPassword) {
//       setConfirmPasswordError('Please confirm the password')
//       valid = false
//     } else if (password !== confirmPassword) {
//       setConfirmPasswordError('Passwords do not match')
//       valid = false
//     } else {
//       setConfirmPasswordError('')
//     }

//     return valid
//   }

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
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const [Department, setDepartment] = useState('')
  const [Position, setPosition] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [mobileNumberError, setMobileNumberError] = useState('')
  const [departmentError, setDepartmentError] = useState('')
  const [positionError, setPositionError] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
  const mobileNumberRegex = /^\d{0,10}$/

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

    if (!username) {
      setUsernameError('Please enter a username')
      valid = false
    } else {
      setUsernameError('')
    }

    if (!mobileNumber) {
      setMobileNumberError('Please enter a Mobile Number')
      valid = false
    } else if (mobileNumber.length !== 10) {
      setMobileNumberError('Mobile number must be 10 digits')
      valid = false
    } else {
      setMobileNumberError('')
    }

    if (Department === '') {
      setDepartmentError('Please select a department')
      valid = false
    } else if (Department === 'default') {
      setDepartmentError('Please select a valid department')
      valid = false
    } else {
      setDepartmentError('')
    }

    if (!Position) {
      setPositionError('Please select a position')
      valid = false
    } else {
      setPositionError('')
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
        <div className="register-padding my-3 py-3 py-sm-4  text-center">
          <div className="content px-5 mx-auto">
            <img src={Loginlogo} alt="logo" className="m-2 m-sm-3 p-2 p-sm-3 img-logo " />
            <h2 className="register-heading m-sm-3 m-2">Register Form</h2>

            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <Form.Group
                    className=" d-flex align-items-start flex-column "
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="inp-label mt-3">
                      Username <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      className={`register-input ${usernameError && 'borderred'}`}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  {usernameError && (
                    <p className="error">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      {usernameError}
                    </p>
                  )}

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
                      className={`register-input ${usernameError && 'borderred'}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  {emailError && (
                    <p className="error">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      {emailError}
                    </p>
                  )}

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
                      className={`register-input ${usernameError && 'borderred'}`}
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
                  {passwordError && (
                    <p className="error">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      {passwordError}
                    </p>
                  )}

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
                      className={`register-input ${usernameError && 'borderred'}`}
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
                  {confirmPasswordError && (
                    <p className="error">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <Form.Group
                    className=" d-flex align-items-start flex-column"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="inp-label mt-3">
                      Mobile Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Mobile Number"
                      className={`register-input ${usernameError && 'borderred'}`}
                      value={mobileNumber}
                      onChange={(e) => {
                        const input = e.target.value
                        const truncatedInput = input.slice(0, 10) // Truncate input to 10 digits
                        setMobileNumber(truncatedInput)
                      }}
                    />
                  </Form.Group>
                  {mobileNumberError && (
                    <p className="error">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      {mobileNumberError}
                    </p>
                  )}

                  <Form.Group
                    className=" d-flex align-items-start flex-column"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="inp-label mt-3">
                      Department <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className={`register-input ${usernameError && 'borderred'}`}
                      value={Department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option>Open this select menu</option>
                      <option value="hr">HR</option>
                      <option value="ui/ux">UI/UX</option>
                      <option value="web-development">Web Development</option>
                      <option value="app-development">App Development</option>
                      <option value="seo">SEO</option>
                    </Form.Select>
                  </Form.Group>
                  {departmentError && (
                    <p className="error">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      {departmentError}
                    </p>
                  )}

                  <Form.Group
                    className=" d-flex align-items-start flex-column"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="inp-label mt-3">
                      Position <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className={`register-input ${usernameError && 'borderred'}`}
                      value={Position}
                      onChange={(e) => setPosition(e.target.value)}
                    >
                      <option>Open this select menu</option>
                      <option value="tl">Team Leader</option>
                      <option value="sd">Senior Developer</option>
                      <option value="jd">Junior Developer</option>
                      <option value="trainee">Trainee</option>
                    </Form.Select>
                  </Form.Group>
                  {positionError && (
                    <p className="error">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      {positionError}
                    </p>
                  )}
                </div>
              </div>
              <button className="register-btn my-4">Register</button>

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
      </Registercompo>
    </>
  )
}

const Registercompo = styled.div`
  color: black;
  width: 100%;
  min-height: 100vh;
  background-color: transparent !important;
  background-image: linear-gradient(to right top, #0b699e, #1ef08d);
  .borderred {
    border-color: red !important;
  }
  .img-logo {
    width: 30%;
  }
  .email-password-icon {
    position: relative;
    margin-bottom: -15px;
    top: -35px;
    left: 85%;
  }
  .register-padding {
    background-color: white;
    border: none;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &:hover {
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
      transform: translateY(-2px);
      transition: all 0.2s;
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
    font-size: 18px;
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
    background-color: #0f9299;
    color: black;
    width: 100%;
    font-size: 18px;
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
  @media (max-width: 768px) {
    .register-heading {
      font-size: 32px;
      line-height: 52px;
    }
    .register-padding {
      max-width: 80%;
    }
    .inp-label {
      font-size: 18px;
      line-height: 27px;
    }
    .register-input {
      min-height: 58px;
    }
    .register-btn {
      min-height: 58px;
      width: 100%;
      font-size: 18px;
      line-height: 27px;
    }
  }
  @media (max-width: 576px) {
    .register-padding {
      max-width: 80%;
    }
    .register-heading {
      font-size: 26px;
      line-height: 52px;
    }
    .inp-label {
      font-size: 16px;
      line-height: 27px;
    }
    .register-input {
      min-height: 58px;
    }
    .register-btn {
      min-height: 58px;
      width: 100%;
      font-size: 16px;
      line-height: 27px;
    }
    .sign-in-suggetion {
      font-size: 12px;
    }
  }
`

export default Register
