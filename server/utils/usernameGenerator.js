const Username = email => {
  let key = 10 + Math.floor(Math.random() * 100);
  let secondKey = 10 + Math.floor(Math.random() * 100);
  let username = email.split("@")[0] + key + secondKey;
  return username;
};

export default Username;
