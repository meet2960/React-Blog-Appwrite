import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
const SelectedPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // !TODO Use redux to get the data,

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService
        .getSinglePost(slug)
        .then((post) => {
          if (post) {
            // toast.success("Fetch Successfully");
            console.log("selected post", post);
            setPost(post);
            appwriteService
              .getFilePreview(post?.featuredImage)
              .then((res) => {
                setImageSrc(res);
              })
              .catch(() => {});
          } else {
            navigate("/");
          }
        })
        .catch(() => {
          toast.error("Error While Fetching Post");
        });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <Container>
        <Row className="">
          <div className="">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <div>
              <span>Created by : {userData.name}</span>
            </div>
          </div>
          <img src={imageSrc} alt={post.title} className="rounded-xl" />

          {isAuthor && (
            <div className="">
              <Link to={`/edit-post/${post.$id}`}>
                <Button variant="warning" className="mr-3">
                  <BsPencilSquare />
                </Button>
              </Link>
              <Button variant={"danger"} onClick={deletePost}>
                <BsTrashFill />
              </Button>
            </div>
          )}
        </Row>

        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
};

export default SelectedPost;
