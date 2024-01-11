import { Container } from 'react-bootstrap';
import UserPosts from './components/UserPosts';

const Home = () => {
  return (
    <>
      <Container>
        <UserPosts />
      </Container>
    </>
  );
};

export default Home;
