
import EdoStateApproach from '../../models/EdoStateApproach';

exports.create = function(req, res) {

  var item = new EdoStateApproach.model();

  item.getUpdateHandler(req).process(req.body, function(err, result) {

    if (err) return res.apiError('create error', err);
    res.apiResponse({
      item
    });

  });
}

exports.update = function(req, res) {
  EdoStateApproach.model.findById(req.params.id).exec(function(err, item) {
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
  EdoStateApproach.model.find(function(err, results) {

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

  EdoStateApproach.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    res.apiResponse({
      item
    });

  });
}

exports.remove = function(req, res) {
  EdoStateApproach.model.findById(req.params.id).exec(function (err, item) {

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


