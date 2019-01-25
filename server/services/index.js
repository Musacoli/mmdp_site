import User from "../models/NormalUser";

const checkIfAdmin = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user && user.isAdmin) {
      return true;
    }
    else {
      res.status(400).json({ error: "Only admins can add users"});
    }
    next();
  })
};
export default checkIfAdmin;
