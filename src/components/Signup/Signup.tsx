import React, { MouseEvent, useState } from "react";
import s from "../Login/Login.module.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, database } from "../../api/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, setDoc, doc } from "firebase/firestore";

type PropType = {};

const Login: React.FC = (props: PropType) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const loginHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const dataUser = {
          userID: user.uid,
          email: user.email,
          name: userName,
        };
        const usersCollectionRef = collection(database, "users");
        const userDocRef = doc(usersCollectionRef, user.uid);
        setDoc(userDocRef, dataUser)
          .then(() => {
            console.log("user signed up");
            toast.success("Registration successful! You can now log in.", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setEmail("");
            setPassword("");
            setUserName("")
            setTimeout(() => {
              navigate("/login");
            }, 5000);
          })
          .catch((error) => {
            console.error("user sign up failed", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-email") {
          toast.error("Please enter a valid email address.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (errorCode === "auth/email-already-in-use") {
          toast.error(
            "This email is already registered. Please log in instead.",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        }
        if (errorCode === "auth/weak-password") {
          toast.error(
            "Please choose a stronger password. It should be at least 6 characters.",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        }
        console.log(errorMessage);
      });
  };

  return (
    <div className={s.login}>
      <div className={s.loginLeft}>
        <div className={s.loginLeftForm}>
          <h1>Sign up page</h1>
          <p>Welcome! Please enter your details.</p>

          <div className={s.loginLeftFormLogin}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button variant="solid" onClick={loginHandler}>
              Sign up
            </Button>
            <p>
              Don't have an account?{" "}
              <span>
                <NavLink to="/login">I have already an account</NavLink>
              </span>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>

      <div className={s.loginRight}></div>
    </div>
  );
};

export default Login;
