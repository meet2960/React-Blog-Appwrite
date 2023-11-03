import React, { useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { InputField, SelectField } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const handleSignup = async (data) => {
    console.log("Register Data", data);
    setError("");
    try {
      const userData = await authService
        .createAccount(data)
        .then((user) => {
          console.log("userData in then", user);
        })
        .catch((error) => {
          console.log("Error in singup catch", error);
        });
      // console.log("userData", userData);
      // if (userData) {
      //   const currentUser = await authService.getCurrentUser();
      //   if (currentUser) dispatch(login(currentUser));
      //   navigate("/");
      //   toast.success("User Created Successfully");
      // } else {
      //   console.log("Error while loggin in");
      // }
    } catch (error) {
      setError("Error while calling login api", error);
    }
  };
  return (
    <div className="login-form">
      <Row className="">
        <Col lg={8} className="mx-auto">
          <h3>Register Here</h3>
          <form onSubmit={handleSubmit(handleSignup)}>
            <Row className="gy-4">
              <Col lg={12}>
                <InputField
                  label="Full Name"
                  placeholder="Enter Name"
                  type="text"
                  {...register("name", {
                    required: true,
                  })}
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="Email"
                  placeholder="Enter Email"
                  type="email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
              </Col>
              <Col lg={12}>
                <InputField
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
              </Col>
              <Col lg={12}>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </form>
          <div className="d-flex justify-content-center">
            <p className="mb-0">Already have an Account ?</p>
            <Link to={"/login"}>Login</Link>
          </div>
          {error && <div className="text-danger">{error}</div>}
        </Col>
      </Row>
    </div>
  );
};

export default SignupForm;
