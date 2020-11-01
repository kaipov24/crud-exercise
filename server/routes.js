const express = require("express")
const { getAll, create, update } = require("./controller/employee.controller")
const {validateUserBody} = require("./validation")

const router = express.Router()

router.get("/", getAll)
router.post("/",validateUserBody, create)
router.patch("/:id", validateUserBody, update)

module.exports = router
