const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string(),
  password: Joi.string()
    .required(),
  first_access: Joi.boolean(),
  is_admin: Joi.boolean(),
  roles: Joi.array()
    .items(Joi.object({ 
      client: Joi.string().required(),
      permissions: Joi.object(),
    }).required())
    .required()
});

const schemaUpdate = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string(),
  password: Joi.string(),
  first_access: Joi.boolean(),
  is_admin: Joi.boolean(),
  roles: Joi.array()
    .items(Joi.object({ 
      client: Joi.string().required(),
      permissions: Joi.object(),
    }).required())
    .required()
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

const validateUpdateSchema = (input) => {
  if ( !input ) {
    throw new Error('Invalid input');
  } else {
    const { error, value } = schemaUpdate.validate(input);
    if (error) {
      throw new Error(error.message);
    } else {
      return value;
    }
  }
}

const validateModel = (input) => validateSchema(input);
const validateUpdateModel = (input) => validateUpdateSchema(input);

module.exports = {
  validateModel,
  validateUpdateModel,
};
