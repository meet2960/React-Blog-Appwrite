import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";
const PostCard = ({ post }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // !TODO Use redux to get the data,
  useEffect(() => {
    if (post.featuredImage) {
      appwriteService
        .getFilePreview(post.featuredImage)
        .then((res) => {
          setImageSrc(res);
        })
        .catch(() => {});
    }
  }, [post]);

  return (
    <div className="post">
      <Link to={`/post/${post?.$id}`} className="text-decoration-none">
        <div>
          {isLoading && (
            <React.Fragment>
              <div className="skeleton skeleton-img" />
            </React.Fragment>
          )}

          <React.Fragment>
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={imageSrc}
                alt={post?.title}
                className={`post-img img-fluid rounded-3 ${
                  isLoading ? "d-none" : "d-block"
                }`}
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </React.Fragment>
          <div className="mt-2">
            <h6>{post?.title}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
