import Pillar from '../../models/Pillar';
/*
List all Pillars
*/
export const list = (req, res) => {
  Pillar.model.find((err, pillars) => {
    if (err) return res.apiError('database error', err);

    return res.apiResponse({
      pillars,
    });
  });
};

/*
Get Pillar by Id
*/
export const get = (req, res) => {
  Pillar.model.findById(req.params.id).exec((err, pillar) => {
    if (err) return res.apiError('database error', err);
    if (!pillar) return res.apiError('Not found');

    res.apiResponse({
      pillar,
    });
  });
};

export const getByPillarNumber = (req, res) => {
  Pillar.model.find({ pillarNumber: req.params.id }).exec((err, pillar) => {
    if (err) return res.apiError('database error', err);
    if (!pillar) return res.apiError('Not found');

    res.apiResponse({
      pillar,
    });
  });
};

/*
Create a pillar
*/
export const create = (req, res) => {
  const pillar = new Pillar.model();
  const data = req.method === 'POST' ? req.body : req.query;

  pillar.getUpdateHandler(req).process(data, (err) => {
    if (err) return res.apiError('error', err);

    res.apiResponse({
      pillar,
    });
  });
};

/* Update Pillar by ID
 */
export const update = (req, res) => {
  Pillar.model.findById(req.params.id).exec((err, pillar) => {
    if (err) return res.apiError('database error', err);
    if (!pillar) return res.apiError('Pillar not found');

    pillar
      .getUpdateHandler(req)
      .process({ ...req.body, updatedAt: new Date() }, (error) => {
        if (err) return res.apiError('failed to update pillar', error);

        res.apiResponse({
          pillar,
        });
      });
  });
};

/* Remove Pillar by ID
 */
export const remove = (req, res) => {
  Pillar.model.findById(req.params.id).exec((err, pillar) => {
    if (err) return res.apiError('database error', err);
    if (!pillar) return res.apiError('Pillar not found');

    pillar.remove((error) => {
      if (err) return res.apiError('database error', error);

      res.apiResponse({
        success: true,
      });
    });
  });
};
