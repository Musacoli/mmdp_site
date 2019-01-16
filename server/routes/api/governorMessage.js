import GovernorMessage from '../../models/GovernorMessage';

exports.create = function(req, res) {

  var item = new GovernorMessage.model();

  item.getUpdateHandler(req).process(req.body, function(err) {

    if (err) return res.apiError('create error', err);
    res.apiResponse({
      item
    });

  });
}

exports.update = function(req, res) {
  GovernorMessage.model.findById(req.params.id).exec(function(err, item) {
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
  GovernorMessage.model.find(function(err, items) {

    if (err) return res.apiError('database error', err);

    res.apiResponse({
      items
    });

  });
}

exports.get = function(req, res) {

  GovernorMessage.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    res.apiResponse({
      item
    });

  });
}

exports.remove = function(req, res) {
  GovernorMessage.model.findById(req.params.id).exec(function (err, item) {

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


