import React from "react";
import SignupForm from "../../components/Signup/SignupForm";
import { Container } from "react-bootstrap";

const Register = () => {
  return (
    <section className="signup-page">
      <Container>
        <SignupForm />
      </Container>
    </section>
  );
};

export default Register;
