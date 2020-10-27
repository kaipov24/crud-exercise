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
  res.sendFile(path.join(__dirname, "../build", "index.html"))
})
app.listen(process.env.PORT || DEFAULT_PORT)