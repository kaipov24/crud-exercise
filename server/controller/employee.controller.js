const Employee = require("../data/employees.js")


exports.getAll = async (req, res) => {
  return res.json(Employee)
}

exports.create = async (req, res) => {
  const employee = req.body
  await employee.save()
  return res.json({ status: "ok", data: employee })
}
// exports.getAll = async (req, res) => {
//   const list = await Employee.find({})
//   return res.json({ status: "ok", data: list })
// }

// exports.getOne = async (req, res) => {
//   const task = await Employee.findOne({ id: req.params.id })
//   return res.json({ status: "ok", data: task })
// }

// exports.update = async (req, res) => {
//   const task = await Employee.findOne({ id: req.params.id })
//   task = { ...task, ...req.body }
//   await task.save()
//   return res.json({ status: "ok", data: task })
// }



// exports.delete = async (req, res) => {
//   await Employee.delete({ id: req.params.id })
//   return res.json({ status: "ok", id: req.params.id })
// }
