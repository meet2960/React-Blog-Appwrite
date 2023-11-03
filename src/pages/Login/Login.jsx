import React from "react";
import LoginForm from "../../components/Login/LoginForm";
import { Container } from "react-bootstrap";

const Login = () => {
  return (
    <React.Fragment>
      <section className="login-page">
        <Container>
          <LoginForm />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Login;
