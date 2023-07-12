/*eslint-disable */
import React from 'react'
import { styled } from 'styled-components'
import Loginlogo from '../../../assets/images/login/dummy-logo.webp'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

const Login = () => {
  const handlelogin = () => {}
  return (
    <>
      <Logincompo className="bg-login d-flex justify-content-center align-items-center ">
        <div className="login-border p-2">
          <div className="login-padding p-5 text-center">
            <div className="content w-75 mx-auto">
              <img src={Loginlogo} alt="logo" className="mb-5 pb-3 " />
              <h2 className="login-heading mb-5">Login Page</h2>

              <Form onSubmit={handlelogin}>
                <Form.Group
                  className="mb-3 d-flex align-items-start flex-column"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="inp-label">
                    Email address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="email" placeholder="Enter email" className="login-input" />
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex align-items-start flex-column"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="inp-label">
                    Password <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    className="login-input"
                  />
                </Form.Group>

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
  .login-padding {
    background-color: white;
    border: none;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    min-width: 574px;
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
`

export default Login
