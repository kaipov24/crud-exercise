import Joi from "joi"

const schema = Joi.object({
  name: Joi.string().required(),
  birthdate: Joi.string().required(),
  position: Joi.string().required(),
  country: Joi.string().required(),
  salary: Joi.string().required(),
})


export default schema