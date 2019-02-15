import Pillar from '../../models/Pillar';
/*
List all Pillars
*/
exports.list = (req, res) => {
  Pillar.model.find(function(err, pillars) {
    if (err) return res.apiError('database error', err);

    return res.apiResponse({
      pillars,
    });
  });
};

/*
Get Pillar by Id
*/
exports.get = (req, res) => {
  Pillar.model.findById(req.params.id).exec(function(err, pillar) {
    if (err) return res.apiError('database error', err);
    if (!pillar) return res.apiError('Not found');

    res.apiResponse({
      pillar,
    });
  });
};

exports.getByPillarNumber = (req, res) => {
  Pillar.model
    .find({ pillarNumber: req.params.id })
    .exec(function(err, pillar) {
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
exports.create = (req, res) => {
  const pillar = new Pillar.model();
  const data = req.method === 'POST' ? req.body : req.query;

  pillar.getUpdateHandler(req).process(data, function(err) {
    if (err) return res.apiError('error', err);

    res.apiResponse({
      pillar,
    });
  });
};

/* Update Pillar by ID
 */
exports.update = (req, res) => {
  Pillar.model.findById(req.params.id).exec(function(err, pillar) {
    if (err) return res.apiError('database error', err);
    if (!pillar) return res.apiError('Pillar not found');

    pillar
      .getUpdateHandler(req)
      .process({ ...req.body, updatedAt: new Date() }, function(error) {
        if (err) return res.apiError('failed to update pillar', error);

        res.apiResponse({
          pillar,
        });
      });
  });
};

/* Remove Pillar by ID
 */
exports.remove = (req, res) => {
  Pillar.model.findById(req.params.id).exec(function(err, pillar) {
    if (err) return res.apiError('database error', err);
    if (!pillar) return res.apiError('Pillar not found');

    pillar.remove(function(error) {
      if (err) return res.apiError('database error', error);

      res.apiResponse({
        success: true,
      });
    });
  });
};
