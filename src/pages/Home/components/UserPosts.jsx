import { PostCard } from '@/src/components';
import Loader from '@/src/components/Common/Loader';
import { getAllUserPosts } from '@/src/features/posts/action';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const UserPosts = () => {
  const dispatch = useDispatch();
  const loginUserId = useSelector(state => state.auth.userData);
  const { userPosts, userPostsStatus } = useSelector(state => state.posts);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    if (loginUserId && userPostsStatus === 'idle') {
      console.log('calling api');
      setLoading(true);
      dispatch(getAllUserPosts(loginUserId)).finally(() => {
        setLoading(false);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [loginUserId, dispatch, userPostsStatus]);

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center flex-grow-1'>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <Row className='gy-3'>
        <h4 className='text-center'>My Posts</h4>
        {userPosts &&
          userPosts.map((items, index) => (
            <Col lg={3} key={items.$id}>
              <PostCard post={items} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default UserPosts;
