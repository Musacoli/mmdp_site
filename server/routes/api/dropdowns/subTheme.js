/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const SubTheme = () => keystone.list('SubTheme');
export const FocusArea = () => keystone.list('FocusArea');

export const create = async (req, res) => {
  SubTheme()
    .model.insertMany(req.body.data)
    .then((result) => {
      return res.status(201).json({
        message: `${req.body.data.length} Sub Theme(s) successfully added`,
        data: result,
      });
    })
    .catch((err) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    });
};

export const list = async (req, res) => {
  const id = req.params.thematicPillar_id;

  const subThemes = SubTheme().model.find();
  if (id) {
    subThemes.where('thematicPillarId', id);
  }
  subThemes.exec((err, response) => {
    if (err) return res.status(400).json(err);
    res.sendSuccess(
      {
        data: response,
      },
      200,
    );
  });
};

export const updateMany = (req, res) => {
  req.body.data.forEach((data) => {
    SubTheme()
      .model.update(
        { _id: data._id },
        {
          subThemeName: data.subThemeName,
          description: data.description,
          thematicPillarId: data.thematicPillarId,
          edoTarget: data.edoTarget,
        },
        { upsert: true },
      )
      .then(() => {
        res.sendSuccess(
          '',
          201,
          `${req.body.data.length} Sub Theme(s) updated successfully`,
        );
      })
      .catch((err) => {
        res.sendError('failed', 500, err);
      });
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const subTheme = await SubTheme().model.findOne({ _id: id });
    if (!subTheme)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_TO_EDIT_NOT_FOUND, 'Sub-theme'),
        404,
      );
    const updatedSubTheme = await modelHelper.process(subTheme, req);
    return res.sendSuccess(
      {
        subTheme: updatedSubTheme,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Sub theme'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const subThemeInModel = (model, id) => {
  const results = model()
    .model.find()
    .where('subThemeId', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    subThemeInModel(FocusArea, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this sub theme. It is already assigned to ${
          results.length
        }  Focus Area`;
        errorMessage.push(message);
      }
    }),
  ]).then(() => {
    if (errorMessage.length > 0) {
      return res.sendError(errorMessage[0], 400, errorMessage[0]);
    }
    try {
      SubTheme()
        .model.findByIdAndRemove(id)
        .exec((error, subTheme) => {
          if (!subTheme)
            return res.sendError(
              sprintf(responseMessage.RESOURCE_NONE_EXIST, 'Sub Theme'),
              404,
              error,
            );
          return res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'Sub Theme'),
          );
        });
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
