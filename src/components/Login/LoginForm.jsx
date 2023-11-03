import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { InputField, SelectField } from "../index";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingButton from "../Common/LoadingButton";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "meet@gmail.com",
      password: "meet@123",
    },
  });
  const [error, setError] = useState("");
  const handleLogin = async (data) => {
    console.log("Data", data);
    setError("");
    return await authService
      .login(data)
      .then((loginData) => {
        console.log("loginData", loginData);
        if (loginData) {
          return authService
            .getCurrentUser()
            .then((currUser) => {
              console.log("currUser", currUser);
              if (currUser && currUser.status) {
                toast.success("Login Successfully");
                dispatch(login(currUser));
                navigate("/");
              }
            })
            .catch((error) => {
              console.log("Error WHile Getting Current User", error);
            });
        } else {
          console.log("Error while loggin in");
        }
      })
      .catch((error) => {
        console.log("Error While Login in", error.message);
        toast.success(error.message);
      });
  };
  return (
    <div className="login-form">
      <Row className="">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card>
            <Card.Body className="p-5">
              <h3 className="text-center">Sign in</h3>
              <form onSubmit={handleSubmit(handleLogin)}>
                <Row className="gy-3">
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
                    <div className="d-flex justify-content-center align-items-center">
                      <LoadingButton
                        className="w-100"
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        Submit
                      </LoadingButton>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="d-flex justify-content-center">
                      <p className="me-1 mb-0">Don&apos;t have an account?</p>
                      <Link to={"/signup"}>Sign Up</Link>
                    </div>
                    {error && <div className="text-danger">{error}</div>}
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
