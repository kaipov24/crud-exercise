import Joi from "joi"

const schema = Joi.object({
  name: Joi.string().required(),
  birthdate: Joi.string().max(10000000).allow(null).required(),
  position: Joi.string().required(),
  country: Joi.string().required(),
  salary: Joi.number().required(),
})


export default schema