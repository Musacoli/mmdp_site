import helpers from '../helpers/helpers';

const validators = {

  governorMessage(req, res, next) {

    const { governorName, governorMessage } = req.body;
    let errors = [];

    if(helpers.isNullOrUndefined(governorName)) {
      errors = [...errors, 'Governor name is required'];
    }
    if(helpers.isString(governorName) && governorName.length < 2){
      errors = [...errors, 'Governor name must be two(2)  characters minimum'];
    }
    if(helpers.isNullOrUndefined(governorMessage)) {
      errors = [...errors, 'Governor message is required'];
    }
    if(helpers.isString(governorMessage) && governorMessage.length < 20){
      errors = [...errors, 'Governor message must be twenty(20)  characters minimum'];
    }
    // TODO FILE UPLOAD F
    // if(helpers.isEmptyObject(req.files) && req.method === 'POST'){
    //   errors = [...errors, 'Governor photo is required'];
    // }


    if(errors.length) return res.status(400).json({errors})

    next()
  },


}

export default validators;
