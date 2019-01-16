
import Coordination from '../../models/Coordination';
import Highlight from '../../models/Highlight';

exports.create = function(req, res) {

  var item = new Coordination.model();

  const highlight = req.body.highlight.map(data => ({ name: data }));
  Highlight.model.insertMany(highlight)  
    .then((result) => {
      item.getUpdateHandler(req)
        .process({ 
          ...req.body,
          highlight: result.map(d => d._id)
        }, function(err) {
          if (err) return res.apiError('create error', err);
          res.apiResponse({
            item
          });

        });
    })
    .catch(err => {
      res.status(500).json({err});
    });
}

exports.update = function(req, res) {
  Coordination.model.findById(req.params.id).exec(function(err, item) {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item.getUpdateHandler(req)
      .process({...req.body, updatedAt: new Date() }, function(err) {

        if (err) return res.apiError('update error', err);

        res.apiResponse({
          item
        });

      });
  });
}

exports.list = function(req, res) {
  Coordination.model.find(function(err, results) {

    if (err) return res.apiError('database error', err);

    let items = []

    results.forEach(item => {
      if (item.archived === false) {
        items.push(item)
      }
    })

    res.apiResponse({
      items
    });

  });
}

exports.get = function(req, res) {

  Coordination.model.findById(req.params.id)
    .populate('highlight')
    .exec(function(err, item) {

      if (err) return res.apiError('database error', err);
      if (!item) return res.apiError('not found');

      res.apiResponse({
        item
      });

    });
}

exports.remove = function(req, res) {
  Coordination.model.findById(req.params.id).exec(function (err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item.getUpdateHandler(req).process({archived: true}, function(err) {
      if (err) return res.apiError('remove error', err);
      res.apiResponse({
        item
      });
    });

  });
}


