import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      try {
        const { data } = await axios.post(loginRoute, { username, password });
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
      } catch (error) {
        console.error("Login Error:", error);
        toast.error("An error occurred. Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <span className="hello">
            <h2>Where every word sparks a smile!</h2>
          </span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account? <Link to="/register">Create One.</Link>
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
  }
  
  img {
    height: 5rem;
  }

  h1 {
    color: #2a2a2a; /* Dark gray text */
    text-transform: uppercase;
    font-size: 2rem; /* Larger font size */
  }

  .hello {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  
    h2 {
      color: #521eff; /* Purple text */
      text-transform: uppercase;
      font-size: 1rem; /* Larger font size */
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ffffff; /* White background */
    border-radius: 1rem; /* Slightly rounded corners */
    padding: 3rem; /* Increased padding */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Soft shadow effect */
  }

  input {
    background-color: #f5f5f5; /* Lighter gray background */
    padding: 1rem;
    border: 1px solid #808080; /* Medium gray border */
    border-radius: 0.4rem;
    color: #333; /* Dark gray text */
    width: 100%;
    font-size: 1rem;

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


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loginRoute } from "../utils/APIRoutes";

// export default function Login() {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({ username: "", password: "" });
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };
//   useEffect(() => {
//     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
//       navigate("/");
//     }
//   }, []);

//   const handleChange = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

//   const validateForm = () => {
//     const { username, password } = values;
//     if (username === "") {
//       toast.error("Email and Password is required.", toastOptions);
//       return false;
//     } else if (password === "") {
//       toast.error("Email and Password is required.", toastOptions);
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       const { username, password } = values;
//       const { data } = await axios.post(loginRoute, {
//         username,
//         password,
//       });
//       if (data.status === false) {
//         toast.error(data.msg, toastOptions);
//       }
//       if (data.status === true) {
//         localStorage.setItem(
//           process.env.REACT_APP_LOCALHOST_KEY,
//           JSON.stringify(data.user)
//         );

//         navigate("/");
//       }
//     }
//   };

//   return (
    
//     <>
//       <FormContainer>
//         <form action="" onSubmit={(event) => handleSubmit(event)}>
//           <div className="brand">
//             <img src={Logo} alt="logo" />
//             <h1>snappy</h1>
//           </div>
//           <span className="hello"><h2> "Where every word sparks a smile!"</h2>
//          </span>
//           <input
//             type="text"
//             placeholder="Username"
//             name="username"
//             onChange={(e) => handleChange(e)}
//             min="3"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             onChange={(e) => handleChange(e)}
//           />
//           <button type="submit">Log In</button>
//           <span>
//             Don't have an account ? <Link to="/register">Create One.</Link>
//           </span>
//         </form>
//       </FormContainer>
//       <ToastContainer />
//     </>
//   );
// }




// const FormContainer = styled.div`
// height: 100vh;
// width: 100vw;
// display: flex;
// flex-direction: column;
// justify-content: center;
// gap: 1rem;
// align-items: center;
// background-color: #f0f0f0; /* Light gray background */
// padding: 2rem;


// .brand {
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   justify-content: center;
//  }
  
//  img {
//     height: 5rem;
//   }

//   h1 {
//     color: #00bfff; /* Dark gray text */
//     text-transform: uppercase;
//     font-size: 2rem; /* Larger font size */
//   }

//   .hello{
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
  
//     h2 {
//       color:#4e0eff; /* Dark gray text */
//       text-transform: uppercase;
//       font-size: 1rem; /* Larger font size */
  
//     }
   
  
// }

// }

// form {
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   background-color: #f0fff0; /* White background */
//   border-radius: 1rem; /* Slightly rounded corners */
//   padding: 3rem; /* Increased padding */
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Soft shadow effect */
// }

// input {
//   background-color: #f5f5f5; /* Lighter gray background */
//   padding: 1rem;
//   border: 1px solid dark grey; /* Light gray border */
//   border-radius: 0.4rem;
//   color: #333; /* Dark gray text */
//   width: 100%;
//   font-size: 1rem;

//   &:focus {
//     border-color: #4e0eff; /* Light blue border on focus */
//     outline: none;
//   }
// }

// button {
//   background-color: #00bfff; /* Purple button color */
//   color: #fff; /* White text color */
//   padding: 1rem 2rem;
//   border: none;
//   font-weight: bold;
//   cursor: pointer;
//   border-radius: 0.4rem;
//   font-size: 1rem;
//   text-transform: uppercase;

//   &:hover {
//     background-color: #6933ff; /* Darker purple on hover */
//   }
// }

// span {
//   color: #666; /* Gray text color */
//   text-transform: uppercase;
//   font-size: 0.9rem; /* Smaller font size */

//   a {
//     color: #4e0eff; /* Purple link color */
//     text-decoration: none;
//     font-weight: bold;

//     &:hover {
//       text-decoration: underline; /* Underline on hover */
//     }
//   }
// }
// `;
