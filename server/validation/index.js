const Joi = require("joi")

const schema = Joi.object({
  name: Joi.string().required(),
  birthdate: Joi.string()
    .regex(/^[\d{2}/\d{2}/\d{4}/]*$/)
    .required(),
  position: Joi.string().min(3).max(30).required(),
  country: Joi.string().min(3).max(30).required(),
  salary: Joi.number().required(),
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