import  { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import appwriteService from "@/appwrite/config";
import  PostCard from "@/components/Common/PostCard";
const AllPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService
      .getAllActivePost([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        } else {
          setPosts([]);
        }
      })
      .catch(() => {
        console.log("Error While calling api");
      });
  }, []);
  return (
    <Container>
      <div>
        <Row>
          {posts &&
            posts.map((items,) => (
              <Col lg={3} key={items.$id}>
                <PostCard post={items} />
              </Col>
            ))}
        </Row>
      </div>
    </Container>
  );
};

export default AllPost;
