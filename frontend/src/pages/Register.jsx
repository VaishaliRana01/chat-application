import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f9f9f9; /* Lighter gray background */
  padding: 2rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: #2a2a2a; /* Dark gray text */
      text-transform: uppercase;
      font-size: 2.5rem; /* Larger font size */
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff; /* White background */
    border-radius: 2rem; /* Slightly rounded corners */
    padding: 3rem 5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Soft shadow effect */
  }

  input {
    background-color: #f5f5f5; /* Lighter gray background for input */
    padding: 1rem;
    border: 0.1rem solid #808080; /* Medium gray border */
    border-radius: 0.4rem;
    color: #333; /* Dark gray text for input */
    width: 100%;
    font-size: 1.2rem; /* Larger font size */
    transition: border-color 0.3s; /* Smooth transition for border color */

    &:focus {
      border-color: #521eff; /* Purple border on focus */
      outline: none;
    }
  }

  button {
    background-color: #521eff; /* Purple button color */
    color: #ffffff; /* White text color */
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s; /* Smooth transition for background color */

    &:hover {
      background-color: #380f9e; /* Darker purple on hover */
    }
  }

  span {
    color: #666666; /* Gray text color */
    text-transform: uppercase;
    font-size: 0.9rem; /* Smaller font size */

    a {
      color: #521eff; /* Purple link color */
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline; /* Underline on hover */
      }
    }
  }
`;



// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #f9f9f9; /* Lighter gray background */
//   padding: 2rem;

//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;

//     img {
//       height: 5rem;
//     }

//     h1 {
//       color: #2a2a2a; /* Dark gray text */
//       text-transform: uppercase;
//       font-size: 2.5rem; /* Larger font size */
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: #ffffff; /* White background */
//     border-radius: 2rem; /* Slightly rounded corners */
//     padding: 3rem 5rem;
//   }

//   input {
//     background-color: #f5f5f5; /* Lighter gray background for input */
//     padding: 1rem;
//     border: 0.1rem solid #808080; /* Medium gray border */
//     border-radius: 0.4rem;
//     color: #333; /* Dark gray text for input */
//     width: 100%;
//     font-size: 1.2rem; /* Larger font size */
//     transition: border-color 0.3s; /* Smooth transition for border color */

//     &:focus {
//       border-color: #521eff; /* Purple border on focus */
//       outline: none;
//     }
//   }

//   button {
//     background-color: #521eff; /* Purple button color */
//     color: #ffffff; /* White text color */
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     transition: background-color 0.3s; /* Smooth transition for background color */

//     &:hover {
//       background-color: #380f9e; /* Darker purple on hover */
//     }
//   }

//   span {
//     color: #666666; /* Gray text color */
//     text-transform: uppercase;

//     a {
//       color: #521eff; /* Purple link color */
//       text-decoration: none;
//       font-weight: bold;

//       &:hover {
//         text-decoration: underline; /* Underline on hover */
//       }
//     }
//   }
// `;


// const FormContainer = styled.div`
// height: 100vh;
// width: 100vw;
// display: flex;
// flex-direction: column;
// justify-content: center;
// gap: 1rem;
// align-items: center;
// background-color: #f0f8ff; /* Alice blue background */

// .brand {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   justify-content: center;

//   img {
//     height: 5rem;
//   }

//   h1 {
//     color: #00bfff; /* Steel blue text */
//     text-transform: uppercase;
//     font-size: 2.5rem; /* Larger font size */
//   }
// }

// form {
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   background-color: #fffafa; /* Snow background */
//   border-radius: 2rem;
//   padding: 3rem 5rem;
// }

// input {
//   background-color: #f0f0f0; /* Light gray background */
//   padding: 1rem;
//   border: 0.1rem solid #b0c4de; /* Light steel blue border */
//   border-radius: 0.4rem;
//   color: #4682b4; /* Steel blue text */
//   width: 100%;
//   font-size: 1.2rem; /* Larger font size */
//   transition: border-color 0.3s; /* Smooth transition for border color */

//   &:focus {
//     border-color: #87cefa; /* Light sky blue border on focus */
//     outline: none;
//   }
// }

// button {
//   background-color: #00bfff; /* Lime green background */
//   color: white;
//   padding: 1rem 2rem;
//   border: none;
//   font-weight: bold;
//   cursor: pointer;
//   border-radius: 0.4rem;
//   font-size: 1rem;
//   text-transform: uppercase;
//   transition: background-color 0.3s; /* Smooth transition for background color */

//   &:hover {
//     background-color: #3cb371; /* Medium sea green background on hover */
//   }
// }

// span {
//   color: #4682b4; /* Steel blue text */
//   text-transform: uppercase;

//   a {
//     color: #ff69b4; /* Hot pink link color */
//     text-decoration: none;
//     font-weight: bold;

//     &:hover {
//       text-decoration: underline; /* Underline on hover */
//     }
//   }
// }
// `;
