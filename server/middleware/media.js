import mongoose from 'mongoose';
import keystone from 'keystone';

const Media = () => keystone.list('Media');

export const paramMediaExists = async (req, res, next) => {
  const errorResp = {
    status: 'error',
    message: 'The media file does not exist.',
  };

  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    await Media()
      .model.findById(id)
      .exec((err, med) => {
        if (med) {
          req.med = med;
          next();
        } else {
          return res.status(404).json(errorResp);
        }
      });
  } else {
    return res.status(404).json(errorResp);
  }
};
