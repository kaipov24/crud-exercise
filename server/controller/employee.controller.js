const { readFile, writeFile } = require("fs").promises

exports.getAll = async (req, res) => {
  const getEmployees = await readFile(`${__dirname}/employees.json`, {
    encoding: "utf8",
  })
    .then((data) => JSON.parse(data))
    .catch(async () => [])
  res.json(getEmployees)
}

exports.create = async (req, res) => {
  const getEmployees = await readFile(`${__dirname}/employees.json`, {
    encoding: "utf8",
  }).then((data) => JSON.parse(data))
  const newReqBody = req.body
  const newList = [...getEmployees, newReqBody]
  await writeFile(`${__dirname}/employees.json`, JSON.stringify(newList), {
    encoding: "utf8",
  })
  res.json({ newList })
}

exports.update = async (req, res) => {
  const getEmployees = await readFile(`${__dirname}/employees.json`, {
    encoding: "utf8",
  }).then((data) => JSON.parse(data))
  const { id } = req.params
  const { name, birthdate, position, country, salary } = req.body
  const newList = getEmployees.map((it) =>
    it.id === +id ? { name, birthdate, position, country, salary, id: +id } : it
  )
  await writeFile(`${__dirname}/employees.json`, JSON.stringify(newList), {
    encoding: "utf8",
  })
}
