import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import { Col, Container, Row } from "react-bootstrap";
import { PostCard } from "../../components";
import Loader from "../../components/Common/Loader";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

const Home = () => {
  const loginUserId = useSelector((state) => state.auth.userData);
  console.log("login userId", loginUserId);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    appwriteService
      .getSelectedUserPost([Query.equal("userId", loginUserId.$id)])
      .then((res) => {
        console.log("Response", res);
        setPosts(res.documents);
      })
      .catch((error) => {
        console.log("Error in single post", error);
      })
      .finally(() => {
        setLoading(false);
      });
    // getSelecetedUserPost;
    // appwriteService
    //   .getAllActivePost([])
    //   .then((res) => {
    //     console.log("Response", res);
    //     setPosts(res.documents);
    //   })
    //   .catch((error) => {
    //     console.log("Error in single post", error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <Loader />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Container>
        <div>No Previous Post Found</div>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        {posts &&
          posts.map((items, index) => (
            <Col lg={3} key={items.$id}>
              <PostCard post={items} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;
