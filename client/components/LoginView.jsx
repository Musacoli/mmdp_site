import React from 'react';

const LoginView = ({ loading }) => {
  return (
    <div>
      <h1>Welcome to the MMDP CMS login! </h1>
      <p>Login loading state is: { loading ? 'loading': 'not loading' }</p>
    </div>
  )
}

export default LoginView;
