import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo3.jpg';
import food from '../../assets/organic.png';
import { ToastContainer, toast } from "react-toastify";
import * as authActions from "../../services/authService";
const Login = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const handleLogin = async (e) => {
    e.preventDefault()
    const formValidation = () => {
      const { email, password } = user;

      let formErrors = {};
      let isValid = true;
      const regex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      const pwd = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
      );
      if (!email) {
        isValid = false;
        formErrors["email"] = "Email is required";
      } else if (!regex.test(email)) {
        isValid = false;
        formErrors["email"] = "Please enter a valid email address";
      }
      if (!password) {
        isValid = false;
        formErrors["password"] = "Password is required";
      } else if (!pwd.test(password)) {
        isValid = false;
        formErrors["password"] =
          "Your password should have at least one special character, digits, uppercase and lowercase charachter. Length: 8+ ch-ers.";
      }

      setError(formErrors);
      return isValid;
    };

    if (formValidation()) {
      try {
        const data = {
          email: user?.email,
          password: user?.password,
        };
        let response = await authActions.loginUser(data);
        let dataObj = response.data;
        if (response.status === 200) {
          toast.success(dataObj.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);

          localStorage.setItem("admin_token", dataObj.data.token);
          localStorage.setItem("userid_", dataObj.data.user._id);
        } else {
          toast.error(dataObj.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <>
    <ToastContainer />
      <div className='login_background'>
        <div className='common_container'>
          <div className='row'>
            <div className='col-6'>
              <img src={food} alt='picture' width="100%" />
            </div>
            <div className='col-6'>
              <div className='login_content'>
                <div className='text-center mb-3'>
                  <img src={logo} alt='logo' width="20%" />
                </div>
                <form onSubmit={handleLogin}>
                  <div className='mb-4'>
                    <label className='small_font'>Email</label>
                    <input className='input_fields' name='email' type="text" placeholder="Email" onChange={handleChange} />
                    <article className='text-danger so_small_font'>{error.email}</article>
                  </div>
                  <label className='small_font'>Password</label>
                  <input className='input_fields mb-2' type={"password"} name="password" placeholder="Password" onChange={handleChange} />
                  <article className='text-danger so_small_font'>{error.password}</article>
                  <Link to='/forgot-password'><h2 className='small_font text-end' style={{ cursor: "pointer", color: "#222", textDecoration: "underline" }}>Forgot Password ?</h2></Link>
                  <div className='text-center mt-5'>
                    <button className='common_btn'>Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;