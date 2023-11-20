import Loader from "../../components/Common/Loader";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PostCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { clearUserPosts } from "../../features/posts/postSlice";
import { getAllUserPosts } from "../../features/posts/action";

const Home = () => {
  const dispatch = useDispatch();
  const loginUserId = useSelector((state) => state.auth.userData);
  const { userPosts } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loginUserId) {
      setLoading(true);
      dispatch(getAllUserPosts(loginUserId)).finally(() => {
        setLoading(false);
      });
    }
    return () => {
      dispatch(clearUserPosts({}));
    };
  }, [loginUserId, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <Loader />
      </div>
    );
  }
  /* eslint-disable */
  console.log(process.env.NODE_ENV);
  return (
    <Container>
      <Row className="gy-3">
        <h4 className="text-center">My Posts</h4>
        {userPosts &&
          userPosts.map((items, index) => (
            <Col lg={3} key={items.$id}>
              <PostCard post={items} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;
