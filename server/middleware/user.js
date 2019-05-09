import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator, { isEmail } from 'validator';
import User from '../models/User';
import Group from '../models/Group';
import {
  hasPassword,
  passwordvalidator,
  usernamevalidator,
  phoneNumberValidator,
} from '../utils/validators';
import resp, { status } from '../constants/middlewareConstants';
import { passwordError } from '../constants/controllerConstants';

const { FAIL } = status;

// checks whether the user is registered already
export const checkEmail = async (req, res, next) => {
  const user = await User.model.findOne({ email: req.body.email });
  if (!user) {
    const groupIds = req.body.groups;
    if (groupIds.length === 0) {
      next();
    } else {
      for (let i = 0; i < groupIds.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(groupIds[i])) {
          return res.status(422).json({
            message: 'The request is invalid.',
          });
        }
      }
    }
    const check = await Group.model.find({
      _id: groupIds,
    });
    if (!check) {
      res.status(400).json({
        message: 'check group',
      });
    } else {
      next();
    }
  } else {
    res.status(400).json({
      message: resp.emailTaken,
    });
  }
};

export const parseRegistration = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: resp.emailRequired });
  }
  if (!req.body.email || !req.body.groups) {
    res.status(400).json({
      message: 'only email and groups fields are required!',
    });
  }
  if (
    !Object.keys(req.body).includes('email') &&
    !Object.keys(req.body).includes('groups')
  ) {
    res.status(400).json({ status: FAIL, message: resp.onlyEmail });
  } else if (!validator.isEmail(req.body.email)) {
    res.status(400).json({ status: FAIL, message: resp.passwordRequired });
  } else {
    next();
  }
};
// velidates  email
export const validateEmail = (req, res, next) => {
  const email = Object.keys(req.body).includes('email');
  const fields =
    Object.keys(req.body).includes('newEmail') ||
    Object.keys(req.body).includes('groups');
  if (!email) {
    res.status(400).json({
      status: FAIL,
      message: resp.oldEmail,
    });
  }
  if (email) {
    if (!fields) {
      res.status(400).json({
        status: FAIL,
        message: 'new email, groups or both are required!',
      });
    } else {
      next();
    }
  } else if (
    !validator.isEmail(req.body.newEmail) ||
    !validator.isEmail(req.body.email)
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
        if (req.body.password !== req.body.confirmPassword) {
          return res.status(400).json({
            status: FAIL,
            message: resp.passMatchError,
          });
        }
        // Checks whether the provided phoneNumber meets phoneNumber standards
        if (req.body.phone && !phoneNumberValidator(req.body.phone)) {
          return res.status(400).json({
            status: FAIL,
            error: resp.phoneNumberError,
          });
        }
        // If user is confirmed abort this operation
        User.model.findOne({ email: decoded.email }).then((foundUser) => {
          if (!foundUser) {
            return res.status(400).json({
              status: FAIL,
              message: resp.notFound,
            });
          }
          if (foundUser.confirmed) {
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
          User.model.findOne({ username: req.body.username }).then((user) => {
            if (user) {
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
  if (req.user.email === req.body.email) {
    return res.status(400).json({
      message: 'You are not authorized to edit your own account',
    });
  }
  const { email, newEmail } = req.body;
  const foundUser = await User.model.findOne({ email: req.body.email });
  const userWithEmailExists = await User.model.findOne({
    email: req.body.newEmail,
  });
  if (foundUser) {
    if (!userWithEmailExists) {
      const user = User.model;
      delete req.body.email;
      if (req.body.newEmail) {
        if (!isEmail(newEmail)) {
          return res.status(400).json({
            status: FAIL,
            message: 'provide a valid email',
          });
        }
        next();
      }

      if (Object.keys(req.body).includes('newEmail')) {
        const data = {};
        data.email = req.body.newEmail;
        data.groups = req.body.groups;
        await user.findOneAndUpdate({ email }, data);
        next();
      } else {
        await user.findOneAndUpdate({ email }, req.body);
        next();
      }
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
export const verifyEdit = (req, res, next) => {
  // we are trying to edit the details of the user making the request
  const { email } = req.user;
  // check whether this user is activated
  User.model.findOne({ email }).then((foundUser) => {
    if (!foundUser) {
      return res.status(400).json({
        status: FAIL,
        message: resp.notFound,
      });
    }
    if (!foundUser.confirmed) {
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
      User.model
        .findOneAndUpdate(
          { email },
          {
            password: hasPassword(req.body.password),
          },
        )
        .then(() => {
          next();
        });
    } else {
      if (req.body.password) {
        if (!passwordvalidator(req.body.password)) {
          return res.status(400).json({ error: passwordError.password });
        }
        User.model.findOne({ username: req.body.username }).then((user) => {
          if (user) {
            return res.status(400).json({
              status: FAIL,
              message: resp.usernameTaken,
            });
          }
        });
        if (usernamevalidator(req.body.username)) {
          return res.status(400).json({
            status: FAIL,
            message: resp.usernameLength,
          });
        }
        User.model
          .findOneAndUpdate(
            { email },
            {
              username: req.body.username,
              password: hasPassword(req.body.password),
            },
          )
          .then(() => {
            next();
          });
      }
      if (usernamevalidator(req.body.username)) {
        return res.status(400).json({
          status: FAIL,
          message: resp.usernameLength,
        });
      }
      User.model.findOne({ username: req.body.username }).then((user) => {
        if (user) {
          return res.status(400).json({
            status: FAIL,
            message: resp.usernameTaken,
          });
        }
      });
      User.model
        .findOneAndUpdate(
          { email },
          {
            username: req.body.username,
          },
        )
        .then(() => {
          next();
        });
    }
  });
};

export const checkPasswordsValidity = async (req, res, next) => {
  const { username } = req.params;
  if (Object.entries(req.body).length <= 2) {
    return res.status(400).json({
      status: FAIL,
      message: resp.allFieldsReq,
    });
  }
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userData = await User.model.findOne({ username }).exec();
    if (!userData.confirmed) {
      return res.status(400).json({
        status: FAIL,
        message: resp.activateAcc,
      });
    }
    const existingPasswordMatch = await bcrypt.compare(oldPassword, userData.password);
    const newPasswordExists = await bcrypt.compare(newPassword, userData.password);
    if (!existingPasswordMatch) {
      return res.status(400).json({
        status: FAIL,
        message: passwordError.oldPasswordMatchFail,
      });
    } else if (newPasswordExists) {
      return res.status(400).json({
        status: FAIL,
        message: passwordError.samePasswords,
      });
    } else if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: FAIL,
        message: passwordError.passwordsDontMatch,
      });
    } else if (!passwordvalidator(req.body.newPassword)) {
      return res.status(400).json({
        status: FAIL,
        message: passwordError.password,
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      status: FAIL,
      message: resp.notFound,
    });
  }
}
