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
    <Link to={`/post/${post?.$id}`} className="text-decoration-none">
      <div className="d-flex flex-column">
        <div>
          {isLoading && (
            <React.Fragment>
              <div className="skeleton skeleton-img" />
            </React.Fragment>
          )}

          <React.Fragment>
            <img
              src={imageSrc}
              alt={post?.title}
              className={`img-fluid rounded-3 ${
                isLoading ? "d-none" : "d-block"
              }`}
              onLoad={() => setIsLoading(false)}
            />
          </React.Fragment>
        </div>
        <div className="mt-2">
          <h5>{post?.title}</h5>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
