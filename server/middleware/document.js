import mongoose from 'mongoose';
import keystone from 'keystone';

const Document = () => keystone.list('Document');

export const paramDocExists = async (req, res, next) => {
  const errorResp = {
    status: 'error',
    message: 'The document does not exist.',
  };

  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    await Document()
      .model.findById(id)
      .exec((err, doc) => {
        if (doc) {
          req.doc = doc;
          next();
        } else {
          return res.status(404).json(errorResp);
        }
      });
  } else {
    return res.status(404).json(errorResp);
  }
};
