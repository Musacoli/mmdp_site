export const handleE11000 = (error, res, next) => {
  // get the field names with dupllicate entries
  let fields = error.message.match(/{([^}]*)}/);
  // filter to retain alpha numeric characters only
  fields = fields[0].replace(/[^0-9A-Z]+/gi, '');
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error(`There was a duplicate entry.${fields} already exist`));
  } else {
    next();
  }
};
