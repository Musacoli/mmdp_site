// files object (added by multer internally via keystone) on the request object
// is added to the request body for validation purpose
const appendFilesToBody = (req, res, next) => {
  // for validation purpose if no file is uploaded set empty files object
  req.body.files = req.files ? req.files : {};
  next();
};

export default appendFilesToBody;
