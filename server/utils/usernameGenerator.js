const Username = (email) => {
  const key = 10 + Math.floor(Math.random() * 100);
  const secondKey = 10 + Math.floor(Math.random() * 100);
  const username = email.split('@')[0] + key + secondKey;
  return username;
};

export default Username;
