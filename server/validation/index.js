const Joi = require("joi")

const schema = Joi.object({
  name: Joi.string().required(),
  birthdate: Joi.string().required(),
  position: Joi.string().required(),
  country: Joi.string().required(),
  salary: Joi.string().required()
})

function validateUserBody(req, res, next) {
  validateRequest(req, next, schema)
}

function validateRequest(req, next, schema) {
  const { error, value } = schema.validate(req.body,  {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  })
  if (error) {
    req.status(400).json({
      status: "error",
      message: `Validation error: ${error.details
        .map((x) => x.message)
        .join(", ")}`,
    })
  } else {
    req.body = value
    next()
  }
}

module.exports = {
  validateUserBody
}