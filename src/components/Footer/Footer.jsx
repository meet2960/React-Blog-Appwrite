// import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Container className="py-4">
          <Row>
            <Col xs={12}>
              <div className="">
                <p className="text-center mb-0">
                  TinyBlogs© {new Date().getFullYear()} All Rights Reserved by
                  Meet
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </footer>
  );
};

export default Footer;
