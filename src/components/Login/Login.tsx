import React, { MouseEvent, useState } from "react";
import s from "./Login.module.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../api/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PropType = {};

const Login: React.FC = (props: PropType) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginWithGoogleHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((userData) => {
        const user = userData.user;
        console.log(user);
        navigate("/profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const loginHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          toast.error("Incorrect email or password. Please try again.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (errorCode === "auth/user-not-found") {
          toast.warn(
            "The email you entered is not registered. Please check and try again.",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          setTimeout(() => {
            navigate("/signup");
          }, 5000);
        }
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className={s.login}>
      <div className={s.loginLeft}>
        <div className={s.loginLeftForm}>
          <h1>Welcome back</h1>
          <p>Welcome back! Please enter your details.</p>

          <div className={s.loginLeftFormLogin}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Checkbox label="Remember me" />

            <Button variant="solid" onClick={loginHandler}>
              Sign in
            </Button>

            <Button
              variant="outlined"
              startDecorator={<GoogleIcon />}
              onClick={loginWithGoogleHandler}
            >
              Sign in with Google
            </Button>
            <p>
              Don't have an account?{" "}
              <span>
                <NavLink to="/signup">Sign up for free!</NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className={s.loginRight}></div>
      <ToastContainer />
    </div>
  );
};

export default Login;
