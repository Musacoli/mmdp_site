import jwtDecode from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem('userToken');
};

export const isLoggedIn = () => {
  try {
    return !!getToken();
  } catch (error) {
    return error === false;
  }
};

export const hasAccess = (items) => {
  let allowed = true;

  try {
    const { permissions } = jwtDecode(getToken());

    items.forEach((item) => {
      let found = false;

      permissions.forEach((permission) => {
        if (String(permission).startsWith(item)) found = true;
      });

      if (!found) allowed = false;
    });
  } catch (e) {
    return false;
  }

  return allowed;
};

export const authUserHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
