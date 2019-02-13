import React from 'react';

// eslint-disable-next-line react/prop-types
const LoginView = ({ loading }) => (
  <div>
    <h1>Welcome to the MMDP CMS login! </h1>
    <p>Login loading state is: {loading ? 'loading' : 'not loading'}</p>
  </div>
);

export default LoginView;
