import mongoose from 'mongoose';
import Joi from 'joi';
import Group from '../models/Group';
import permissions from '../core/permissions';

export const paramGroupExists = async (req, res, next) => {
  const errorResp = {
    status: 'error',
    message: 'The group does not exist.',
  };

  const id = req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    await Group.model.findById(id).exec((err, group) => {
      if (group) {
        next();
      } else {
        return res.status(404).json(errorResp);
      }
    });
  } else {
    return res.status(404).json(errorResp);
  }
};

export const validateGroupData = (req, res, next) => {
  const allPermissions = Object.keys(permissions);

  const schema = {
    name: Joi.string().min(3).required(),
    permissions: Joi.array().items(Joi.string().valid(...allPermissions)),
  };

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    return res.status(422).json(error);
  }
  next();
};
