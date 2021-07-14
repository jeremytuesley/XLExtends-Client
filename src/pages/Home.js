import { useQuery } from '@apollo/client';

import { LOGIN } from '../shared/utils/api';

const Home = () => {
  const { data, error, loading } = useQuery(LOGIN, {
    fetchPolicy: 'no-cache',
    variables: { email: 'user@email.com', password: 'password' },
  });

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify({ data, error, loading }, null, 2)}</pre>
    </div>
  );
};

export default Home;
