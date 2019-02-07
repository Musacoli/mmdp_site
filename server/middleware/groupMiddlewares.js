import mongoose from 'mongoose';
import Joi from 'joi';
import Group from '../models/Group';
import permissions from '../core/permissions';

export const paramGroupExists = async (req, res, next) => {
  const errorResp = {
    status: 'error',
    message: 'The group does not exist.',
  };

  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    await Group.model.findById(id).exec((err, group) => {
      if (group) {
        req.group = group;
        next();
      } else {
        return res.status(404).json(errorResp);
      }
    });
  } else {
    return res.status(404).json(errorResp);
  }
};

const validate = (schema, req, res, next) => {
  const allPermissions = Object.keys(permissions);
  const newSchema = schema;
  newSchema.permissions = Joi.array().items(
    Joi.string().valid(...allPermissions),
  );

  const { error } = Joi.validate(req.body, newSchema);

  if (error) {
    return res.status(400).json(error);
  }
  next();
};

export const validateGroupCreate = (req, res, next) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
  };

  return validate(schema, req, res, next);
};

export const validateGroupUpdate = (req, res, next) => {
  const schema = {
    name: Joi.string().min(3),
  };

  return validate(schema, req, res, next);
};
