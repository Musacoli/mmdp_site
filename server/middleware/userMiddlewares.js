import jwt from 'jsonwebtoken';

import validator from 'validator';
import User from '../models/User';
import {
  hasPassword,
  passwordvalidator,
  usernamevalidator,
} from '../utils/validators';
import resp, { status } from '../constants/middlewareConstants';
import { passwordError } from '../constants/controllerConstants';

const { FAIL } = status;

// checks whether the user is registered already
export const checkEmail = async (req, res, next) => {
  const user = await User.model.findOne({ email: req.body.email });
  if (!user) {
    next();
  } else {
    res.status(400).json({
      status: FAIL,
      message: resp.emailTaken,
    });
  }
};

export const parseRegistration = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ status: FAIL, message: resp.emailRequired });
  } else if (!Object.keys(req.body).includes('email')) {
    res.status(400).json({ status: FAIL, message: resp.onlyEmail });
  } else if (!validator.isEmail(req.body.email)) {
    res.status(400).json({ status: FAIL, message: resp.passwordRequired });
  } else {
    next();
  }
};
// velidates  email
export const validateEmail = (req, res, next) => {
  if (
    Object.keys(req.body).length === 0 ||
    Object.keys(req.body).length !== 2
  ) {
    res.status(400).json({
      status: FAIL,
      message: resp.newOldEmail,
    });
  } else if (
    !validator.isEmail(req.body.newEmail) ||
    !validator.isEmail(req.body.oldEmail)
  ) {
    res.status(400).json({
      status: FAIL,
      message: resp.bothEmails,
    });
  } else {
    next();
  }
};

// verify User account
export const verifyAccount = (req, res, next) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: FAIL,
          message: resp.tokenMissing,
        });
      } else {
        if (!req.body.username) {
          return res.status(401).json({
            status: FAIL,
            message: resp.usernameRequired,
          });
        }
        if (!req.body.password) {
          return res.status(401).json({
            status: FAIL,
            message: resp.passRequired,
          });
        }
        // If user is confirmed abort this operation
        User.model.findOne({ email: decoded.email }).then((user) => {
          if (!user) {
            return res.status(400).json({
              status: FAIL,
              message: resp.notFound,
            });
          }
          if (user.confirmed) {
            //  Already confirmed
            return res.status(400).json({
              status: FAIL,
              message: resp.accVerified,
            });
          }
          if (!passwordvalidator(req.body.password)) {
            return res.status(400).json({
              status: FAIL,
              error: passwordError.password,
            });
          }
          if (usernamevalidator(req.body.username)) {
            return res.status(400).json({
              status: FAIL,
              message: resp.usernameLength,
            });
          }
          User.model
            .findOne({ username: req.body.username })
            .then((foundUser) => {
              if (foundUser) {
                return res.status(400).json({
                  status: FAIL,
                  message: resp.usernameDublicate,
                });
              }
            });
          User.model
            .findOneAndUpdate(
              { email: decoded.email },
              {
                confirmed: true,
                phone: req.body.phone,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                username: req.body.username,
                password: hasPassword(req.body.password),
              },
            )
            .then(() => {
              next();
            });
        });
      }
    });
  } else {
    res.status(401).json({
      status: FAIL,
      message: resp.tokenMissing,
    });
  }
};

// allows admin to update users emails
export const updateDetails = async (req, res, next) => {
  const { oldEmail, newEmail } = req.body;
  const user = await User.model.findOne({ email: req.body.oldEmail });
  const userWithEmailExists = await User.model.findOne({
    email: req.body.newEmail,
  });
  if (user) {
    if (!userWithEmailExists) {
      await User.model.findOneAndUpdate(
        { email: oldEmail },
        { email: newEmail },
      );
      next();
    } else {
      return res.status(404).json({
        status: FAIL,
        message: resp.newEmail,
      });
    }
  } else {
    return res.status(404).json({
      status: FAIL,
      message: resp.oldEmail,
    });
  }
};

// verify the details provided when updating the user details
export const verifyEdit = async (req, res, next) => {
  const { email } = req.user;
  // check whether this user is activated
  const user = await User.model.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: FAIL,
      message: resp.notFound,
    });
  }
  if (!user.confirmed) {
    //  At this point the user is not confirmed
    return res.status(400).json({
      status: FAIL,
      message: resp.activateAcc,
    });
  }
  if (!req.body.username) {
    //  if username not provided try to update the password
    if (!req.body.password) {
      // at this point no details were provided
      return res.status(400).json({
        status: FAIL,
        message: resp.allFieldsReq,
      });
    }
    //  try to update password

    if (!passwordvalidator(req.body.password)) {
      return res
        .status(400)
        .json({ status: FAIL, message: passwordError.password });
    }
    await User.model.findOneAndUpdate(
      { email },
      {
        password: hasPassword(req.body.password),
      },
    );
    next();
  } else {
    if (req.body.password) {
      if (!passwordvalidator(req.body.password)) {
        return res.status(400).json({ error: passwordError.password });
      }
      const foundUser = await User.model.findOne({
        username: req.body.username,
      });
      if (foundUser) {
        return res.status(400).json({
          status: FAIL,
          message: resp.usernameTaken,
        });
      }
      if (usernamevalidator(req.body.username)) {
        return res.status(400).json({
          status: FAIL,
          message: resp.usernameLength,
        });
      }
      await User.model.findOneAndUpdate(
        { email },
        {
          username: req.body.username,
          password: hasPassword(req.body.password),
        },
      );
      return next();
    }
    if (usernamevalidator(req.body.username)) {
      return res.status(400).json({
        status: FAIL,
        message: resp.usernameLength,
      });
    }
    const foundUser = await User.model.findOne({ username: req.body.username });
    if (foundUser) {
      return res.status(400).json({
        status: FAIL,
        message: resp.usernameTaken,
      });
    }
    await User.model.findOneAndUpdate(
      { email },
      {
        username: req.body.username,
      },
    );
    return next();
  }
};
