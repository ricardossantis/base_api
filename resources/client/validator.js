const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .required(),
});

const validateSchema = (input) => {
  if ( !input ) {
    throw new Error('Invalid input');
  } else {
    const { error, value } = schema.validate(input);
    if (error) {
      throw new Error(error.message);
    } else {
      return value;
    }
  }
}

const validateModel = (input) => validateSchema(input);

module.exports.validateModel = validateModel;
