import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PostForm from "@/components/PostForm/PostForm";
import Loader from "@/components/Common/Loader";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedPost } from "@/features/posts/action";
import { clearSelectedPost } from "@/features/posts/postSlice";
const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { selectedPost } = useSelector((state) => state.posts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      dispatch(getSelectedPost(slug)).finally(() => {
        setIsLoading(false);
      });
    } else {
      navigate("/post");
    }
    return () => {
      dispatch(clearSelectedPost({}));
    };
  }, [slug, navigate, dispatch]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <Loader />
      </div>
    );
  }
  return (
    <Container>
      <div className="edit-post">
        <PostForm post={selectedPost} />
      </div>
    </Container>
  );
};

export default EditPost;
