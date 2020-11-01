require("module-alias/register")

const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const routes = require("./routes")

const app = express()
const DEFAULT_PORT = 9000
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
)
app.use(bodyParser.json({ limit: "50mb", extended: true }))

app.use(express.static(path.join(__dirname, "../build")))

app.use("/api/v1/employees", routes)

app.get("/", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,

      process.env.NODE_ENV === "production" ? "../build" : "../public",
      "index.html"
    )
  )
})

module.exports = app.listen(process.env.PORT || DEFAULT_PORT, () => {
  console.log(`Server started at ${process.env.PORT || DEFAULT_PORT}`)
})

