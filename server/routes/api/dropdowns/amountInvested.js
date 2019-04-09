import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../../constants/responseMessage';
import modelHelper from '../../../helpers/modelHelper';

const AmountInvestedRange = () => keystone.list('AmountInvestedRange');
export const ReturneeService = () => keystone.list('ReturneeService');

export const create = async (req, res) => {
  AmountInvestedRange()
    .model.insertMany(req.body.data)
    .then((response) => {
      const {
        data: { length },
      } = req.body;
      const count =
        length > 1
          ? `${length} Amount Invested options  `
          : '1 Amount Invested option ';
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
  const id = req.params._id;

  const amountInvested = AmountInvestedRange().model.find();
  if (id) {
    amountInvested.where('amountInvested', id);
  }
  amountInvested.exec((err, response) => {
    if (err) return res.status(400).json(err);
    res.send(
      {
        data: response,
      },
      200,
    );
  });
};

export const updateMany = (req, res) => {
  req.body.data.forEach((data) => {
    AmountInvestedRange()
      .model.update(
        { _id: data._id },
        {
          amountInvestedRange: data.amountInvestedRange,
          description: data.description,
        },
        { upsert: true },
      )
      .then(() => {
        const {
          data: { length },
        } = req.body;
        const count =
          length > 1
            ? `${length} Amount Invested options  `
            : '1 Amount Invested option ';
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
    const source = await AmountInvestedRange().model.findOne({ _id: id });
    if (!source) return res.status(404).json({ message: 'not found' });
    const updatedSource = await modelHelper.process(source, req);
    return res.sendSuccess(
      {
        state: updatedSource,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Amount invested option'),
    );
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

export const SourceModel = (model, id) => {
  const results = model()
    .model.find()
    .where('amountInvestedRange', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errMsg = [];
  Promise.all([
    SourceModel(ReturneeService, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this Amount Invested option.It  has already been assigned to ${
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
      AmountInvestedRange()
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
            sprintf(responseMessage.RESOURCE_DELETED, 'Amount Invested option'),
          );
        });
    } catch (err) {
      res.sendError(responseMessage.RESOURCE_NONE, 500, err);
    }
  });
};
