import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../../constants/responseMessage';
import modelHelper from '../../../helpers/modelHelper';

const Frequency = () => keystone.list('Frequency');

export const create = async (req, res) => {
  Frequency()
    .model.insertMany(req.body.data)
    .then((response) => {
      const {
        data: { length },
      } = req.body;
      const count =
        length > 1 ? `${length} Frequency options  ` : '1 Frequency option ';
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

  const frequency = Frequency().model.find();
  if (id) {
    frequency.where('frequency', id);
  }
  frequency.exec((err, response) => {
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
    Frequency()
      .model.update(
        { _id: data._id },
        {
          frequencyValue: data.frequencyValue,
          classification: data.classification,
          description: data.description,
        },
        { upsert: true },
      )
      .then(() => {
        const {
          data: { length },
        } = req.body;
        const count =
          length > 1 ? `${length} Frequency options  ` : '1 Frequency option ';
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
    const source = await Frequency().model.findOne({ _id: id });
    if (!source) return res.status(404).json({ message: 'not found' });
    const updatedSource = await modelHelper.process(source, req);
    return res.sendSuccess(
      {
        state: updatedSource,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Frequency option'),
    );
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

export const remove = (req, res) => {
  Frequency()
    .model.findById(req.params.id)
    .exec((err, item) => {
      if (item) {
        item.remove(() =>
          res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'Frequency option'),
          ),
        );
      } else {
        return res.sendError('Item not found', 404, err);
      }
    });
};
