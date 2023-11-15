import React, { useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { InputField, SelectField } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingButton from "../Common/LoadingButton";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleSignup = async (data) => {
    console.log("Register Data", data);
    return authService
      .createAccount(data)
      .then((user) => {
        toast.success("User Registered Successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error in singup catch", error);
        toast.error(error.message);
      });
  };
  return (
    <div className="signup-form">
      <Row className="">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card>
            <Card.Body className="p-lg-5">
              <Row className="">
                <Col lg={12} className="mx-auto">
                  <h3 className="text-center">Register Here</h3>
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
                      <Col xs={12}>
                        <div className="d-flex justify-content-center">
                          <p className="mb-0">Already have an Account ?</p>
                          <Link to={"/login"}>Login</Link>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignupForm;
