import React, { useEffect, useState } from 'react';
import LoadingButton from '@/components/Common/LoadingButton';
import Loader from '@/components/Common/Loader';
import parse from 'html-react-parser';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Container, Row } from 'react-bootstrap';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import { deletePost, getSelectedPost } from '@/features/posts/action';
import { useFilePreview } from '@/hooks/useFilePreview';
import { clearSelectedPost } from '@/features/posts/postSlice';
import { formatDate } from '@/src/utils/formatDate';

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

  return (
    <div className='my-div'>
      {selectedPost && (
        <Container>
          <Card className='overflow-hidden'>
            <CardBody className='bg-white'>
              <div className=''>
                <h2 className='text-2xl font-bold text-center mb-4'>{selectedPost.title}</h2>
                <div className='d-flex justify-content-between mb-3'>
                  <div>
                    <span>Created by : {userData.name}</span>
                  </div>
                  <div>
                    <span>Published on {formatDate(selectedPost.$createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                {previewLoading && (
                  <React.Fragment>
                    <div className='skeleton skeleton-img w-100' />
                  </React.Fragment>
                )}

                <img
                  src={filePreview}
                  alt={selectedPost.title}
                  onLoad={() => setPreviewLoading(false)}
                  className={`rounded-xl overflow-hidden img-fluid ${previewLoading ? 'd-none' : 'd-block'}`}
                />
              </div>
              <div className='html-content'>{selectedPost.content ? parse(selectedPost.content) : null}</div>
              {isAuthor && (
                <div className='d-flex flex-column justify-content-end align-items-start'>
                  <div className='gap-5 d-flex justify-content-between'>
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
                </div>
              )}
            </CardBody>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default SelectedPost;
