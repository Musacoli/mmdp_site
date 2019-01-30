import FileUpload from '../../models/FileUpload';

export const create = (req, res) => {
  const file = new FileUpload.model();

  file.getUpdateHandler(req).process(req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ file });
  });
};
