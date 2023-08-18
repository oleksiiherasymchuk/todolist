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
import { signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { database } from "../../api/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { isAuth } from "../../redux/appReducer";

type PropType = {};

const Login: React.FC = (props: PropType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //   e.preventDefault();
  //   signInWithPopup(auth, provider)
  //     .then((userData) => {
  //       const user = userData.user;
  //       const dataUser = {
  //         userID: user.uid,
  //         email: user.email,
  //         name: user.displayName,
  //       };
  //       const userDocRef = doc(database, "users", user.uid);
  //       setDoc(userDocRef, dataUser)
  //         .then(() => {
  //           console.log("user signed up");
  //           toast.success("Registration successful! You can now log in.", {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //           setEmail("");
  //           setPassword("");
  //         })
  //         .catch((error) => {
  //           console.error("user sign up failed", error);
  //         });
  //       navigate("/profile");
  //     })
  //     .catch((error) => {
  //       console.log(error.code);
  //       console.log(error.message);
  //     });
  // };
  const loginWithGoogleHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    signInWithPopup(auth, provider)
      .then((userData) => {
        const user = userData.user;
        const dataUser = {
          userID: user.uid,
          email: user.email,
          name: user.displayName,
        };
        const usersCollectionRef = collection(database, "users");
        const userDocRef = doc(usersCollectionRef, user.uid);

        getDoc(userDocRef).then((docSnapshot) => {
          if (!docSnapshot.exists()) {
            setDoc(userDocRef, dataUser)
              .then(() => {
                console.log("New user signed up");
                toast.success("Registration successful! You can now log in.", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                setEmail("");
                setPassword("");
                navigate("/profile");
                
              })
              .catch((error) => {
                console.error("User sign up failed", error);
              });
          } else {
            console.log("User already exists in the database");
            navigate("/profile");
          }
        });
        dispatch(isAuth(true) as any)
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const loginHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/profile");
        dispatch(isAuth(true) as any)
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
