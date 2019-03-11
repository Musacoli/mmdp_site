import StaffStrength from '../../../models/stakeholdersDirectory/StaffStrength';
import responseMessage from '../../../constants/responseMessage';

export const create = (req, res) => {
  const staffStrength = req.body.staffStrength.map((data) => ({
    staffStrength: data.staffStrength,
    description: data.description,
  }));

  const staffStrengthstaffStrengths = req.body.staffStrength.map((data) => data.staffStrength);

  StaffStrength.model.find(
    {
      staffStrength: { $in: staffStrengthstaffStrengths },
    },
    (err, existingData) => {
      if (existingData.length >= 1) {
        res.sendError('Please check entries for already existing field', 409);
      } else {
        StaffStrength.model
          .insertMany(staffStrength)
          .then((result) => {
            return res.status(201).json({
              message: 'Staff Strength options successfully added',
              staffStrengths: result,
            });
          })
          .catch((err) => {
            res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
          });
      }
    },
  );
};

export const update = (req, res) => {
  const staffStrength = req.body.staffStrength.map((data) => ({
    _id: data._id,
    staffStrength: data.staffStrength,
    description: data.description,
  }));

  staffStrength.forEach((data) => {
    StaffStrength.model
      .update(
        { _id: data._id },
        { staffStrength: data.staffStrength, description: data.description },
        { upsert: true },
      )
      .then(() => {
        res.sendSuccess('', 201, 'success');
      })
      .catch((err) => {
        res.sendError('failed', 500, err);
      });
  });
};

export const list = (req, res) => {
  StaffStrength.model.find().exec((err, items) => {
    if (err) {
      return res.sendError(
        'Data currently unavailable in the database',
        404,
        err,
      );
    }
    return res.sendSuccess({ staffStrength: items }, 200);
  });
};

export const get = (req, res) => {
  StaffStrength.model.findById(req.params.id).exec((err, item) => {
    if (err) {
      return res.sendError(
        'Data currently unavailable in the database',
        404,
        err,
      );
    }
    return res.sendSuccess({ staffStrength: item }, 200);
  });
};

export const remove = (req, res) => {
  StaffStrength.model.findById(req.params.id).exec((err, item) => {
    if (item) {
      item.remove(() => res.sendSuccess(null, 204, 'Option has been deleted.'));
    } else {
      return res.sendError('Item not found', 404, err);
    }
  });
};
