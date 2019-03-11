import keystone from 'keystone';
import mongoose from 'mongoose';

export const Document = () => keystone.list('Document');

export const checkIfDocument = async (req, res, next) => {
  const document = Document().model;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: 'Please use a valid id',
    });
  }
  try {
    const doc = await document.findById(req.params.id);
    if (!doc) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Document does not exist' });
    }
    return next();
  } catch (e) {
    return res.status(500).json({ e });
  }
};
