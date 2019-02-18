import { Document } from '../../../middleware/repository/validateDocument';

export const deleteDocument = async (req, res) => {
  const document = Document().model;
  try {
    await document.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      message: 'Document deleted successfully',
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};
