import React, { useEffect, useState } from 'react';
import LoadingButton from '@/components/Common/LoadingButton';
import Loader from '@/components/Common/Loader';
import parse from 'html-react-parser';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row } from 'react-bootstrap';
// import { toast } from "react-toastify";
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import { deletePost, getSelectedPost } from '@/features/posts/action';
import { useFilePreview } from '@/hooks/useFilePreview';
import { clearSelectedPost } from '@/features/posts/postSlice';

const SelectedPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { selectedPost } = useSelector(state => state.posts);
  const { filePreview, previewLoading, setPreviewLoading } = useFilePreview(
    selectedPost?.featuredImage ? selectedPost?.featuredImage : ''
  );
  const userData = useSelector(state => state.auth.userData);
  const isAuthor = selectedPost && userData ? selectedPost.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      dispatch(getSelectedPost(slug))
        .catch(() => {
          console.log('selectedPost cach');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else navigate('/');

    return () => {
      dispatch(clearSelectedPost({}));
    };
  }, [slug, navigate, dispatch]);

  const handleDeletePost = () => {
    setDeleteLoading(true);
    dispatch(deletePost(selectedPost)).then(res => {
      if (res) {
        navigate('/');
      }
    });
  };

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center flex-grow-1'>
        <Loader />
      </div>
    );
  }

  return selectedPost ? (
    <div className='py-8'>
      <Container>
        <Row className=''>
          <div className=''>
            <h2 className='text-2xl font-bold'>{selectedPost.title}</h2>
            <div>
              <span>Created by : {userData.name}</span>
            </div>
          </div>
          <div className='col-6'>
            {previewLoading && (
              <React.Fragment>
                <div className='skeleton skeleton-img' />
              </React.Fragment>
            )}

            <img
              src={filePreview}
              alt={selectedPost.title}
              onLoad={() => setPreviewLoading(false)}
              className={`rounded-xl img-fluid ${previewLoading ? 'd-none' : 'd-block'}`}
            />
          </div>

          {isAuthor && (
            <div className='gap-5 d-flex'>
              <Link to={`/edit-post/${selectedPost.$id}`}>
                <Button variant='warning' className='mr-3'>
                  <BsPencilSquare />
                </Button>
              </Link>
              <LoadingButton
                variant={'danger'}
                onClick={handleDeletePost}
                loading={deleteLoading}
                disabled={deleteLoading}
              >
                <BsTrashFill />
              </LoadingButton>
            </div>
          )}
        </Row>

        <div className='browser-css'>{selectedPost.content ? parse(selectedPost.content) : null}</div>
      </Container>
    </div>
  ) : null;
};

export default SelectedPost;
