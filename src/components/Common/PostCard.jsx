import React from 'react';
import { Link } from 'react-router-dom';
import { useFilePreview } from '@/hooks/useFilePreview';
const PostCard = ({ post }) => {
  const { filePreview, previewLoading, setPreviewLoading } = useFilePreview(post.featuredImage);

  return (
    <div className='post'>
      <Link to={`/post/${post?.$id}`} className='text-decoration-none'>
        <div>
          {previewLoading && (
            <React.Fragment>
              <div className='skeleton skeleton-img' />
            </React.Fragment>
          )}

          <React.Fragment>
            <div className='d-flex justify-content-center align-items-center'>
              <img
                src={filePreview}
                alt={post?.title}
                className={`post-img img-fluid rounded-3 ${previewLoading ? 'd-none' : 'd-block'}`}
                onLoad={() => {
                  setPreviewLoading(false);
                }}
              />
            </div>
          </React.Fragment>
          <div className='mt-2'>
            <h6>{post.title}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
