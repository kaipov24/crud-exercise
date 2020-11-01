const { readFile, writeFile } = require("fs").promises

exports.getAll = async (req, res) => {
  const employeesFromTheServer = await readFile(`${__dirname}/employees.json`, {
    encoding: "utf8",
  })
    .then((data) => JSON.parse(data))
    .catch(async () => [])

  res.status(200).json(employeesFromTheServer)
}

exports.create = async (req, res) => {
  const employeesFromTheServer = await readFile(`${__dirname}/employees.json`, {
    encoding: "utf8",
  }).then((data) => JSON.parse(data))

  const newReqBody = { ...req.body, id: employeesFromTheServer.length + 1 }

  const employees = [...employeesFromTheServer, newReqBody]
  await writeFile(`${__dirname}/employees.json`, JSON.stringify(employees), {
    encoding: "utf8",
  })

  res.status(200).json({ employee: newReqBody })
}

exports.update = async (req, res) => {
  const employeesFromTheServer = await readFile(`${__dirname}/employees.json`, {
    encoding: "utf8",
  }).then((data) => JSON.parse(data))

  const { id } = req.params
  const { name, birthdate, position, country, salary } = req.body

  const newEmployee = {
    name,
    birthdate,
    position,
    country,
    salary,
    id: +id,
  }
  const newList = employeesFromTheServer.map((it) =>
    +it.id === +id ? newEmployee : it
  )
  await writeFile(`${__dirname}/employees.json`, JSON.stringify(newList), {
    encoding: "utf8",
  })
  res.status(200).json({
    employee: newEmployee,
  })
}
