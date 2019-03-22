import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../../constants/responseMessage';
import modelHelper from '../../../helpers/modelHelper';

export const FocusArea = () => keystone.list('FocusArea');
export const ReturneeService = () => keystone.list('ReturneeService');

export const create = async (req, res) => {
  FocusArea()
    .model.insertMany(req.body.data)
    .then((response) => {
      const {
        data: { length },
      } = req.body;
      const count =
        length > 1 ? `${length} Focus Area options  ` : '1 Focus Area option ';
      return res.status(201).json({
        message: `${count} added successfully`,
        data: response,
      });
    })
    .catch((err) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    });
};

export const list = async (req, res) => {
  const id = req.params.subTheme_id;

  const areas = FocusArea().model.find();
  if (id) {
    areas.where('subThemeId', id);
  }
  areas.exec((err, response) => {
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
    FocusArea()
      .model.update(
        { _id: data._id },
        {
          focusAreaName: data.focusAreaName,
          description: data.description,
          subThemeId: data.subThemeId,
        },
        { upsert: true },
      )
      .then(() => {
        const {
          data: { length },
        } = req.body;
        const count =
          length > 1
            ? `${length} Focus Area options  `
            : '1 Focus Area option ';
        res.sendSuccess('', 201, `${count} updated successfully`);
      })
      .catch((err) => {
        res.status(500).json({ message: 'something went wrong' }, err);
      });
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await FocusArea().model.findOne({ _id: id });
    if (!area) return res.status(404).json({ message: 'not found' });
    const updatedArea = await modelHelper.process(area, req);
    return res.sendSuccess(
      {
        state: updatedArea,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Focus Area'),
    );
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

export const SourceModel = (model, id) => {
  const results = model()
    .model.find()
    .where('focusArea', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errMsg = [];
  Promise.all([
    SourceModel(ReturneeService, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this Focus Area option.It  has already been assigned to ${
          results.length
        } Returnee Service(s)`;
        errMsg.push(message);
      }
    }),
  ]).then(() => {
    if (errMsg.length > 0) {
      return res.sendError(errMsg[0], 400, errMsg[0]);
    }
    try {
      FocusArea()
        .model.findByIdAndRemove(id)
        .exec((error, source) => {
          if (!source)
            return res.sendError(
              sprintf(responseMessage.RESOURCE_NONE, 'Record '),
              404,
            );
          return res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'Focus Area option'),
          );
        });
    } catch (err) {
      res.sendError(responseMessage.RESOURCE_NONE, 500, err);
    }
  });
};
