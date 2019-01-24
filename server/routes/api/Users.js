import { User } from "../../models/User";
import username from "../../utils/usernameGenerator";
import { sendConfirmationEmail } from "../../utils/mailer";
import resp, { fields, exclude, status } from "../../constants/controllerConstants";
const { SUCCESS, ERROR, FAIL } = status;

export const createUser = (req, res) => {
  let user = User.model(),
    data = req.body;
  data["username"] = username(req.body.email);
  user.getUpdateHandler(req).process(data, (err) => {
    if (err) return res.json({ error: 'err' });
    sendConfirmationEmail(data);
    return res.status(201).json({
      status: SUCCESS,
      message: resp.accountCreated
    });
  });
};

export const confirmed = (req, res) => {
  return res.status(200).json({
    status: SUCCESS,
    message: resp.verified
  });
};

export const updateEmail = (req, res) => {
  return res.json({
    status: SUCCESS,
    message: resp.emailUpdated
  });
};

export const deleteUser = async (req, res) => {
  await User.model.findOne({ username: req.params.id }).exec((err, user) => {
    if (!user)
      return res.status(404).json({
        status: ERROR,
        message: resp.notFound
      });

    user.remove(err => {
      if (err)
        return res.status(500).json({
          status: ERROR,
          message: resp.tryAgain
        });
      return res.status(200).json({
        status: SUCCESS,
        message: resp.userDeleted
      });
    });
  });
};

export const fetchUser = async (req, res) => {
  await User.model
    .findOne(
      {
        username: req.params.id
      },
      fields
    )
    .exec((err, user) => {
      if (!user)
        return res.status(404).json({
          status: FAIL,
          message: resp.notFound
        });
      else {
        return res.json({
          status: SUCCESS,
          user: user
        });
      }
    });
};

export const fetchAllUsers = async (req, res) => {
  const user = await User.model.find({}, exclude);
  if (!user) {
    return res.status(500).json({
      status: FAIL,
      message: resp.tryAgain
    });
  }
  return res.json({
    status: SUCCESS,
    users: user
  });
};

export const edited = (req, res) => {
  return res.json({
    status: SUCCESS,
    message: resp.detailsUpdated
  });
};
