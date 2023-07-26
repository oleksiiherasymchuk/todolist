import React from "react";
import s from "./Login.module.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";
import GoogleIcon from "@mui/icons-material/Google";

type PropType = {};

const Login: React.FC = (props: PropType) => {
  return (
    <div className={s.login}>
      <div className={s.loginLeft}>
        <div className={s.loginLeftForm}>
          <h1>Welcome back</h1>
          <p>Welcome back! Please enter your details.</p>

          <div className={s.loginLeftFormLogin}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="***********"
              />
            </FormControl>
            <Checkbox label="Remember me" />
            <Button variant="solid">Sign in</Button>
            <Button variant="outlined" startDecorator={<GoogleIcon />}>
              Sign in with Google
            </Button>
            <p>
              Don't have an account? <span>Sign up for free!</span>
            </p>
          </div>
        </div>
      </div>

      <div className={s.loginRight}></div>
    </div>
  );
};

export default Login;
