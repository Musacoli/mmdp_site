import { Document } from '../../../middleware/repository/validateDocument';
import {
  checkArchiveState,
  message,
} from '../../../middleware/repository/archiveHelper';

export const archive = async (req, res) => {
  const document = Document().model;

  try {
    const archived = await checkArchiveState(req.params.id);

    await document.findByIdAndUpdate(req.params.id, archived);
    return res.status(200).json({
      status: 'success',
      message: message(archived.archived),
      archived: archived.archived,
    });
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: e.message,
    });
  }
};
