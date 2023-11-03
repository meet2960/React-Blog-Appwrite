import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PostForm from "../../components/PostForm/PostForm";
import appwriteService from "../../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";
const EditPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (slug) {
      appwriteService
        .getSinglePost(slug)
        .then((post) => {
          console.log("Response of Single Post", post);
          setPost(post);
        })
        .catch((error) => {
          console.log("Error in Single Post fetch", error);
        });
    } else {
      navigate("/post");
    }
  }, [slug, navigate]);
  return (
    <Container>
      <div>
        <PostForm post={post} />
      </div>
    </Container>
  );
};

export default EditPost;
