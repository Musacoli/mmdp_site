import File from '../../models/File';

export const create = (req, res) => {
  const file = new File.model();

  file.getUpdateHandler(req).process(req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ file });
  });
};
