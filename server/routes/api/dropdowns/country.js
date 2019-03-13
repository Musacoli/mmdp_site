import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';
import { filterAndPaginate } from '../../../utils/search';

export const Country = () => keystone.list('Country');

export const create = (req, res) => {
  try {
    const arr = req.body.data;
    Country().model.insertMany(arr, (err, docs) => {
      if (err) throw err;
      return res.sendSuccess('Dropdowns created successfully', 201);
    });
  } catch (error) {
    return res.sendError('failed to create drop down', 500, error);
  }
};

export const retrieve = (req, res) => {
  Country()
    .model.findById(req.params.id)
    .exec((err, item) => {
      if (err) {
        return res.status(404).send({
          message: 'Dropdown Item Not Found',
        });
      }
      res.status(200).send({
        status: 'success',
        data: item,
      });
    });
};

export const update = (req, res) => {
  const arr = req.body.data;
  arr.forEach(function(data) {
    Country()
      .model.update(
        { countryName: data.countryName },
        { countryName: data.countryName, description: data.description },
        { upsert: true },
      )
      .then(() => {
        res.send(201, 'items created or updated successfully');
        // res.status(201).send('items created or updated successfully');
      })
      .catch((err) => {
        res.send(500, 'failed', err);
      });
  });
  // return res.send({ message: 'Updated bitch' });
  // Country().updateMany({}, {}, { multi: true });
};

export const list = async (req, res) => {
  filterAndPaginate(Country(), req, {}).exec((err, results) => {
    if (err) {
      return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    }
    res.status(200).send({
      data: results,
    });
  });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const dropDown = await Country().model.findByIdAndRemove(id);
    if (!dropDown)
      return res.sendError(
        {
          message: 'Item not found',
        },
        404,
      );
    return res.sendSuccess(undefined, 200, {
      message: 'Item deleted successfully',
    });
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 404, error);
  }
};
