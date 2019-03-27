import TargetAudience from '../../../models/dropdowns/TargetAudience';
import responseMessage from '../../../constants/responseMessage';

export const create = (req, res) => {
  const TargetAudiences = req.body.TargetAudience.map((data) => ({
    audienceType: data.audienceType,
    description: data.description,
  }));

  const TargetAudienceRanges = req.body.TargetAudience.map(
    (data) => data.audienceType,
  );

  TargetAudience.model.find(
    {
      audienceType: { $in: TargetAudienceRanges },
    },
    (err, existingData) => {
      if (existingData.length >= 1) {
        res.sendError('Please check entries for already existing field', 409);
      } else {
        TargetAudience.model
          .insertMany(TargetAudiences)
          .then((result) => {
            res.status(201).json({
              message: 'Target Audience option(s) successfully added',
              TargetAudiences: result,
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
  const TargetAudiences = req.body.TargetAudience.map((data) => ({
    _id: data._id,
    audienceType: data.audienceType,
    description: data.description,
  }));

  TargetAudiences.forEach((data) => {
    TargetAudience.model
      .update(
        { _id: data._id },
        { audienceType: data.audienceType, description: data.description },
        { upsert: true },
      )
      .then((result) => {
        res.status(200).json({
          message: 'Target Audience option(s) successfully updated',
          TargetAudiences: result,
        });
      })
      .catch((err) => {
        res.sendError('failed', 500, err);
      });
  });
};

export const list = (req, res) => {
  TargetAudience.model.find().exec((err, items) => {
    if (err) {
      return res.sendError(
        'Data currently unavailable in the database',
        404,
        err,
      );
    }
    return res.sendSuccess({ TargetAudiences: items }, 200);
  });
};

export const get = (req, res) => {
  TargetAudience.model.findById(req.params.id).exec((err, item) => {
    if (err) {
      return res.sendError(
        'Data currently unavailable in the database',
        404,
        err,
      );
    }
    return res.sendSuccess({ TargetAudience: item }, 200);
  });
};

export const remove = (req, res) => {
  TargetAudience.model.findById(req.params.id).exec((err, item) => {
    if (item) {
      item.remove(() =>
        res.sendSuccess(null, 204, 'Target Audience has been deleted.'),
      );
    } else {
      return res.sendError('Item not found', 404, err);
    }
  });
};
